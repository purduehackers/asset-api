'use client'
import uploadFile from './actions/uploadFile'
import getFile from './actions/getFile'
import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState<string>('')

  const handleFileUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) return
    const data = new FormData()
    data.set('file', file)
    data.set('filename', file.name)

    uploadFile(data)
      .then((url) => {
        return fetch(url, {
          method: 'PUT',
          body: file,
        })
      })
      .then((res) => {})
  }

  const setupUrl = async () => {
    setUrl(await getFile('confusion_martrix.png'))
  }

  useEffect(() => {
    setupUrl()
  }, [])

  return (
    <div>
      <p>Upload Files</p>
      <form onSubmit={(e) => handleFileUpload(e)}>
        <label htmlFor="file-upload">File Upload</label>
        <br />
        <input
          multiple={false}
          id="file-upload"
          type="file"
          onChange={(e) => {
            if (!e.target.files || e.target.files.length === 0) return
            setFile(e.target.files[0])
          }}
        />
        <br />
        <div
          style={{
            marginBottom: '10px',
          }}
        />
        <button>Submit</button>
      </form>
      <Image
        src={'http://localhost:3000/api/0_mask.png'}
        alt=""
        width={100}
        height={100}
      ></Image>
    </div>
  )
}
