import copyToClipBoard from '../utils/copy-to-clipboard'

interface CopyI {
  url: string
}

const Copy = ({ url }: CopyI) => {
  return (
    <button
      onClick={() => {
        copyToClipBoard(url)
      }}
    >
      copy
    </button>
  )
}

export default Copy
