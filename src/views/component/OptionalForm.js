import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import is from 'is_js'
import '../../styles/login.css'
import Validation from '../../utils/Validation'
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
    const [Errors, setErrors] = useState('')
    const[linkData, setlinkData] = useState('')
    const[showLinks, setShowLinks] = useState([])
    const[disable, setdisable] = useState(true)

   
   
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

    setFileNames(prev => {
        const update = prev.concat(files[0].name)
        return update
    })
    }

    const onSubmit = () => {

        const errors = Validation(data)
        console.log(errors)
        if (!is.empty(errors)) {
            
            setErrors(errors)
            return
        }

    
        alert('hello')
     

        // axios.post(`http://localhost:7777/savecontact`, { user_Id: user_Id, Name: Name, Reason: data.reason, Message: data.message, date: Date.now() })
        //     .then(res => {
        //         console.log("saved response =>", res)
        //     })
    }

    const claims = ["Documents", "Images", "Links"]




    let deleteFile = (file) => {
        let files =  FileNames.filter((filename, index) => {
        return filename !== file
    })
        setFileNames(files)
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
    //    if( linkData.length){
    //     setdisable(false)
    //    }
    //    else{
    //     setdisable(true)
    //    }
    
    }


    const Documents = () => {
        return (
            <div>
                <div> {
                    FileNames.map((file, index) => {
                        return (
                            <ul>
                                <li className='uploding-file'><h1 className ='file-name'>{file}</h1><i className="fas fa-times" onClick={()=> deleteFile(file)}></i></li>
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
                                    <span className='file-label '>
                                        Add Files
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
                                <li className='uploding-file'><h1 className='file-name'>{file} </h1><i class="fas fa-times" onClick={()=> deleteFile(file)}></i></li>
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
                                    <span className='file-label link-btn '>
                                        Add files
                                 </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </Uploader>

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
            // case 2: return <input type="text" name='textdata' placeholder="Input link here" onChange={ e => setlinkData(e.target.value) }></input>
            case 2: return Link ()
        }
    }
    
    return (
        <div className="form-container">
            <div className="contact-form">
                <div className="header"> <span>Contact Us</span> </div>

                <div className="pading">

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
                    <button class="button is-success" onClick={onSubmit} >Send</button>
                </div>
            </div>
        </div>
    )
}

export default connect(state => state)(ContactForm);


