import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import '../../styles/login.css'
import { userDetailsAction } from '../../redux/actions/auth';
import AdminTickets from './AdminPanel';


const Navbar = (props) => {
let logout = () =>{
   localStorage.clear()
   props.history.push('/')
   window.location.reload()
}

let register = () =>{
    props.history.push('/Register')
 }

const [show, setShow] = useState(false)

let AdminTickets = () =>{
   props.history.push('/admintickets')
}

let home = () =>{
    if(localStorage.user){
        props.history.push('/contact')
    }else{
        props.history.push('/')
    }
  
}

let showNavMenu = ()=> {
    setShow(!show)
}

let support = () =>{
    props.history.push('/support')
 }

    let admincheck
    if(localStorage.user != undefined){
       if (JSON.parse(localStorage.user).Type == 'admin') {
           admincheck = true
       }else {
           admincheck = false
       }
    }else{
       admincheck = false
    }

let onClientSurvey = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    let { _id = '', Type = ''} = user || {}
    if(Type == 'user'){
        props.history.push('/clientsurvey')
    }
}

let onTransactionSurvey = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    let { _id = '', Type = ''} = user || {}
    if(Type == 'user'){
        props.history.push('/transactionsurvey')
    }
}

  return (
      <div>
          <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
          
              <div class="navbar-brand">
                  <a class="navbar-item" href="">
                  </a>
                    <a class={`navbar-burger burger ${show ? 'is-active' : '' }`} aria-label="menu" aria-expanded="false" data-target="navMenu" onClick ={() => showNavMenu()}>
                      <span aria-hidden="true"></span>
                      <span aria-hidden="true"></span>
                      <span aria-hidden="true"></span>
                  </a>
              </div>

              <div id="navbarMenu" class={`navbar-menu ${show ? 'is-active' : ''}`}>
                  <div class="navbar-start">
                      {!admincheck ?
                          <a class="navbar-item" onClick={home}>
                              <strong>Home</strong>
                          </a> : ''

                      }
                    

                {
                    admincheck?
                    <a class="navbar-item" onClick ={AdminTickets}>
                         <strong>Tickets</strong>
                    </a>:''
                }
                    

                {
                    !admincheck && localStorage.user != undefined?
                    <a class="navbar-item" onClick ={support}>
                    <strong>Support</strong>
                    </a>:''
                }

                    
                {/* <a className='navbar-item' onClick={onClientSurvey}>ClientSurvey</a> */}

                {
                    !admincheck && localStorage.user != undefined?
                    <a class="navbar-item" onClick ={onClientSurvey}>
                    <strong>Client Survey</strong>
                    </a>:''
                }

                {
                    !admincheck && localStorage.user != undefined?
                    <a class="navbar-item" onClick ={onTransactionSurvey}>
                    <strong>Transaction Survey</strong>
                    </a>:''
                }


               </div>

                  <div class="navbar-end">
                  <div class="navbar-item">
                   <div class="buttons ">

                {(localStorage.user != undefined)?
                    <a class="button is-light " onClick ={logout}>
                    Logout
                   </a>:<a class="button is-light" onClick ={logout}>
                    Login
                   </a>
                   }

                {/* {(localStorage.user != undefined)?
                   
                    ''
                   :<a class="button is-light" onClick ={register}>
                    Register
                   </a>
                   } */}

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