import { db } from '../db'
import GithubSlugger from 'github-slugger'

const Project = db.Project

const findAll = async () => {
  const projects = await Project.find()
  return projects
}

const findOne = async (slug: string) => {
  const project = await Project.findOne({ slug: slug })
  return project
}

const findKeys = async (slug: string) => {
  const project = await Project.findOne({ slug: slug })
  return project.assetKeys
}

const deleteProject = async (slug: string) => {
  await Project.deleteOne({ slug: slug })
}

const createProject = async (name: string, url: string) => {
  // const existingProjects = await findAll()
  const slugger = new GithubSlugger()
  const projectId = slugger.slug(name)
  await Project.create({
    name: name,
    slug: projectId,
    url: url,
    assetKeys: [],
  })
}

export const ProjectRepo = {
  findAll,
  createProject,
  deleteProject,
  findOne,
  findKeys,
}
