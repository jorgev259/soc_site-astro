import { S3Client } from '@aws-sdk/client-s3'

import { S3_ID, S3_SECRET, S3_ROOT } from 'astro:env/server'

export const s3Client = new S3Client({
  region: 'global',
  endpoint: 'https://store.calibour.net',
  credentials: {
    accessKeyId: S3_ID,
    secretAccessKey: S3_SECRET
  },
  forcePathStyle: true,
  requestStreamBufferSize: 32 * 1024
})

export const getS3Url = (file: string) =>
  `https://sittingonclouds.objects.calibour.net/${S3_ROOT}/${file}`.replace(/--+/g, '-')
export const getImgUrl = (file: string) => getS3Url(`img/${file}`)
