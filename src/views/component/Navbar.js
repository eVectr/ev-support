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
   window.location.reload()
}

let admin = () =>{
   props.history.push('/admin')
}

let home = () =>{
    if(localStorage.user){
        props.history.push('/contact')
    }else{
        props.history.push('/')
    }
  
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
console.log("loacal storage ==>", localStorage)
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

                {
                    admincheck?
                    <a class="navbar-item" onClick ={admin}>
                         <strong>Admin</strong>
                    </a>:''
                }
                    

                {
                    !admincheck && localStorage.user != undefined?
                    <a class="navbar-item" onClick ={support}>
                    <strong>Support</strong>
                    </a>:''
                }
                   

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