import React, { useState } from 'react'
import { connect } from 'react-redux' 
import axios from 'axios'
import '../../styles/login.css'
import { userDetailsAction } from '../../redux/actions/auth';
import { showNotificationAction } from '../../redux/actions/notification/notification.js';
import loginValidation from '../../utils/LoginValidation'
import is from 'is_js'
import api_url from '../../utils/Const'




const Loginform = (props) => {

  const [data, setData] = useState({
    username: '',
    password: '',
})

const [LoginCheck, setLoginCheck] = useState([])
const [Errors, setErrors] = useState('')
const [loader, setloader] = useState(false)

const handleChange = e => {
  const { name, value } = e.target

  setData({
      ...data,
      [name]: value,
  })
 }

const onLogin = () => {

  const errors = loginValidation(data)
  console.log(errors)
    if (!is.empty(errors)) {
        setErrors(errors) 
        return
    }

    let username = data.username
    let password = data.password

    axios.post(`http://18.219.191.74:7777/login`, {username:username, password:password})
   // axios.post(`http://localhost:7777/login`, {username:username, password:password})
    
    .then(res =>{
      console.log("res.data", res.data)
      setloader(true)
      if(res.data.check){
        localStorage.setItem('user', JSON.stringify(res.data.data[0]))
        props.history.push('/contact')
        props.dispatch(showNotificationAction({
          text: 'Login Successfully',
          show: true
        }))
        props.dispatch(userDetailsAction(res.data))
        window.location.reload()
      }else{
        setLoginCheck(['Invalid Username or Password'])
      } 
  })
}

return (
  <div className='login-form'>
<div className="log-form">
  <h1 className = "header">LOGIN</h1>
  <div className="field">
    <label className="label left_align" >Username</label>
    <div className="control">
      <input className="input login"  name="username" type="text" placeholder="Enter username" value={data.username} onChange={handleChange} />
      <p className='error-message-text'>{(Errors.username && Errors. username[0]) || ''}</p>
    </div>
  </div>
  <div className="field login-password ">
    <label className="label left_align" >Password</label>
    <div className="control">
      <input className="input login" type="password"  name="password" placeholder="Enter Password"  value={data.password} onChange={handleChange} />
      <p className='error-message-text'>{(Errors.password && Errors. password[0]) || ''}</p>
    </div>
  </div>
  <div className="field is-grouped">
    <div className="control">
      <button class="button is-link submit-btn" onClick={onLogin} >Submit</button>
     
      <p className='error-message-text'>{LoginCheck[0]}</p>
    </div>
  </div>
</div>
</div>
)
}

export default connect(state => state)(Loginform);

