import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../../styles/login.css'

const Navbar = (props) => {
  let logout = () => {
    localStorage.clear()
    props.history.push('/')
    window.location.reload()
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
  if (localStorage.user !== undefined) {
    if (JSON.parse(localStorage.user).Type === 'admin') {
      adminCheck = true
    } else {
      adminCheck = false
    }
  } else {
    adminCheck = false
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
            <a class='navbar-item' onClick={home}>
              <strong>Home</strong>
            </a>

            {
              adminCheck
                ? <a class='navbar-item' onClick={admin}>
                  <strong>Admin</strong>
                </a> : ''
            }
            {/* {
              !adminCheck && localStorage.user !== undefined
                ? <a class='navbar-item' onClick={support}>
                  <strong>Support</strong>
                </a> : ''
            } */}
            {
              !adminCheck && localStorage.user !== undefined
                ? <a class='navbar-item' onClick={onClientSurvey}>
                  <strong>Client Survey</strong>
                </a> : ''
            }

            {
              !adminCheck && localStorage.user !== undefined
                ? <a class='navbar-item' onClick={onTransactionSurvey}>
                  <strong>Transaction Survey</strong>
                </a> : ''
            }
            {
              !adminCheck && localStorage.user !== undefined
                ? <a class='navbar-item' onClick={onMessageLogs}>
                  <strong>Meassage Logs</strong>
                </a> : ''
            }
          </div>

          <div class='navbar-end'>
            <div class='navbar-item'>
              <div class='buttons '>
                {(localStorage.user !== undefined)
                  ? <a class='button is-link  ' onClick={logout}>
                    Logout
                  </a> : <a class='button is-link' onClick={logout}>
                    Login
                  </a>
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
