import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux' 
import axios from 'axios'
import '../../styles/login.css'
import { userDetailsAction } from '../../redux/actions/auth'
import { showNotificationAction } from '../../redux/actions/notification/notification.js'
import loginValidation from '../../utils/LoginValidation'
import ImageUploader from './ImageUploader'
import is from 'is_js'


const RegisterForm = (props) => {

  const [data, setData] = useState({
    email:'',
    username: '',
    password: '',
})

const [LoginCheck, setLoginCheck] = useState([])
const [Errors, setErrors] = useState({})
const [loader, setloader] = useState(false)
const [SelectedImage, setSelectedImage] = useState([])
const [imagePreviewUrl, setimagePreviewUrl] = useState([])
const [FileNames, setFileNames] = useState([])

const handleChange = e => {
  const { name, value } = e.target

  setData({
      ...data,
      [name]: value,
  })
  setErrors({})
}

useEffect(() => {
  let user = JSON.parse(localStorage.getItem('user'))
  let { _id = '', Type = ''} = user || {}
  
  if(Type == 'admin'){  
    props.history.push('/contact')          
  }

  if(Type == 'user'){
    props.history.push('/contact')
  }

  
}, [])


const onDrop = (files) => {
    if (!files.length) {
        return
    }

    if (files.length > 1) {
        setFileNames(files)
    } else {
        setFileNames(prev => {
            const update = prev.concat(files[0])
            return update
        })
    }
}

const onDropImage = (files) => {
    if (!files.length) {
        return
    }
    if (files.length > 1) {
        setSelectedImage(files)
        for (let file of files) {
            let temp = Math.random().toString()
            temp = new FileReader()
            temp.onloadend = () => {
        
                setimagePreviewUrl(prev => {
                    const update = prev.concat([temp.result])
                    return update
                })
            }
            
                if (file) {
                    try {
                        temp.readAsDataURL(file)
                    }
                    catch (err) {
                        console.log(err)
                    }

                
            }
        }

    } else {
        setSelectedImage(prev => {
            const update = prev.concat(files[0])
            return update
        })
        let reader = new FileReader()
        reader.onloadend = () => {
            setimagePreviewUrl(prev => {
                const update = prev.concat([reader.result])
                return update
            })
        }
        for (let i = 0; i < files.length; i++) {
            if (files[i]) {
                reader.readAsDataURL(files[i])
            }
        }
    }
}

const onLogin = () => {
  const errors = loginValidation(data)
    if(!is.empty(errors)) {
        setErrors(errors) 
        return
      }

    setloader(true)

    let name = data.name
    let username = data.username
    let password = data.password

    axios.post(`http://18.219.191.74:7777/login`, {username:username, password:password})  
    .then(res =>{
     // console.log("res.data =>", res.data.data[0].Type)
      setloader(false)
      if (res.data.check) {
        if (res.data.data[0].Type == 'user') {
          localStorage.setItem('user', JSON.stringify(res.data.data[0]))
          props.history.push('/contact')
          props.dispatch(userDetailsAction(res.data))
          props.dispatch(showNotificationAction({
            text: 'Login Successfully',
            show: true
          }))
        } else {
          localStorage.setItem('user', JSON.stringify(res.data.data[0]))
          props.history.push('/admintickets')
          props.dispatch(userDetailsAction(res.data))
          props.dispatch(showNotificationAction({
            text: 'Login Successfully',
            show: true
          }))
        }
        //window.location.reload()
      }else{
        setLoginCheck(['Invalid Username or Password'])
      } 
  })
}

return (
  <div className='login-form'>
    <div className="log-form">
      <h1 className = "header">Register</h1>
      <div className="field">
        <label className="label left_align" >Email</label>
        <div className="control">
          <input className="input login"  name="email" type="email" placeholder="Enter email" value={data.email} onChange={handleChange} />
          <p className='error-message-text'>{(Errors.username && Errors. username[0]) || ''}</p>
        </div>
      </div>

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

     <ImageUploader onDrop={onDropImage}>
        <Fragment>
            <button className='link-btn'>Add</button>
            <p className="show-document-msg">image</p>
        </Fragment>
    </ImageUploader>

      <div className="field is-grouped">
        <div className="control">
          <button class="button  is-link submit-btn" onClick={onLogin} >Submit</button>
          {
            loader ? <div className='loading'><img src = {require('../../images/loader.gif')} /> </div>: ''
          }
          <p className='error-message-text'>{LoginCheck[0]}</p>
        </div>
      </div>

    </div>
  </div>
)
}

export default connect(state => state)(RegisterForm)

