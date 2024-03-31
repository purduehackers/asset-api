import { Document, Model } from 'mongoose'

export interface Project {
  name: string
  assetKeys: string[]
  slug: string
  url: string
  color: string
  hoverColor: string
}

export interface ProjectDocument extends Project, Document {}
export interface IProjectModel extends Model<ProjectDocument> {}
