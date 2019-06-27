import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Loginform from './component/Loginform.js'
import StandardForm from './component/StandardForm'
import OptionalForm from './component/OptionalForm'
import Navbar from './component/Navbar'
import SelectReason  from './component/SelectReason'
import AdminPanel from './component/AdminPanel'
import RouterChangeObserver from './component/RouterChangeObserver'
import SuccessfulNotification from './component/SuccessfulNotification'

const Routes = (props) => {
    let { notificationreducer = {} } = props
    let { notification = {} } = notificationreducer
    let { text = '' , show = false } = notification
    console.log(text, 'text')
    console.log(show, 'show')

    return(
    <BrowserRouter>
    <RouterChangeObserver>
        <Navbar/>
        <SuccessfulNotification text={text} show={show} />
        <Switch>
            <Route exact path="/" component={Loginform} />
            <Route exact path="/contact" component={SelectReason} />
            <Route exact path="/contact/1" component={StandardForm} />
            <Route exact path="/contact/2" component={OptionalForm} />
            <Route exact path="/contact/3" component={OptionalForm} />
            <Route exact path="/admin" component={AdminPanel} />
        </Switch>
    </RouterChangeObserver>
    </BrowserRouter>
)}
export default connect(({dispatch, notificationReducer}) => ({dispatch, notificationReducer}))(Routes)

