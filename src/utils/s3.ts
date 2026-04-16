import { S3Client } from '@aws-sdk/client-s3'

import { S3_ID, S3_SECRET, S3_ENDPOINT, S3_REGION } from 'astro:env/server'

export const s3Client = new S3Client({
  region: S3_REGION,
  endpoint: S3_ENDPOINT,
  credentials: {
    accessKeyId: S3_ID,
    secretAccessKey: S3_SECRET
  },
  forcePathStyle: true,
  requestStreamBufferSize: 32 * 1024
})
