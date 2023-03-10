import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import EscapeStack from '@/utils/escape-stack'
import EscapeHandler from '@/components/EscapeHandler'

const hideARefKey = uuidv4()
const hideBRefKey = uuidv4()

const Independent = () => {
  const [isShowA, setIsShowA] = useState(false)
  const [isShowB, setIsShowB] = useState(false)

  const hideA = () => {
    setIsShowA(false)
  }

  const showA = () => {
    setIsShowA(true)
  }

  const hideB = () => {
    setIsShowB(false)
  }

  const showB = () => {
    setIsShowB(true)
  }

  return (
    <>
      <div>
        <button onClick={showA}>Show A</button>
        <button onClick={hideA}>Hide A</button>
        {isShowA && (
          <>
            <EscapeHandler handler={() => setIsShowA(false)} />
            <h1>A</h1>
          </>
        )}
      </div>

      <div>
        <button onClick={showB}>Show B</button>
        <button onClick={hideB}>Hide B</button>
        {isShowB && (
          <>
            <EscapeHandler handler={() => setIsShowB(false)} />
            <h1>B</h1>
          </>
        )}
      </div>
    </>
  )
}

export default Independent
