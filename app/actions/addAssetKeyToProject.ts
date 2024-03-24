'use server'
import { ProjectRepo } from '@/db/repo/ProjectRepo'

const addAssetKeyToProject = async (projectSlug: string, assetKey: string) => {
  const project = await ProjectRepo.findOne(projectSlug)
  project.assetKeys.push(assetKey)
  await project.save()
}

export default addAssetKeyToProject
