import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Loginform from './component/Loginform.js'
import StandardForm from './component/StandardForm'
import MandatoryUploadsForm from './component/MandatoryUploadsForm'
import OptionalForm from './component/OptionalForm'
import Navbar from './component/Navbar'
import SelectReason  from './component/SelectReason'

const Routes = () => 
    <BrowserRouter>
    <Navbar></Navbar>
        <Switch>
            <Route exact path="/" component={Loginform} />
            <Route exact path="/contact" component={SelectReason} />
            <Route exact path="/contact/1" component={StandardForm} />
            <Route exact path="/contact/2" component={MandatoryUploadsForm} />
            <Route exact path="/contact/3" component={OptionalForm} />
        </Switch>
    </BrowserRouter>

export default Routes

