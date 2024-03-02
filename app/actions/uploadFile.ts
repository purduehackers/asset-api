'use server'
import { S3Client } from '@aws-sdk/client-s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY as string,
    secretAccessKey: process.env.R2_ACCESS_SECRET as string,
  },
})

const uploadFile = async (formData: FormData) => {
  const preSignedUrl = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: process.env.R2_UPLOAD_BUCKET,
      Key: formData.get('filename') as string,
    }),
    {
      expiresIn: 3600,
    }
  )
  return preSignedUrl
}

export default uploadFile
