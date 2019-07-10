import React from 'react'
import 'bulma/css/bulma.css'

import './styles/App.css'
import Loginform from './views/component/Loginform'
import StandardForm from './views/component/StandardForm'
import Navbar from './views/component/Navbar'
import SelectReason from './views/component/SelectReason'
import Route from './views/Routes'

function App () {
  return (
    <div className='App'>
      <Route />
    </div>
  )
}

export default App
