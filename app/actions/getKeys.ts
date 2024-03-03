'use server'
import { S3Client } from '@aws-sdk/client-s3'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { cookies } from 'next/headers'

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY as string,
    secretAccessKey: process.env.R2_ACCESS_SECRET as string,
  },
})

// get unique keys from cloudflare r2
const getKeys = async () => {
  // this line force this action to not cache the data
  // https://github.com/vercel/next.js/discussions/50045#discussioncomment-7218266
  const _cookies = cookies()

  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_UPLOAD_BUCKET,
    MaxKeys: 10,
  })

  try {
    let isTruncated = true
    let contents: string[] = []

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await S3.send(command)
      if (Contents) {
        Contents.map((c) => {
          if (c.Key) {
            contents.push(c.Key)
          }
        })
      }
      isTruncated = IsTruncated || false
      command.input.ContinuationToken = NextContinuationToken
    }
    return contents
  } catch (err) {
    console.error(err)
  }
}

export default getKeys
