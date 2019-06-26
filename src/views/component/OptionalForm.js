import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import is from 'is_js'
import '../../styles/login.css'
import Validation from '../../utils/Validation'
import contactValidation from '../../utils/contactValidation'
import ImageUploader from './ImageUploader'
import Uploader from './Uploader'


const ContactForm = (props) => {

    const [data, setData] = useState({
        transaction_number: '',
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const [selectedClaim, setSelectedClaim] = useState(0)
    const [FileNames, setFileNames] = useState([])
    const [SelectedImage, setSelectedImage] = useState([])
    const [Errors, setErrors] = useState('')
    const [linkData, setlinkData] = useState('')
    const [showLinks, setShowLinks] = useState([])
    const [message, setmessage] = useState('')
    const [loading, setloading] = useState(false)


   
   
    const handleChange = e => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value,
        })
    }

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
        } else {
            setSelectedImage(prev => {
                const update = prev.concat(files[0])
                return update
            })
        }
    }

    let generateCaseNo = () => {

        return new Promise((resolve, reject) => {
            let date = new Date
            let sec = date.getSeconds() + 1
            console.log(sec)
            let caseNo = 'SS'.concat((Math.random() * 10000000000).toFixed()).concat('CONTACT')
            resolve(caseNo)
        })
    }

    const claims = ["Documents", "Images", "Links"]

    let deleteFile = (file) => {
        let files = FileNames.filter((filename, index) => {
            console.log(filename, 'filename')
            return filename.name !== file
        })
        setFileNames(files)
    }

    let deleteImage = (image) => {
        let images =  SelectedImage.filter((imagename, index) => {
        return imagename.name!== image
    })
       setSelectedImage(images)
    }

    let deleteLink = (clickedLink) => {
       let links = showLinks.filter((link, index) => {
            return link !== clickedLink
       }) 
       setShowLinks(links)
    }



    let showLinkData = () => {
       let links = showLinks
       links = [
           ...showLinks,
           linkData
       ]
       setShowLinks(links)
    }

    const Documents = () => {
        return (
            <div>
                <div> {
                    FileNames.map((file, index) => {
                        return (
                            <ul>
                                <li className='uploding-file'><h1 className='file-name'>{file.name} </h1><i class="fas fa-times" onClick={()=> deleteFile (file.name)} ></i></li>
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
                                        Add
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
                    SelectedImage.map((image, index) => {
                        return (
                            <ul>
                                <li className='uploding-file'><h1 className='file-name'>{image.name} </h1><i class="fas fa-times" onClick={()=> deleteImage(image.name)}></i></li>
                            </ul>
                        )
                    })
                }</div>
                <ImageUploader onDrop={onDropImage}>
                    <div className='field'>
                        <div className='file is-small'>
                            <label className='file-label'>
                                <span className={`file-cta font-1rem `}>
                                    <span className='file-icon'>
                                        <i className='fas fa-upload'></i>
                                    </span>
                                    <span className='file-label '>
                                        Add 
                                 </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </ImageUploader>

            </div>
        )
    }

    const Link = () => {
        return (
            <div>
                {                    
                     showLinks.map((link, index) => {
                         return <li key={index} className='link-list'>{link}<i class="fas fa-times" onClick={() => deleteLink(link)}></i></li>
                     }) 
                }
                <input type="text" className='link-data' name='textdata' placeholder="Input link here" onChange={ e => setlinkData(e.target.value) }/>
                <button className='link-btn'  onClick= {()=> showLinkData()}>Add</button> 
            </div>         
        )
    }


    const renderClaims = () => {

        switch (selectedClaim) {
            case 0: return Documents()
            case 1: return Images()
            case 2: return Link ()
        }
    }


    // const onSubmit = () => {



    //     const errors = Validation(data)
    //     console.log(errors, 'Errors')
    //      if (!is.empty(errors)) {
    //         setErrors(errors)
    //         return
           
    //     }

console.log(message, 'message')
    // -----------------------------------ERRORS------------------------- //

    const onSubmit = () => {

        if(props.match.path == '/contact/3'){
            const errors = Validation(data)
            console.log(errors, 'Errors')
         if (!is.empty(errors)) {
            setErrors(errors)
            return
        }



        else{
            const errors = contactValidation(data)
            console.log(errors, 'Errors')
         if (!is.empty(errors)) {
            setmessage(errors)
            return
        }

        }

        }


    
        

    // -----------------------------------ERRORS------------------------- //

   
        

    
        if(selectedClaim == 0){
            generateCaseNo().then(no => {
                let Transaction_Number = data.transaction_number
                let Name = data.name
                let Email = data.email
                let Subject = data.subject
                let Message = data.message
                let Case_No = no
                let Link = []
                let formData = new FormData()
                for (let i = 0; i < FileNames.length; i++) {
                    formData.append('SelectedImage', FileNames[i])
                }
                axios.post(`http://localhost:7777/fileupload`, formData,
                ).then(res => {
                    console.log("response =>", res)
                    axios.post(`http://localhost:7777/saveContact`, { Transaction_Number, Name, Email, Subject, Message, Case_No, Link })
                        .then(res => {
                            console.log(res)
                        })
                })
            })
        }
        else if(selectedClaim == 1){
            generateCaseNo().then(no => {
                let Transaction_Number = data.transaction_number
                let Name = data.name
                let Email = data.email
                let Subject = data.subject
                let Message = data.message
                let Case_No = no
                let Link = []
                let formData = new FormData()
                for (let i = 0; i < SelectedImage.length; i++) {
                    formData.append('SelectedImage', SelectedImage[i])
                }
                axios.post(`http://localhost:7777/upload`, formData,
                ).then(res => {
                    console.log("res =>", res)
                    axios.post(`http://localhost:7777/saveContact`, { Transaction_Number, Name, Email, Subject, Message, Case_No, Link })
                        .then(res => {
                            console.log(res)
                        })
                })
            })
        }
        else{
            generateCaseNo().then(no => {
                let Transaction_Number = data.transaction_number
                let Name = data.name
                let Email = data.email
                let Subject = data.subject
                let Message = data.message
                let Case_No = no
                let formData = new FormData()
                for (let i = 0; i < SelectedImage.length; i++) {
                    formData.append('SelectedImage', SelectedImage[i])
                }
                axios.post(`http://localhost:7777/saveContact`, { Transaction_Number, Name, Email, Subject, Message, Case_No, Link:showLinks })
                    .then(res => {
                        console.log(res)
                    })
            })
        }
    
    }

    return (
        <div className="form-container">
            <div className="contact-form">
                <div className="header"> <span>Contact Us</span> </div>
                <div className="pading">

                    {props.match.path == '/contact/3'?
                        <div className="field">
                            <div class="control has-icons-left has-icons-right">
                                <label className="label left_align">Transaction Number</label>
                                <div className="control">
                                    <input className="input contact-input" type="text" name="transaction_number" placeholder="Input Transaction Number (Mandatory)" value={data.transaction_number} onChange={handleChange} />
                                    <p className='error-message-text'>{(Errors.transaction_number && Errors.transaction_number[0]) || ''}</p>
                                    <span class="icon is-medium is-left icn">
                                        <i class="fas fa-id-card icn1 " ></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        :''
                    }

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
                                <p className='error-message-text'>{(message.email && message. email[0]) || ''}</p>
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
                            <p className='error-message-text'>{(message.message && message. message[0]) || ''}</p>
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
                    {loading ? <img src={require('../../images/loader.gif')} className="loading"/>: null}
                    <button class="button is-success" onClick={onSubmit} >Send</button>
                </div>
            </div>
       
        </div>
    )
}

export default connect(state => state)(ContactForm);


