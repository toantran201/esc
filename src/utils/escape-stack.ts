import { KEY_CODE } from '@/constants'

type EscapeStackItem = {
  handler: () => void
  key: string
}

declare global {
  interface Window {
    __escape_stack: EscapeStackItem[]
  }
}

if (!window.__escape_stack) {
  window.__escape_stack = []
}

export const EscapeStack = {
  push: (item: EscapeStackItem) => {
    if (!item.handler || !item.key) return
    if (!window.__escape_stack) {
      EscapeStack.reset()
    }
    const existIdx = window.__escape_stack.findIndex((s) => s.key === item.key)
    if (existIdx >= 0) {
      throw new Error('Key already exists')
    }
    window.__escape_stack.push(item)
  },

  pop: () => {
    if (window.__escape_stack && window.__escape_stack.length > 0) {
      return window.__escape_stack.pop()
    }
    return null
  },

  manualPop: (keys: string[]) => {
    if (window.__escape_stack && window.__escape_stack.length > 0) {
      window.__escape_stack = window.__escape_stack.filter((item) => !keys.includes(item.key))
    }
  },

  reset: () => {
    window.__escape_stack = []
  },
}

window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (!event.keyCode) return
  if (event.keyCode === KEY_CODE.ESC) {
    event.preventDefault()
    const el = event.target as HTMLElement
    const tagName = el?.tagName
    if (tagName === 'TEXTAREA' || tagName === 'INPUT' || tagName === 'SELECT') {
      el?.blur()
      return
    }
    const stackItem = EscapeStack.pop()
    if (!stackItem) return
    if (stackItem.handler && typeof stackItem.handler === 'function') {
      stackItem.handler()
    }
  }
})
