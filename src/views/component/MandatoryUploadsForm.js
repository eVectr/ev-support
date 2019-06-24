import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Uploader from './Uploader'
import ImageUploader from './ImageUploader'
import Validation from '../../utils/Validation'
import is from 'is_js'
import '../../styles/login.css'

import Dropzone from 'react-dropzone'

const ContactForm = (props) => {

    const [data, setData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const [selectedClaim, setSelectedClaim] = useState(0)
    const [FileNames, setFileNames] = useState([])
    const [SelectedImage, setSelectedImage] = useState([])
    const [ImagePath, setImagePath] = useState([])
    const [Errors, setErrors] = useState('')

    const handleChange = e => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value,
        })
    }

    const onDrop = (files) => {
        console.log("file name", files)
        if (!files.length) {
            return
        }

        setFileNames(prev => {
            console.log(prev,"prev")
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

    const onDropImage = (files) => {
       
        if (!files.length) {
            return
        }
        let data = new FormData()
        data.append('file', files[0])
        console.log("data 11111=>", data)
        console.log("filess =>", files)
        setSelectedImage(prev => {
            const update = prev.concat(files[0].name)
            return update
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
          let Image = ImagePath
          let Link = ''
    
          axios.post(`http://localhost:7777/saveContact`, {Transaction_Number,Name, Email, Subject, Message,date, Case_No, Document, Image, Link })
          .then(res =>{
            console.log("ERRORS =>", Errors)

          })
        })
      }

    const claims = ["Documents", "Images", "Links"]


    const Documents = () => {
        return (
            <div>
                <form>
                    <input type="file" class="form-control" multiple onChange={onChangeHandler} />
                    <button type="button" class="btn btn-success btn-block" onClick={onClickHandler}>Upload</button>
                </form>
            </div>
        )
    }

    let onChangeHandler = event => {
        console.log(event.target.files)
        //setSelectedImage(event.target.files)
        setSelectedImage([1,2,3])
    }

    let onClickHandler = () => {
        let formData = new FormData()
        for(let i = 0; i< SelectedImage.length ; i++){
            formData.append('SelectedImage', SelectedImage[i])
        }
        axios.post(`http://localhost:7777/upload`, formData,{
            headers: { 'content-type': 'multipart/form-data' }
        }).then(res => { 
            console.log("res =>", res)
        }).catch(err =>{
            console.log({...err},"err")
        })
    }

    const Images = () => {
        return (
            <div>
                 <div> {
                    SelectedImage.map((file, index) => {
                        return (
                            <ul>
                                <li><h1>{file}</h1></li>
                            </ul>
                        )
                    })
                }</div>
                <form>
                    <input type="file" class="form-control" multiple onChange={onChangeHandler} />
                    <button type="button" class="btn btn-success btn-block" onClick={onClickHandler}>Upload</button>
                </form>
            </div>
        )
    }


    const renderClaims = () => {

        switch (selectedClaim) {
            case 0: return Documents()
            case 1: return Images()
            case 2: return <input type="text" placeholder="Input link here" ></input>
        }
    }
    
    return (
        <div className="form-container">
            <div className="contact-form">
                <div className="header"> <span>Contact Us</span> </div>

                <div className="pading">


                    <div className="field">
                        <div class="control has-icons-left has-icons-right">
                            <label className="label left_align">Name</label>
                            <div className="control">
                                <input className="input" type="text" name="name" placeholder="Name (Optional)" value={data.name} onChange={handleChange} />
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
                                <input className="input" type="email" name="email" placeholder="Email (Mendatory)" value={data.email} onChange={handleChange} />
                                <p className='error-message-text'>{(Errors.email && Errors.email[0]) || ''}</p>
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
                                <input className="input" type="text" name="subject" placeholder="Subject (Optional)" value={data.subject} onChange={handleChange} />
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
                        <label className="label left_align">Options to Substantiate Claim (Mendatory)</label>
                    </div>

                    <div className="field">
                        <div className="control">
                            <div class="tabs  is-boxed">
                                <ul>
                                    {
                                        claims.map((claim, index) => {
                                            return (
                                                <li class={index === selectedClaim ? "is-active" : ""} key={index} onClick={() => setSelectedClaim(index)}>
                                                    <a>
                                                        <span>{claim}</span>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                    

                    
                    {
                        renderClaims()
                    }

                    </div>
                    </div>

                    <button className="button is-success" onClick={onSubmit} >Send</button>
                </div>
            </div>
        </div>
    )
}

export default connect(state => state)(ContactForm);


