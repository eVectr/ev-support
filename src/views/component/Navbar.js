
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
let onHistory = () =>{

     props.history.push('/ContactHistory')
   
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
                       <a class="navbar-item">
                           <strong>Home</strong>
                     </a>
                
                </div>

                   <div class="navbar-end">
                   <div class="navbar-item">
                    <div class="buttons">
                
                 {(props.auth.userDetails.check)?
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


