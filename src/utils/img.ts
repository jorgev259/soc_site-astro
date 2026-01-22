import path from 'node:path'
import sharp from 'sharp'
import { S3_ROOT } from 'astro:env/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'

import { s3Client } from './s3'
import type { PrismaTransactionalClient } from './prisma-client'

function colorToHex(color: number) {
  const hexadecimal = color.toString(16)
  return hexadecimal.length === 1 ? '0' + hexadecimal : hexadecimal
}

function convertRGBtoHex(red: number, green: number, blue: number) {
  return '#' + colorToHex(red) + colorToHex(green) + colorToHex(blue)
}

async function writeImg(file: ArrayBuffer, folder: string, id: number | string) {
  const fileName = `${id}.png`
  const pathString = path.posix.join(S3_ROOT, folder)
  const fullPath = path.posix.join(pathString, fileName)

  const command = new PutObjectCommand({
    Bucket: 'sittingonclouds',
    Key: fullPath,
    Body: Buffer.from(file)
  })

  await s3Client.send(command)
  return fullPath
}

export async function handleImg(file: File, folder: string, id: number | string, handleColor = true) {
  const imgBuffer = await file.arrayBuffer()
  await writeImg(imgBuffer, folder, id)

  if (handleColor) {
    const coverColor = getImgColor(imgBuffer)
    return coverColor
  }
}

export async function handleCover(file: File, folder: string, id: number | string, tx: PrismaTransactionalClient) {
  const headerColor = await handleImg(file, path.posix.join('img', folder), id)
  await tx.albums.update({ where: { id: parseInt(id.toString()) }, data: { headerColor } })
}

async function getImgColor(file: ArrayBuffer) {
  const { dominant } = await sharp(file).stats()
  const { r, g, b } = dominant

  return convertRGBtoHex(r, g, b)
}
