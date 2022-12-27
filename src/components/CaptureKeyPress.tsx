import { useCallback, useEffect } from 'react'
//
import { KEY_CODE } from '@/constants'

type CaptureKeyPressProps = {
  eventName?: 'keydown' | 'keyup' | 'keypress'
  keyCode: number | number[]
  handler: (event: KeyboardEvent) => void
  disabled?: boolean
  preventDefault?: boolean
  altKey?: boolean
  ctrKey?: boolean
  shiftKey?: boolean
  captureInput?: boolean
  nonCtrKey?: boolean
  altEnterPress?: boolean
}

const CaptureKeyPress = ({
  eventName = 'keydown',
  keyCode,
  handler,
  disabled,
  preventDefault,
  altKey,
  ctrKey,
  shiftKey,
  captureInput = true,
  nonCtrKey,
}: CaptureKeyPressProps) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const tagName = (event.target as HTMLElement).tagName
      if (!event.keyCode || disabled) return

      // alt
      if (!!altKey && !event.altKey) return
      if (!altKey && event.altKey) return

      // ctr
      if (!!ctrKey && !event.ctrlKey && !event.metaKey) return
      if (!!nonCtrKey && (event.ctrlKey || event.metaKey)) return

      // shift
      if (!!shiftKey && !event.shiftKey) return
      if (!shiftKey && event.shiftKey) return

      // capture input
      if (!captureInput && event.target && (tagName === 'TEXTAREA' || tagName === 'INPUT')) return

      if ((typeof keyCode === 'number' && event.keyCode === keyCode) || (Array.isArray(keyCode) && keyCode.includes(event.keyCode))) {
        if (tagName === 'TEXTAREA' && event.keyCode === KEY_CODE.ENTER) return
        if (preventDefault) event.preventDefault()
        handler(event)
      }
    },
    [altKey, captureInput, ctrKey, disabled, handler, keyCode, nonCtrKey, preventDefault, shiftKey]
  )

  useEffect(() => {
    window.addEventListener(eventName, handleKeyPress)

    return () => {
      window.removeEventListener(eventName, handleKeyPress)
    }
  }, [eventName, handleKeyPress])

  return null
}

export default CaptureKeyPress
