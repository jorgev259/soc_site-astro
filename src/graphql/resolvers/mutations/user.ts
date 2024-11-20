import { composeResolvers } from '@graphql-tools/resolvers-composition'
import type { Resolvers } from '@/graphql/__generated__/types.generated'
import generator from 'generate-password-ts'
import sharp from 'sharp'
import fs from 'fs-extra'
import type { User } from '@auth/core/types'
import prismaClient from 'prisma/client'
import nodemailer from 'nodemailer'

import { AuthenticationError, UserInputError } from 'utils/graphQLErrors'
import forgorTemplate from 'utils/forgorTemplate'
import {
  argon2id,
  COOKIE_NAME,
  createSession,
  generateSessionToken,
  invalidateSession,
  setSessionTokenCookie,
  validateSessionToken
} from 'utils/session'

async function processImage(imagePath) {
  const sharpImg = sharp(imagePath)
  const meta = await sharpImg.metadata()
  const placeholderImgWidth = 20
  const imgAspectRatio = meta.width / meta.height
  const placeholderImgHeight = Math.round(placeholderImgWidth / imgAspectRatio)

  const buffer = await sharpImg.resize(placeholderImgWidth, placeholderImgHeight).toBuffer()

  return `data:image/${meta.format};base64,${buffer.toString('base64')}`
}

async function cropPFP(pfpFile: File, username: string, imgId: string) {
  if (!imgId)
    return 'data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAACwAQCdASoEAAQAAUAmJZgCdAEO9p5AAPa//NFYLcn+a7b+3z7ynq/qXv+iG0yH/y1D9eBf9pqWugq9G0RnxmxwsjaA2bW8AAA='

  const pathString = '/var/www/soc_img/img/user'
  const fullPath = `${pathString}/${username}_${imgId}.png`

  await fs.ensureDir(pathString)

  let sharpImage = sharp(await pfpFile.arrayBuffer())
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

export const mailConfig = JSON.parse(process.env.MAILSERVER || '{}')
export const transporter = nodemailer.createTransport(mailConfig)

function addHours(date: Date, hours: number) {
  const hoursToAdd = hours * 60 * 60 * 1000
  date.setTime(date.getTime() + hoursToAdd)
  return date
}

async function createForgor(user: User) {
  await prismaClient.forgors.deleteMany({ where: { username: user.username } })

  const key = generator.generate({
    length: 15,
    numbers: true,
    uppercase: false,
    strict: true
  })

  const row = await prismaClient.forgors.create({
    data: { key, username: user.username, expires: addHours(new Date(), 24) }
  })
  const html = forgorTemplate.replaceAll('{{forgor_link}}', `https://sittingonclouds.net/forgor?key=${key}`)
  const message = {
    from: mailConfig.auth.user,
    to: user.email,
    subject: 'Password Reset',
    html
  }
  await transporter.sendMail(message)

  return row
}

const resolversComposition = {
  //'Mutation.updateUser': [isAuthedApp]
}

const resolvers: Resolvers = {
  Mutation: {
    registerUser: async (_, args) => {
      const { username, email } = args
      const pfp: File = args.pfp

      const checkUser = await prismaClient.users.findFirst({ where: { OR: [{ username }, { email }] } })
      if (checkUser) throw UserInputError('Username/email already in use')

      const password = generator.generate({
        length: 30,
        numbers: true,
        upercase: true,
        strict: true
      })
      const hashPassword = await argon2id.hash(password)

      const imgId = pfp.size > 0 ? Date.now().toString() : null
      const [hash, placeholder] = await Promise.all([hashPassword, cropPFP(pfp, username, imgId)])
      const user = await prismaClient.users.create({ data: { username, email, password: hash, placeholder, imgId } })
      await createForgor(user)

      return true
    },
    login: async (_, args, context) => {
      const { username, password } = args
      let { user } = await validateSessionToken(context.cookies?.get(COOKIE_NAME)?.value)
      if (user) throw AuthenticationError('Already logged in')

      user = await prismaClient.users.findUnique({ where: { username } })
      if (!user) throw UserInputError('Invalid Username/email')

      const checkPassword = await argon2id.verify(user.password, password)
      if (!checkPassword) throw UserInputError('Invalid Username/email')

      const token = generateSessionToken()
      const session = await createSession(user.username, token)
      setSessionTokenCookie(context.cookies, token, session.expiresAt)

      return token
    },
    logout: async (_, args, context) => {
      await invalidateSession(context.locals.session.id)
      return true
    }
    /*
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
    }*/
  }
}

export default composeResolvers(resolvers, resolversComposition)
