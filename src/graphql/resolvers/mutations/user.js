import bcrypt from 'bcrypt'
import generator from 'generate-password'
import { composeResolvers } from '@graphql-tools/resolvers-composition'
import { DateTime } from 'luxon'
import { Op } from 'sequelize'
import path from 'path'
import fs from 'fs-extra'
import sharp from 'sharp'

import { createForgor } from '@/server/utils/forgor'
import { isAuthedApp } from '@/server/utils/resolvers'
import { processImage } from '@/server/utils/image'
import { getSession, getUser } from '@/next/utils/getSession'
import {
  ForbiddenError,
  UserInputError
} from '@/next/server/utils/graphQLErrors'

const resolversComposition = {
  'Mutation.updateUser': [isAuthedApp]
}

const streamToString = (stream) => {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })
}

async function cropPFP(streamItem, username, imgId) {
  const { createReadStream } = await streamItem
  const pathString = '/var/www/soc_img/img/user'
  const fullPath = path.join(pathString, `${username}_${imgId}.png`)

  await fs.ensureDir(pathString)

  const image = await streamToString(createReadStream())
  let sharpImage = sharp(image)
  const metadata = await sharpImage.metadata()
  const { width, height } = metadata

  if (width !== height) {
    sharpImage = sharpImage.extract(
      width > height
        ? {
            left: Math.floor((width - height) / 2),
            top: 0,
            width: height,
            height
          }
        : {
            left: 0,
            top: Math.floor((height - width) / 2),
            width,
            height: width
          }
    )
  }

  await sharpImage.resize({ width: 200, height: 200 }).png().toFile(fullPath)

  return await processImage(fullPath)
}

const resolvers = {
  Mutation: {
    login: async (_, { username, password }, { db }) => {
      const user = await db.models.user.findByPk(username)
      if (!user) throw UserInputError()

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) throw UserInputError()

      const session = await getSession()
      session.username = user.username
      // Remove this when new site version is fully implemented
      session.permissions = (await user.getRoles())
        .map((r) => r.permissions)
        .flat()
      await session.save()

      return 200
    },
    logout: async () => {
      const session = await getSession()
      await session.destroy()

      return 200
    },
    registerUser: async (_, { username, email, pfp }, { db }) => {
      await Promise.all([
        db.models.user.findByPk(username).then((result) => {
          if (result) throw UserInputError('Username already in use')
        }),
        db.models.user.findOne({ where: { email } }).then((result) => {
          if (result) throw UserInputError('Email already in use')
        })
      ])

      const password = generator.generate({
        length: 30,
        numbers: true,
        upercase: true,
        strict: true
      })

      return db.transaction(async (transaction) => {
        const user = await db.models.user.create(
          { username, email, password: await bcrypt.hash(password, 10) },
          { transaction }
        )
        if (pfp) {
          const imgId = Date.now()
          user.placeholder = await cropPFP(pfp, username, imgId)
          user.imgId = imgId
        } else {
          user.placeholder =
            'data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAACwAQCdASoEAAQAAUAmJZgCdAEO9p5AAPa//NFYLcn+a7b+3z7ynq/qXv+iG0yH/y1D9eBf9pqWugq9G0RnxmxwsjaA2bW8AAA='
        }

        await user.save({ transaction })
        await createForgor(user, db, transaction)

        return true
      })
    },
    updateUserRoles: async (
      parent,
      { username, roles },
      { db, payload },
      info
    ) => {
      const user = await db.models.user.findByPk(username)
      user.setRoles(roles)
      await user.save()
      return true
    },
    deleteUser: async (parent, { username }, { db, payload }, info) => {
      const user = await db.models.user.findByPk(username)
      if (!user) throw UserInputError('Not Found')
      user.destroy()
      return 1
    },

    createForgorLink: async (_, { key }, { db }) => {
      const user = await db.models.user.findOne({
        where: { [Op.or]: [{ username: key }, { email: key }] }
      })
      if (!user) throw UserInputError('Not Found')

      await createForgor(user, db)
      return true
    },
    updatePass: async (_, { key, pass }, { db }) => {
      const row = await db.models.forgor.findByPk(key)
      if (!row) throw ForbiddenError()

      const now = DateTime.now()
      const expires = DateTime.fromJSDate(row.expires)

      if (now > expires) throw ForbiddenError()

      const user = await db.models.user.findByPk(row.username)
      user.password = await bcrypt.hash(pass, 10)

      return db.transaction(async (transaction) => {
        await user.save({ transaction })
        await row.destroy({ transaction })
        return true
      })
    },
    updateUser: async (_, { username, email, password, pfp }, { db }) => {
      const user = await getUser(db)
      if (username) user.username = username
      if (email) user.email = email
      if (password) user.password = await bcrypt.hash(password, 10)
      if (pfp) {
        const pathString = '/var/www/soc_img/img/user'
        await fs.remove(
          path.join(pathString, `${user.username}_${user.imgId}.png`)
        )

        const imgId = Date.now()
        user.placeholder = await cropPFP(pfp, username, imgId)
        user.imgId = imgId
      }

      await user.save()
      return true
    },

    createRole: async (parent, args, { db, payload }) =>
      db.models.role.create(args),
    updateRole: async (parent, { key, name, permissions }, { db, payload }) => {
      const role = await db.models.role.findByPk(key)
      if (!role) throw UserInputError('Not Found')

      if (role.name !== name) {
        await db.query(
          `UPDATE roles SET name = "${name}" WHERE name = "${key}"`
        )
      }
      role.permissions = permissions

      await role.save()
      return role
    },
    deleteRole: async (parent, { name }, { db, payload }) => {
      const role = await db.models.role.findByPk(name)
      if (!role) throw UserInputError('Not Found')
      await role.destroy()

      return name
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
