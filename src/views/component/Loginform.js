import React, { useState } from 'react'
import { connect } from 'react-redux' 
import axios from 'axios'
import '../../styles/login.css'
import { userDetailsAction } from '../../redux/actions/auth';
import Validation from '../../utils/Validation'
import is from 'is_js'


const Loginform = (props) => {

  const [data, setData] = useState({
    username: '',
    password: '',
})

const [Errors, setErrors] = useState('')

const handleChange = e => {
  const { name, value } = e.target

  setData({
      ...data,
      [name]: value,
  })
 }

const onLogin = () => {

  const errors = Validation(data)
    if (!is.empty(errors)) {
        setErrors(errors)
        
    }

    let username = data.username
    let password = data.password


    axios.post(`http://localhost:7777/login`, {username:username, password:password})
    .then(res =>{
      console.log("res.data", res.data.check)
      if(res.data.check){
        props.history.push('/contact')
        props.dispatch(userDetailsAction(res.data))
      } 
  })
}
console.log(" login props =>", props)
return (
<div className="log-form">
  <h1 className = "header">LOGIN</h1>
  <div className="field">
    <label className="label left_align" >Username</label>
    <div className="control">
      <input className="input"  name="username" type="text" placeholder="Enter username" value={data.username} onChange={handleChange} />
      <p className='error-message-text'>{(Errors.username && Errors. username[0]) || ''}</p>
    </div>
  </div>
  <div className="field">
    <label className="label left_align" >Password</label>
    <div className="control">
      <input className="input" type="password"  name="password" placeholder="Enter Password"  value={data.password} onChange={handleChange} />
      <p className='error-message-text'>{(Errors.password && Errors. password[0]) || ''}</p>
    </div>
  </div>
  <div className="field is-grouped">
    <div className="control">
      <button class="button is-link submit-btn" onClick={onLogin} >Submit</button>
    </div>
  </div>
</div>
)
}

export default connect(state => state)(Loginform);

