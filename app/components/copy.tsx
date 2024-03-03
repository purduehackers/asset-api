import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import styles from './styles.module.css'

interface CopyI {
  url: string
}

const Copy = ({ url }: CopyI) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
  }

  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltiptext}>
        {isCopied ? 'Copied!' : 'Copy'}
      </span>
      <button
        data-tooltip-target="tooltip-default"
        onMouseLeave={() => {
          setIsCopied(false)
        }}
        onClick={() => {
          copyToClipBoard(url)
        }}
      >
        <FontAwesomeIcon icon={faCopy} />
      </button>
      <div
        id="tooltip-default"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Tooltip content
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  )
}

export default Copy
