import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EscapeStack from "@/utils/escape-stack";

const Dependent = () => {
  const [isShowX, setIsShowX] = useState(false)
  const [isShowY, setIsShowY] = useState(false)
  const [isShowZ, setIsShowZ] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const hideXRefKey = useRef(uuidv4())
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const hideYRefKey = useRef(uuidv4())
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const hideZRefKey = useRef(uuidv4())

  // X
  const hideX = () => {
    EscapeStack.manualPop([hideZRefKey.current, hideYRefKey.current, hideXRefKey.current])
    isShowZ && setIsShowZ(false)
    isShowY && setIsShowY(false)
    setIsShowX(false)
  }

  const showX = () => {
    EscapeStack.push({
      handler: hideX,
      key: hideXRefKey.current,
    })
    setIsShowX(true)
  }

  // Y
  const hideY = () => {
    EscapeStack.manualPop([hideZRefKey.current, hideYRefKey.current])
    isShowZ && setIsShowZ(false)
    setIsShowY(false)
  }

  const showY = () => {
    EscapeStack.push({
      handler: hideY,
      key: hideYRefKey.current,
    })
    setIsShowY(true)
  }

  // Z
  const hideZ = () => {
    EscapeStack.manualPop([hideZRefKey.current])
    setIsShowZ(false)
  }

  const showZ = () => {
    EscapeStack.push({
      handler: hideZ,
      key: hideZRefKey.current,
    })
    setIsShowZ(true)
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {!isShowX && <button onClick={showX}>Show X</button>}
      {isShowX && (
        <>
          <div style={{ flex: 1, background: 'red' }}>
            <h1>X</h1>
            <button onClick={hideX}>Hide X</button>
            <button onClick={showY}>Show Y</button>
          </div>
          {isShowY && (
            <>
              <div style={{ flex: 1, background: 'blue' }}>
                <h1>Y</h1>
                <button onClick={hideY}>Hide Y</button>
                <button onClick={showZ}>Show Z</button>
              </div>
              {isShowZ && (
                <div style={{ flex: 1, background: 'green' }}>
                  <h1>Z</h1>
                  <button onClick={hideZ}>Hide Z</button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Dependent
