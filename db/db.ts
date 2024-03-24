import getConfig from 'next/config'
import mongoose from 'mongoose'

import { createProjectModel } from './model/Project'

const { serverRuntimeConfig } = getConfig()

mongoose
  .connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString)
  .then(() => {
    // console.log('Connected to MongoDB')
  })
  .catch(() => {
    console.log("Couldn't connect to MongoDB")
  })

mongoose.Promise = global.Promise

export const db = {
  Project: createProjectModel(),
}
