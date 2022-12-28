import React, { useState } from 'react'
//
import Independent from '@/Independent'
import Dependent from '@/Dependent'
import { Button, Drawer } from '@material-ui/core'
import { EscapeHandler } from '../libs/escape'

function App() {
  const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <div>
      <label htmlFor="cars">Choose a car:</label>

      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <input type="text" />
      <div>
        <h1>Independent</h1>
        <Independent />
      </div>
      <div>
        <h1>Dependent</h1>
        <Dependent />
      </div>

      <div>
        <h1>Material UI</h1>
        <Button
          onClick={() => {
            setOpenDrawer(true)
          }}
        >
          Open drawer
        </Button>
        <Drawer
          classes={{
            root: 'drawer-root',
          }}
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          ModalProps={{ hideBackdrop: true, disableEnforceFocus: true }}
        >
          <EscapeHandler handler={() => setOpenDrawer(false)} />
          <h1>Context</h1>
        </Drawer>
      </div>
    </div>
  )
}

export default App
