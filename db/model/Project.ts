import mongoose from 'mongoose'
import { ProjectDocument, IProjectModel } from '@/types/Project'

const ProjectSchema = new mongoose.Schema<ProjectDocument, IProjectModel>(
  {
    name: { type: String, required: true },
    assetKeys: { type: [String], required: true },
    slug: { type: String, required: true, index: true, unique: true },
    url: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    hoverColor: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'projects',
  }
)

export { ProjectSchema }
export const createProjectModel = () => {
  return mongoose.models.Project || mongoose.model('Project', ProjectSchema)
}
