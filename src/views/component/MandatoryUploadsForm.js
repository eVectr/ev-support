import React, { useState } from 'react'
import { connect } from 'react-redux' 
import axios from 'axios'
import Uploader from './Uploader'
import Validation from '../../utils/Validation'
import is from 'is_js'
import '../../styles/login.css'

import Dropzone from 'react-dropzone'

const ContactForm = (props) => {

  const [data, setData] = useState({
    name:'',
    email:'',
    subject:'',
    message: '',
    })

    const [selectedClaim, setSelectedClaim] = useState(0)
    const [FileNames, setFileNames] = useState([])
    const [Errors, setErrors] = useState('')

    const handleChange = e => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value,
        })
    }

    const onDrop = (files) => {
        console.log("file name" , files)
        if (!files.length) {
            return
        }

    setFileNames(prev => {
        const update = prev.concat(files[0].name)
        return update
    })
       // setLoading(true)
        // let data = new FormData()
        // data.append('file', files[0])
        // setErrors({
        //     file: [],
        // })
       // apiUploadFile(data).then(res => {
            // setLoading(false)
            // setFile(`${API_URL}/${res.uploadUrl}`)
        //})
    }

    const onSubmit = () => {
        const errors = Validation(data)
        if (!is.empty(errors)) {
            setErrors(errors)
            return
        }

        let { auth = {} } = props
        let { userDetails = {} } = auth

        let user_Id = userDetails.data[0]._id
        let Name = userDetails.data[0].Name

        axios.post(`http://localhost:7777/savecontact`, { user_Id: user_Id, Name: Name, Reason: data.reason, Message: data.message, date: Date.now() })
            .then(res => {
                console.log("saved response =>", res)
            })
    }

    const claims = ["Documents", "Images", "Links"]


  const Documents = () => {
      return (
          <div>
          <div> {
            FileNames.map((file, index) => {
                return (
                    <ul>
                        <li><h1>{file}</h1></li>
                    </ul>
                )
            })
          }</div>
        <Uploader onDrop={onDrop}>
        <div className='field'>
            <div className='file is-small'>
                <label className='file-label'>
                    <span className={`file-cta font-1rem `}>
                        <span className='file-icon'>
                            <i className='fas fa-upload'></i>
                        </span>
                        <span className='file-label'>
                            Upload 
                    </span>
                    </span>
                </label>
            </div>
        </div>
    </Uploader>
    
    </div>
      )
  }

  const Images = () => {
    return (
        <div>
        <div> {
          FileNames.map((file, index) => {
              return (
                  <ul>
                      <li><h1>{file}</h1></li>
                  </ul>
              )
          })
        }</div>
      <Uploader onDrop={onDrop}>
      <div className='field'>
          <div className='file is-small'>
              <label className='file-label'>
                  <span className={`file-cta font-1rem `}>
                      <span className='file-icon'>
                          <i className='fas fa-upload'></i>
                      </span>
                      <span className='file-label'>
                          Upload 
                  </span>
                  </span>
              </label>
          </div>
      </div>
  </Uploader>
  
  </div>
  )
}

  const renderClaims = () => {

    switch(selectedClaim) {
        case 0: return Documents()
        case 1 : return Images()
        case 2 : return <input type = "text" placeholder ="Input link here" ></input>
    }
  }

 
  console.log(" file names =>", FileNames)

    return (
        <div className="form-container">
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
                        </div>
                    </div>

                    <div className="field">
                        <label className="label left_align">Options to Substantiate Claim (Mandatory)</label>
                    </div>

                    <div className="field">
                    <div className="control">
                    <div class="tabs  is-boxed">
                        <ul>
                            {
                                claims.map((claim, index) => {
                                    return (
                                        <li class={index === selectedClaim  ? "is-active" : "" } key={index} onClick={ () => setSelectedClaim(index)}>
                                            <a>
                                                <span>{claim}</span>
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                            </div>
                        </div>
                    </div>
                   

                    {
                        renderClaims()
                    }
                  
                    <button className="button is-success" onClick={onSubmit} >Send</button>
                </div>
            </div>
        </div>
    )
}

export default connect(state => state)(ContactForm);


