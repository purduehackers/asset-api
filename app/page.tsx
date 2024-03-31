'use client'
import { useEffect, useState } from 'react'

import { Project } from '@/types/Project'

const Home = () => {
  const [projects, setProjects] = useState<Project[]>()
  const [openCreateProject, setOpenCreateProject] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectUrl, setProjectUrl] = useState('')

  const getAllProjects = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/projects`,
      {
        method: 'GET',
      }
    )
    const data = await response.json()
    setProjects(data.projects)
  }

  const handleProjectCreate = async (
    projectName: string,
    projectUrl: string
  ) => {
    const body = {
      projectName,
      projectUrl,
    }
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    await getAllProjects()
  }

  const handleFileDelete = async (slug: string) => {
    const body = {
      slug,
    }
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`, {
      method: 'DELETE',
      body: JSON.stringify(body),
    })
    await getAllProjects()
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    await handleProjectCreate(projectName, projectUrl)
    setOpenCreateProject(false)
    setProjectName('')
    setProjectUrl('')
  }

  useEffect(() => {
    getAllProjects()
  }, [])

  return (
    <div className="font-mono">
      <div className="flex flex-col justify-center py-12 bg-white place-items-center lg:py-0 lg:h-screen gap-y-4">
        <div className="w-10/12 p-6 bg-white border-4 border-black rounded-sm shadow-blocks shadow-black lg:w-auto">
          <h1 className="text-4xl font-bold text-center ">
            h2o: Purdue Hackers Assets API 💧⚡️
          </h1>
        </div>
        {openCreateProject && (
          <div className="absolute z-10 flex flex-col justify-center w-screen h-screen bg-black/50 place-items-center">
            <div className="absolute z-20 flex flex-col w-8/12 p-6 bg-white border-4 border-black rounded-sm place-items-center shadow-blocks shadow-black lg:w-4/12">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-2">Create Project</h1>
                <div className="mb-6">
                  <h2>Project Name</h2>
                  <input
                    className="border-4 border-black"
                    required
                    onChange={(e) => {
                      setProjectName(e.target.value)
                    }}
                  ></input>
                  {/* <p className="text-red-500">Warning Text</p> */}
                  <h2>Project Url</h2>
                  <input
                    required
                    type="url"
                    className="border-4 border-black"
                    onChange={(e) => {
                      setProjectUrl(e.target.value)
                    }}
                  ></input>
                </div>
                <div className="relative">
                  <button
                    className="p-1 px-4 mr-1 bg-white border-4 border-black rounded-sm hover:bg-red-300"
                    onClick={() => {
                      setOpenCreateProject(false)
                    }}
                  >
                    Cancel
                  </button>
                  <input
                    type="submit"
                    value="Create"
                    className="p-1 px-4 bg-white border-4 border-black rounded-sm hover:cursor-pointer hover:bg-sky-300"
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex flex-col w-10/12 p-6 border-4 border-black rounded-sm place-items-center h-4/6 shadow-blocks shadow-black lg:w-8/12">
          <button
            onClick={() => {
              setOpenCreateProject(true)
            }}
            className="p-2 text-white bg-black border-4 border-black rounded-sm w-fit shadow-blocks shadow-sky-300 hover:shadow-sky-400"
          >
            Create Project
          </button>
          <div className="mt-4"></div>
          <div className="flex-col flex-1 w-full overflow-y-scroll">
            {projects &&
              projects.map((project) => {
                const url = `${process.env.NEXT_PUBLIC_APP_URL}/project/${project.slug}`

                const backgroundColor = project.color

                return (
                  <div
                    key={project.slug}
                    style={{ backgroundColor: backgroundColor }}
                    className="relative flex flex-col justify-center h-32 p-6 mb-4 border-4 border-black"
                  >
                    <div className="text-xl capitalize">{project.name}</div>
                    <div className="absolute flex flex-col bottom-2 right-2">
                      <button
                        className="p-1 px-4 mt-1 bg-white border-4 border-black rounded-sm hover:bg-red-300"
                        onClick={() => {
                          handleFileDelete(project.slug)
                        }}
                      >
                        Delete
                      </button>
                      <a
                        className="p-1 px-4 mt-1 bg-white border-4 border-black rounded-sm hover:bg-sky-300"
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/project/${project.slug}`}
                      >
                        Enter
                      </a>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
