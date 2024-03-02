'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import Copy from '../components/copy'

const ProjectPage = () => {
  const [keys, setKeys] = useState([])

  const fetchAndSetKeys = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/keys` || ''
    )
    const data = await response.json()
    setKeys(data.keys)
  }

  useEffect(() => {
    fetchAndSetKeys()
  }, [])

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-1/2 overflow-x-auto shadow-md rounded-xl">
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
          {keys &&
            keys.map((key) => {
              const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/${key}`
              return (
                <tr className="bg-gray-900 border-b border-gray-700" key={key}>
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
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              )
            })}
        </table>
      </div>
      <table></table>
    </div>
  )
}

export default ProjectPage
