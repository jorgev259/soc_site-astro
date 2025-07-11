import path from 'node:path'
import fs from 'node:fs/promises'
import sharp from 'sharp'
import type { PrismaClient } from '@prisma/client/extension'

function colorToHex(color: number) {
  const hexadecimal = color.toString(16)
  return hexadecimal.length === 1 ? '0' + hexadecimal : hexadecimal
}

function convertRGBtoHex(red: number, green: number, blue: number) {
  return '#' + colorToHex(red) + colorToHex(green) + colorToHex(blue)
}

export async function writeImg(file: File, folder: string, id: number | string) {
  const pathString = path.join('/mnt/soc_img/img', folder)
  const fullPath = path.join(pathString, `${id}.png`)

  const fileArray = Buffer.from(await file.arrayBuffer())
  await fs.mkdir(pathString, { recursive: true })

  if (await fs.stat(fullPath).catch(() => false)) {
    await fs.rm(fullPath)
  }

  await fs.writeFile(fullPath, fileArray)
  return fullPath
}

export async function handleImg(file: File, folder: string, id: number | string) {
  const coverPath = await writeImg(file, folder, id)
  const headerColor = await getImgColor(coverPath)
  return headerColor
}

export async function handleCover(file: File, folder: string, id: number | string, tx: PrismaClient) {
  const headerColor = await handleImg(file, folder, id)
  await tx.albums.update({ where: { id: id }, data: { headerColor } })
}

export async function getImgColor(filePath: string) {
  const { dominant } = await sharp(filePath).stats()
  const { r, g, b } = dominant

  return convertRGBtoHex(r, g, b)
}
