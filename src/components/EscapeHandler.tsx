import React from 'react'
import { EscapeStack } from '@/utils/escape-stack'
import { v4 as uuidv4 } from 'uuid'

type EscapeHandlerProps = {
  handler: () => void
  active?: boolean
}

class EscapeHandler extends React.PureComponent<EscapeHandlerProps> {
  stackKey = uuidv4()

  componentDidMount() {
    EscapeStack.push({
      key: this.stackKey,
      handler: this.props.handler,
    })
  }

  componentDidUpdate(prevProps: Readonly<EscapeHandlerProps>) {
    if (prevProps.active !== this.props.active) {
      if (this.props.active) {
        EscapeStack.push({
          key: this.stackKey,
          handler: this.props.handler,
        })
      } else {
        EscapeStack.manualPop([this.stackKey])
      }
    }
  }

  componentWillUnmount() {
    EscapeStack.manualPop([this.stackKey])
  }

  render() {
    return null
  }
}

export default EscapeHandler
