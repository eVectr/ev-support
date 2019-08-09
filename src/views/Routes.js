import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Loginform from './component/Loginform.js'
import StandardForm from './component/StandardForm'
import OptionalForm from './component/OptionalForm'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import SelectReason from './component/SelectReason'
import AdminPanel from './component/AdminPanel'
import Support from './component/Support'
import RouterChangeObserver from './component/RouterChangeObserver'
import SuccessfulNotification from './component/SuccessfulNotification'
import Survey from './component/Survey'
import TransactionSurvey from './component/TransactionSurvey'
import MessageLogs from './component/MessageLogs'
import AdminTicket from './component/AdminTicket'
import UserList from './component/UserList'
import Notification from './component/Notification'
const Routes = (props) => {
  let { notificationreducer = {} } = props
  let { notification = {} } = notificationreducer
  let { text = '', show = false } = notification
  return (
    <BrowserRouter>
      <RouterChangeObserver>
        <Navbar />
        <SuccessfulNotification text={text} show={show} />
        <Switch>
          <Route exact path='/' component={Loginform} />
          <Route exact path='/contact' component={SelectReason} />
          <Route exact path='/contact/1' component={StandardForm} />
          <Route exact path='/contact/2' component={OptionalForm} />
          <Route exact path='/contact/3' component={OptionalForm} />
          <Route exact path='/admin' component={AdminPanel} />
          <Route exact path='/support' component={Support} />
          <Route exact path='/contact/4' component={Survey} />
          <Route exact path='/clientsurvey' component={Survey} />
          <Route exact path='/transactionsurvey' component={TransactionSurvey} />
          <Route exact path='/adminticket/:id' component={AdminTicket} />
          <Route exact path='/messageLogs' component={MessageLogs} />
          <Route exact path='/userList' component={UserList} />
          <Route exact path="/notification" component={Notification} />          
        </Switch>
        <Footer />
      </RouterChangeObserver>
    </BrowserRouter>
  )
}
export default connect(({ dispatch, notificationReducer }) => ({ dispatch, notificationReducer }))(Routes)
