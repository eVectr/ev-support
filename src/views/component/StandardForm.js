import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import FlashMassage from 'react-flash-message'

import axios from 'axios'
import contactValidation from '../../utils/contactValidation'
import '../../styles/login.css'
import is from 'is_js'

const ContactForm = (props) => {
  const [successMessage, setSuccessMessage] = useState('')
  const [showFlashMsg, setShowFlashMsg] = useState(false)

  const [data, setData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [Errors, setErrors] = useState('')
  const [loader, setLoader] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })
    setErrors({})
  }

  let generateCaseNo = () => {
    return new Promise((resolve, reject) => {
      let date = new Date()
      let sec = date.getSeconds() + 1
      let caseNo = 'SS'.concat('0000').concat((Math.random() * 100000000).toFixed() * sec)
      resolve(caseNo)
    })
  }

  const onSubmit = () => {
    const errors = contactValidation(data)
    if (!is.empty(errors)) {
      setErrors(errors)
      return
    }
    setLoader(true)
    generateCaseNo().then(res => {
      
      let Transaction_Number = ''
      let Name = data.name.charAt(0).toUpperCase() + data.name.substring(1)
      let Email = data.email
      let Subject = data.subject.charAt(0).toUpperCase() + data.subject.substring(1)
      let Message = data.message.charAt(0).toUpperCase() + data.message.substring(1)
      let date = Date.now()
      let Case_No = res
      let Link = []
     // axios.post(`http://localhost:7777/saveContact`, { UserId: JSON.parse(localStorage.user)._id,
      axios.post(`http://3.83.23.220:7788/saveContact`, { UserId: JSON.parse(localStorage.user)._id,
      Transaction_Number,
        Name,
        Email,
        Subject,
        Message,
        date,
        Case_No,
        Link,
        Reason: props.notificationreducer.selectedReason.name,
        Template: props.notificationreducer.selectedReason.template })
        .then(res => {
          console.log('res =>', res)
          setShowFlashMsg(true)
          setLoader(false)
          if (res.status == 200) {
            setSuccessMessage('Your query has been recorded')
          } else {
            setSuccessMessage('Something Went Wrong')
          }
          setData({ name: '',
            email: '',
            subject: '',
            message: ''
          })
        })
      setShowFlashMsg(false)
    })
  }
  function myFunction () {
    setTimeout(function () {
      props.history.push('/contact')
    }, 3000)
  }

  if (props.notificationreducer.selectedReason == undefined) {
    props.history.push('/contact')
  }

  return (
    <div className='form-container homeForms'>
      <div className='contact-form'>
        <div className='header'> <span>Contact Us</span> </div>

        <div className='pading'>
          <div className='field'>
            <div class='control has-icons-left has-icons-right'>
              <label className='label left_align'>Name</label>
              <div className='control'>
                <input className='input contact-input' type='text' name='name' placeholder='Name (Optional)' value={data.name} onChange={handleChange} />
                <span class='icon is-medium is-left icn'>
                  <i class='fas fa-id-card icn1 ' />
                </span>
              </div>
            </div>
          </div>

          <div className='field'>
            <div class='control has-icons-left has-icons-right'>
              <label className='label left_align'>Email</label>
              <div className='control'>
                <input className='input contact-input' type='email' name='email' placeholder='Email (Mandatory)' value={data.email} onChange={handleChange} />
                <p className='error-message-text'>{(Errors.email && Errors.email[0]) || ''}</p>
                <span class='icon is-medium is-left icn'>
                  <i class='fas fa-id-card icn1' />
                </span>
              </div>
            </div>
          </div>

          <div className='field'>
            <div class='control has-icons-left has-icons-right'>
              <label className='label left_align'>Subject</label>
              <div className='control'>
                <input className='input contact-input' type='text' name='subject' placeholder='Subject (Optional)' value={data.subject} onChange={handleChange} />
                <span class='icon is-medium is-left icn'>
                  <i class='fas fa-id-card icn1' />
                </span>
              </div>
            </div>
          </div>

          <div className='field'>
            <label className='label left_align'>Messages</label>
            <div className='control'>
              <textarea className='textarea' name='message' placeholder='Enter Message (Mandatory)' value={data.message} onChange={handleChange} />
              <p className='error-message-text'>{(Errors.message && Errors.message[0]) || ''}</p>
            </div>
          </div>
          <button class='button is-success' onClick={onSubmit} >Send</button>
          <div className='send-success-msg'>
            {

              loader ? <img src={require('../../images/loader.gif')} /> : ''
            }
          </div>
          {
            showFlashMsg ? <FlashMassage duration={5000} persistOnHover>
              <p className='send-success-msg'>{successMessage}</p>
            </FlashMassage> : null
          }
        </div>
      </div>
    </div>
  )
}
export default connect(state => state)(ContactForm)
