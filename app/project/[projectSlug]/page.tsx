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
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-1/2 h-screen">
        <div className="flex justify-start">
          <a
            className="px-3 py-2 mb-2 text-white underline"
            href={process.env.NEXT_PUBLIC_APP_URL}
          >
            {`<`} back
          </a>
        </div>
        <div className="flex justify-end">
          <button
            className="px-3 py-2 mb-2 bg-white rounded-lg hover:bg-slate-200"
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

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {key}
                      </th>
                      <td className="px-6 py-4">
                        <Image src={url} alt={key} width={100} height={100} />
                      </td>
                      <td className="px-6 py-4">
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
  )
}

export default ProjectPage
