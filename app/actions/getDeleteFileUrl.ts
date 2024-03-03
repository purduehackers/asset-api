'use server'
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY as string,
    secretAccessKey: process.env.R2_ACCESS_SECRET as string,
  },
})

const getDeleteFileUrl = async (filename: string) => {
  const preSignedUrl = await getSignedUrl(
    S3,
    new DeleteObjectCommand({
      Bucket: process.env.R2_UPLOAD_BUCKET,
      Key: filename,
    }),
    {
      expiresIn: 3600,
    }
  )
  return preSignedUrl
}

export default getDeleteFileUrl
