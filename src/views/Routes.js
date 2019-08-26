import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, BrowserRouter, Redirect, withRouter } from 'react-router-dom'
import Loginform from './component/Loginform.js'
import StandardForm from './component/StandardForm'
import OptionalForm from './component/OptionalForm'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import SelectReason from './component/SelectReason'
import AdminPanel from './component/AdminPanel'
import RouterChangeObserver from './component/RouterChangeObserver'
import SuccessfulNotification from './component/SuccessfulNotification'
import Survey from './component/Survey'
import TransactionSurvey from './component/TransactionSurvey'
import MessageLogs from './component/MessageLogs'
import AdminTicket from './component/AdminTicket'
import SubAdminList from './component/SubAdminList'
import Notification from './component/Notification'
const Routes = (props) => {
  let { notificationreducer = {} } = props
  let { notification = {} } = notificationreducer
  let { text = '', show = false } = notification


  const checkAuth = () => {
    const isLoggedIn = localStorage.getItem('user')
    return isLoggedIn
  }

  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  )

  const adminAuth = () => {
    let check = JSON.parse(localStorage.user).Type
    if(check == 'admin'){
      return true
    }
  }

  const AdminAuthRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        adminAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  )
  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        checkAuth() ? JSON.parse(localStorage.user).user = 'user'?
         <Redirect to={{ pathname: '/contact' }} />:
           <Redirect to={{ pathname: '/admin' }} />
         : (
            <Component {...props} />
          )
      }
    />
  )
  
  return (
    <BrowserRouter>
      <RouterChangeObserver>
        <Navbar />
        <SuccessfulNotification text={text} show={show} />
        <Switch>
          <PublicRoute exact path='/' component={Loginform} />
          <AuthRoute exact path='/contact' component={SelectReason} />
          <AuthRoute exact path='/contact/1' component={StandardForm} />
          <AuthRoute exact path='/contact/2' component={OptionalForm} />
          <AuthRoute exact path='/contact/3' component={OptionalForm} />
          <AuthRoute exact path='/admin' component={AdminPanel} />
          <AuthRoute exact path='/contact/4' component={Survey} />
          <AuthRoute exact path='/clientsurvey' component={Survey} />
          <AuthRoute exact path='/transactionsurvey' component={TransactionSurvey} />
          <AuthRoute exact path='/adminticket/:id' component={AdminTicket} />
          <AuthRoute exact path='/messageLogs' component={MessageLogs} />
          <AuthRoute exact path='/messageLogs/:id' component={MessageLogs} />
          <AuthRoute exact path='/subAdminList' component={SubAdminList} />
          <AuthRoute exact path="/notification" component= {Notification} />  
          {/* <Route exact path="/notification" component= {localStorage.user != undefined? Notification: Loginform} />           */}
        </Switch>
        <Footer />
      </RouterChangeObserver>
    </BrowserRouter>
  )
}

export default connect(({ dispatch, notificationReducer }) => ({ dispatch, notificationReducer }))(Routes)
