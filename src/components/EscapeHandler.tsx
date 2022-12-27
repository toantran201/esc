import React from 'react'
import CaptureKeyPress from '@/components/CaptureKeyPress'
import { KEY_CODE } from '@/constants'
import EscapeStack from '@/utils/escape-stack'

type EscapeHandlerProps = {
  handler: () => void
  status?: 'on' | 'off'
}

class EscapeHandler extends React.PureComponent {
  // componentDidUpdate(prevProps: Readonly<EscapeHandlerProps>) {
  //   if (prevProps.status !== this.props.status && this.props.status === 'on') {
  //     EscapeStack.push(this.props.handler)
  //   }
  // }

  handlePressEsc = () => {
    const stackItem = EscapeStack.pop()
    if (!stackItem) return
    if (stackItem.handler && typeof stackItem.handler === 'function') {
      stackItem.handler()
    }
  }

  render() {
    return <CaptureKeyPress keyCode={KEY_CODE.ESC} handler={this.handlePressEsc} />
  }
}

export default EscapeHandler
