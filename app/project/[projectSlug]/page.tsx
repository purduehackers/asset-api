'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import addAssetKeyToProject from '@/app/actions/addAssetKeyToProject'

import getDeleteFileUrl from '../../actions/getDeleteFileUrl'
import getUploadFileUrl from '../../actions/getUploadFileUrl'
import Copy from '../../components/copy'

interface ProjectPageProps {
  params: {
    projectSlug: string
  }
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  const [keys, setKeys] = useState([])

  const fetchAndSetKeys = async () => {
    const requestParams = new URLSearchParams({
      projectSlug: params.projectSlug,
    })

    const response = await fetch(`/api/projects/keys?${requestParams}`, {
      next: { revalidate: 0 },
    })
    const data = await response.json()
    setKeys(data.keys)
  }

  const handleFileUpload = async (file: File) => {
    if (!file) return
    const data = new FormData()
    data.set('file', file)
    data.set('filename', file.name)

    const uploadUrl = await getUploadFileUrl(data)
    await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
    })

    addAssetKeyToProject(params.projectSlug, file.name)
    fetchAndSetKeys()
  }

  const handleFileDelete = async (key: string) => {
    const deleteUrl = await getDeleteFileUrl(key)
    await fetch(deleteUrl, {
      method: 'DELETE',
    })
    fetchAndSetKeys()
  }

  useEffect(() => {
    fetchAndSetKeys()
  }, [])

  return (
    <div className="font-mono">
      <div className="flex flex-col justify-center py-12 bg-white place-items-center lg:py-0 lg:h-screen gap-y-4">
        <div className="w-10/12 p-6 bg-white border-4 border-black rounded-sm shadow-blocks shadow-black lg:w-auto">
          <h1 className="text-4xl font-bold text-center ">
            h2o: Purdue Hackers Assets API 💧⚡️
          </h1>
        </div>

        <div className="flex flex-col w-10/12 p-6 border-4 border-black rounded-sm place-items-center h-4/6 shadow-blocks shadow-black lg:w-8/12">
          <div className="flex justify-center">
            <a
              className="px-3 py-2 mb-2 mr-3 text-white rounded-lg bg-slate-800 hover:bg-slate-600"
              href={process.env.NEXT_PUBLIC_APP_URL}
            >
              back
            </a>
            <button
              className="px-3 py-2 mb-2 text-white rounded-lg bg-slate-800 hover:bg-slate-600"
              onClick={() => {
                document.getElementById('file-upload')?.click()
              }}
            >
              insert
            </button>
            <input
              multiple={false}
              id="file-upload"
              type="file"
              title="Add"
              className="hidden"
              onChange={(e) => {
                if (!e.target.files || e.target.files.length === 0) return
                handleFileUpload(e.target.files[0])
              }}
            />
          </div>
          <div className="mt-4"></div>
          <div className="flex-col flex-1 w-full overflow-y-scroll">
            <div className="relative overflow-x-auto bg-gray-800 shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
                <thead className="text-xs text-gray-700 uppercase bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      key
                    </th>
                    <th scope="col" className="px-6 py-3">
                      preview
                    </th>
                    <th scope="col" className="px-6 py-3">
                      url
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {keys &&
                    keys.map((key) => {
                      const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/${key}`
                      return (
                        <tr
                          className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
                          key={key}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-white whitespace-nowrap"
                          >
                            {key}
                          </th>
                          <td className="px-6 py-4">
                            <Image
                              src={url}
                              alt={key}
                              width={100}
                              height={100}
                            />
                          </td>
                          <td className="px-6 py-4 text-white">
                            {url} <Copy url={url} />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => {
                                handleFileDelete(key)
                              }}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
