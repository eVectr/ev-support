import React, { useState } from 'react'
import { connect } from 'react-redux' 
import axios from 'axios'
import Validation from '../../utils/Validation'
import '../../styles/login.css'
import is from 'is_js'

const ContactForm = (props) => {

  const [successMessage, setSuccessMessage] = useState('')

  const [data, setData] = useState({
    name:'',
    email:'',
    subject:'',
    message: '',
})

const [Errors, setErrors] = useState('')

const handleChange = e => {
  const { name, value } = e.target

  setData({
      ...data,
      [name]: value,
  })
 }

 let  generateCaseNo= ()=> {
   return new Promise((resolve, reject)=>{
    let date  = new Date
    let sec = date.getSeconds() +1
    console.log(sec)
    let caseNo = 'SS'.concat( (Math.random() * 10000000000).toFixed()).concat('CONTACT')
    resolve(caseNo)
   }) 
  }

  const onSubmit = () => {
    const errors = Validation(data)
    if (!is.empty(errors)) {
        setErrors(errors)
        
    }
    generateCaseNo().then(res =>{
      let Transaction_Number = ''
      let  Name = data.name
      let Email = data.email
      let  Subject = data.subject
      let Message = data.message
      let  date = Date.now()
      let Case_No = res
      let Document = ''
      let Image = ''
      let Link = ''

      axios.post(`http://localhost:7777/saveContact`, {Transaction_Number,Name, Email, Subject, Message,date, Case_No, Document, Image, Link })
      .then(res =>{
        console.log("ERRORS =>", Errors)
        setSuccessMessage('Contact Data Saved Successfuly')
      })
    })
  }

  console.log("success mEssage =>", successMessage)
  console.log("ERRORS1 =>", Errors)
  return (
    <div className = "form-container">
    <div className="contact-form">
    <div className="header"> <span>Contact Us</span> </div>
   
        <div className="pading">
          <div className="field">
            <div class="control has-icons-left has-icons-right">
              <label className="label left_align">Name</label>
              <div className="control">
                <input className="input contact-input" type="text" name="name" placeholder="Name (Optional)" value={data.name} onChange={handleChange} />
                <span class="icon is-medium is-left icn">
                  <i class="fas fa-id-card icn1 " ></i>
                </span>
              </div>
            </div>
          </div>

          <div className="field">
          <div class="control has-icons-left has-icons-right">
            <label className="label left_align">Email</label>
            <div className="control">
              <input className="input contact-input" type="email" name="email" placeholder="Email (Mandatory)" value={data.email} onChange={handleChange} />
              <p className='error-message-text'>{(Errors.email && Errors. email[0]) || ''}</p>
              <span class="icon is-medium is-left icn">
                  <i class="fas fa-id-card icn1"></i>
                </span>
            </div>
          </div>
          </div>

          <div className="field">
          <div class="control has-icons-left has-icons-right">
            <label className="label left_align">Subject</label>
            <div className="control">
              <input className="input contact-input" type="text" name="subject" placeholder="Subject (Optional)" value={data.subject} onChange={handleChange} />
              <span class="icon is-medium is-left icn">
                  <i class="fas fa-id-card icn1"></i>
                </span>
            </div>
          </div>
          </div>

          <div className="field">
            <label className="label left_align">Messages</label>
            <div className="control">
              <textarea className="textarea" name="message" placeholder="Enter Message" value={data.message} onChange={handleChange} />
              <p className='error-message-text'>{(Errors.message && Errors. message[0]) || ''}</p>
          </div>
          </div>
          <button class="button is-success" onClick={onSubmit} >Send</button>
          <p>{successMessage}</p>
        </div>
      </div>
    </div>
  )
}

export default connect(state => state)(ContactForm);


