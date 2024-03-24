import { NextResponse } from 'next/server'

import { ProjectRepo } from '@/db/repo/ProjectRepo'

const getProjects = async () => {
  const projects = await ProjectRepo.findAll()
  return projects
}

const createProjects = async (name: string, url: string) => {
  await ProjectRepo.createProject(name, url)
}

const deleteProject = async (slug: string) => {
  await ProjectRepo.deleteProject(slug)
}

export async function GET(request: Request) {
  const projects = await getProjects()
  return NextResponse.json({
    projects: projects,
  })
}

export async function POST(req: Request) {
  const data = await req.json()
  await createProjects(data.projectName, data.projectUrl)
  return NextResponse.json({
    message: 'project created',
  })
}

export async function DELETE(req: Request) {
  const data = await req.json()
  await deleteProject(data.slug)
  return NextResponse.json({
    message: 'project deleted',
  })
}
