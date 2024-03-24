import { NextResponse } from 'next/server'

import { ProjectRepo } from '@/db/repo/ProjectRepo'

const getKeys = async (slug: string) => {
  const projects = await ProjectRepo.findKeys(slug)
  return projects
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const projectSlug = searchParams.get('projectSlug')
  let keys = []
  if (projectSlug) {
    keys = await getKeys(projectSlug)
  }
  return NextResponse.json({
    keys,
  })
}
