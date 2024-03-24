'use client'
import { useEffect, useState } from 'react'

import { Project } from '@/types/Project'

const Home = () => {
  const [projects, setProjects] = useState<Project[]>()

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

  useEffect(() => {
    getAllProjects()
  }, [])

  // console.log(postData)
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-1/2 h-screen">
        <div className="flex justify-end">
          <button
            className="px-3 py-2 mb-2 bg-white rounded-lg hover:bg-slate-200"
            onClick={() => {
              handleProjectCreate('test my project', 'mytestUrl')
            }}
          >
            insert
          </button>
        </div>
        <div className="overflow-x-auto shadow-md h-3/4 rounded-xl">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  project
                </th>
                <th scope="col" className="px-6 py-3">
                  project id
                </th>
                <th scope="col" className="px-6 py-3">
                  url
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  action
                </th>
              </tr>
            </thead>
            {projects &&
              projects.map((project) => {
                const url = `${process.env.NEXT_PUBLIC_APP_URL}/project/${project.slug}`
                return (
                  <tr
                    className="bg-gray-900 border-b border-gray-700"
                    key={project.slug}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <a
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/project/${project.slug}`}
                      >
                        {project.name}
                      </a>
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {project.slug}
                    </th>
                    <td className="px-6 py-4">{project.url}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          handleFileDelete(project.slug)
                        }}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home
