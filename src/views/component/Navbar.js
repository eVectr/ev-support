import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../../styles/login.css'

const Navbar = (props) => {
  let logout = () => {
    localStorage.clear()
    props.history.push('/')
  }
  const [show, setShow] = useState(false)
  let admin = () => {
    props.history.push('/admin')
  }
  let home = () => {
    if (localStorage.user) {
      props.history.push('/contact')
    } else {
      props.history.push('/')
    }
  }
  let showNavMenu = () => {
    setShow(!show)
  }
  let support = () => {
    props.history.push('/support')
  }
  let adminCheck
  let subAdminCheck
  if (localStorage.user !== undefined) {
    if (JSON.parse(localStorage.user).Type === 'admin') {
      adminCheck = true
    }else if(JSON.parse(localStorage.user).Type === 'subadmin'){
      subAdminCheck = true
    }
     else {
      adminCheck = false
      subAdminCheck = false
    }
  } 

  let onClientSurvey = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    let { Type = '' } = user || {}
    if (Type === 'user') {
      props.history.push('/clientsurvey')
    }
  }

  let onTransactionSurvey = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    let { Type = '' } = user || {}
    if (Type === 'user') {
      props.history.push('/transactionsurvey')
    }
  }
  let onMessageLogs = () => {
    props.history.push('/messageLogs')
  }
  let showUserlist = () => {
    props.history.push('/tools')
  }
  let onNotification = () => {
  
    props.history.push('/notification')
  }
  
  return (
    <div>
      <nav class='navbar header-main' role='navigation' aria-label='main navigation'>
        <div class='navbar-brand'>
          <a class='navbar-item' href='' />
          <a class={`navbar-burger burger ${show ? 'is-active' : ''}`} aria-label='menu' aria-expanded='false' data-target='navMenu' onClick={() => showNavMenu()}>
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </a>
        </div>

        <div id='navbarMenu' class={`navbar-menu ${show ? 'is-active' : ''}`}>
          <div class='navbar-start'>
           
            {
              adminCheck 
                ? 
                  <div>
                    <li>
                        <a class='navbar-item' onClick={admin}>
                          <strong>Admin</strong>
                        </a>
                    </li>
                    <li>
                    <li>
                        <a class='navbar-item' onClick={() => showUserlist()}>
                            <strong>Tools and Credential Control</strong>
                        </a>
                    </li>
                    </li>
                  </div>
                 : ''
            }

{
              subAdminCheck 
                ? 
                <div>
                <li>
                    <a class='navbar-item' onClick={admin}>
                      <strong>Sub Admin</strong>
                    </a>
                </li>
                <li>
                <li>
                   
                </li>
                </li>
              </div>
             : ''
            }
          
          

             {
              !adminCheck && localStorage.user !== undefined && JSON.parse(localStorage.user).Type !='subadmin'
                ? <a class='navbar-item' onClick={home}>
                   <strong>Home</strong>
                </a> : ''
            }
            {
              !adminCheck && localStorage.user !== undefined && JSON.parse(localStorage.user).Type !='subadmin'
                ? <a class='navbar-item' onClick={onClientSurvey}>
                  <strong>Client Survey</strong>
                </a> : ''
            }
            {
              !adminCheck && localStorage.user !== undefined && JSON.parse(localStorage.user).Type !='subadmin'
                ? <a class='navbar-item' onClick={onTransactionSurvey}>
                  <strong>Transaction Survey</strong>
                </a> : ''
            }
            {
              !adminCheck && localStorage.user !== undefined && JSON.parse(localStorage.user).Type !='subadmin'
                ? <a class='navbar-item' onClick={onMessageLogs}>
                  <strong>Message Logs</strong>
                </a> : ''
            }
             {
              !adminCheck && localStorage.user !== undefined && JSON.parse(localStorage.user).Type !='subadmin'
                ? <a class='navbar-item' onClick={onNotification}>
                  <strong> Notification </strong>
                </a> : ''
            }
          </div>
          <div class='navbar-end'>
            <div class='navbar-item'>
                {(localStorage.user !== undefined)
                  ?JSON.parse(localStorage.user).Type == 'subadmin'?
                  <p className="logedinUser">
                  Logged in as  SubAdmin
                </p>:
                   <p className="logedinUser">
                    Logged in as  {JSON.parse(localStorage.user).Name}
                  </p> : ''
                }
             
            </div>
          </div>
          <div class='navbar-end'>
            <div class='navbar-item'>
              <div class='buttons '>
                {(localStorage.user !== undefined)
                  ? <a class='button is-link  ' onClick={logout}>
                    Logout
                  </a> : ''
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
const NavbarWithRouter = withRouter(Navbar)
export default connect(state => state)(NavbarWithRouter)
