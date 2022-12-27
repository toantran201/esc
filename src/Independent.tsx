import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import EscapeStack from '@/utils/escape-stack'

const Independent = () => {
  const [isShowA, setIsShowA] = useState(false)
  const [isShowB, setIsShowB] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const hideARefKey = useRef(uuidv4())
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const hideBRefKey = useRef(uuidv4())

  const hideA = () => {
    EscapeStack.manualPop([hideARefKey.current])
    setIsShowA(false)
  }

  const showA = () => {
    EscapeStack.push({
      handler: hideA,
      key: hideARefKey.current,
    })
    setIsShowA(true)
  }

  const hideB = () => {
    EscapeStack.manualPop([hideBRefKey.current])
    setIsShowB(false)
  }

  const showB = () => {
    EscapeStack.push({
      handler: hideB,
      key: hideBRefKey.current,
    })
    setIsShowB(true)
  }

  return (
    <>
      <div>
        <button onClick={showA}>Show A</button>
        <button onClick={hideA}>Hide A</button>
        {isShowA && <h1>A</h1>}
      </div>

      <div>
        <button onClick={showB}>Show B</button>
        <button onClick={hideB}>Hide B</button>
        {isShowB && <h1>B</h1>}
      </div>
    </>
  )
}

export default Independent
