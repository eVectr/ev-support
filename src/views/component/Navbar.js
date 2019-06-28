import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import '../../styles/login.css'
import { userDetailsAction } from '../../redux/actions/auth';


const Navbar = (props) => {
let logout = () =>{
   localStorage.clear()
   props.history.push('/')
}

let admin = () =>{
   props.history.push('/admin')
}

let home = () =>{
   props.history.push('/')
}

let support = () =>{
    props.history.push('/support')
 }

    let admincheck
    if(localStorage.user != undefined){
       if (JSON.parse(localStorage.user).Type == 'admin') {
           admincheck = true
       } else {
           admincheck = false
       }
    }else{
       admincheck = false
    }

  return (
      <div>
          <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
              <div class="navbar-brand">
                  <a class="navbar-item" href="https://bulma.io">

                  </a>

                  <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                      <span aria-hidden="true"></span>
                      <span aria-hidden="true"></span>
                      <span aria-hidden="true"></span>
                  </a>
              </div>

              <div id="navbarBasicExample" class="navbar-menu">
                  <div class="navbar-start">
                      <a class="navbar-item" onClick ={home}>
                          <strong>Home</strong>
                    </a>

                    <a class="navbar-item" onClick ={admin}>
                         {admincheck?<strong>Admin</strong>:''}
                    </a>

                    <a class="navbar-item" onClick ={support}>
                         {!admincheck && localStorage.user != undefined?<strong>Support</strong>:''}
                    </a>

               </div>

                  <div class="navbar-end">
                  <div class="navbar-item">
                   <div class="buttons">

                {(localStorage.user != undefined)?
                    <a class="button is-light" onClick ={logout}>
                    Logout
                   </a>:<a class="button is-light" onClick ={logout}>
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