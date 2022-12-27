import React from 'react'
//
import Independent from '@/Independent'
import Dependent from '@/Dependent'

function App() {
  return (
    <div>
      <div>
        <h1>Independent</h1>
        <Independent />
      </div>
      <div>
        <h1>Dependent</h1>
        <Dependent />
      </div>
    </div>
  )
}

export default App
