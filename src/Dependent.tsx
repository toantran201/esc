import { useState } from 'react'
import EscapeHandler from '@/components/EscapeHandler'

const Dependent = () => {
  const [isShowX, setIsShowX] = useState(false)
  const [isShowY, setIsShowY] = useState(false)
  const [isShowZ, setIsShowZ] = useState(false)

  // X
  const hideX = () => {
    setIsShowZ(false)
    setIsShowY(false)
    setIsShowX(false)
  }

  const showX = () => {
    setIsShowX(true)
  }

  // Y
  const hideY = () => {
    setIsShowZ(false)
    setIsShowY(false)
  }

  const showY = () => {
    setIsShowY(true)
  }

  // Z
  const hideZ = () => {
    setIsShowZ(false)
  }

  const showZ = () => {
    setIsShowZ(true)
  }

  return (
    <div style={{ display: 'flex', width: '100%', position: 'absolute', bottom: 0, left: 0, zIndex: 1 }}>
      {!isShowX && <button onClick={showX}>Show X</button>}
      {isShowX && (
        <>
          <EscapeHandler handler={hideX} />
          <div style={{ flex: 1, background: 'red' }}>
            <h1>X</h1>
            <button onClick={hideX}>Hide X</button>
            <button onClick={showY}>Show Y</button>
          </div>
          {isShowY && (
            <>
              <EscapeHandler handler={hideY} />
              <div style={{ flex: 1, background: 'blue' }}>
                <h1>Y</h1>
                <button onClick={hideY}>Hide Y</button>
                <button onClick={showZ}>Show Z</button>
              </div>
              {isShowZ && (
                <>
                  <EscapeHandler handler={hideZ} />
                  <div style={{ flex: 1, background: 'green' }}>
                    <h1>Z</h1>
                    <button onClick={hideZ}>Hide Z</button>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Dependent
