import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from "react-responsive-modal";
import '../../styles/adminpanel.css'
import { resolve } from 'path';



const AdminModal = (caseNo, show) => {
    const styles = {
        fontFamily: "sans-serif",
        textAlign: "center"
    }
    const [open, setOpen] = useState(false)
    const [CaseNo, setCaseNo] = useState(caseNo.caseNo)
    const [contacts, setContacts] = useState({})
    const [message, setMessage] = useState('')


    let onOpenModal = () => {
        axios.post(`http://localhost:7777/getbycaseno`, {caseNo:CaseNo})
             .then(res => {
               setContacts(res.data[0])
            })
        setOpen(true)
    }

    let onCloseModal = () => {
        setOpen(false)
    }

    let sendMail = () =>{
        axios.post(`http://localhost:7777/sendmail`, {message:message, email:contacts.Email})
        .then(res => {
          console.log("res ==>", res)
       })
    }
   
    const handleMessageChange = e => {
        const { value } = e.target
        setMessage(value)
       }

    let Images = []
    if(contacts.Image){
      contacts.Image.map(item => {
        let itemArr = item.split('/')
        console.log(itemArr[1], "hjkhklh")
        Images.push(itemArr[1])
         })
      }

      let Documents = []
      if(contacts.Document){
        contacts.Document.map(item => {
          let itemArr = item.split('/')
          Documents.push(itemArr[1])
           })
        }
   
    

    return (
        
        <div style={styles}>
             {/* <button className="button is-success send-btn" onClick={onOpenModal}>View</button>  */}
            <Modal open={open} onClose={onCloseModal}>
                
                    <div className="pading">
                        <div className="field">
                            <div class="control has-icons-left has-icons-right">
                                <span className='uploaded-name'>
                                    <label className="label left_align name">Name:</label>
                                    <p>{contacts.Name}</p>
                                </span>
                            </div>

                            <div class="control has-icons-left has-icons-right">
                                <span className='uploaded-name'>
                                    <label className="label left_align name">Email:</label>
                                    <p>{contacts.Email}</p>
                                </span>
                            </div>

                            <div class="control has-icons-left has-icons-right">
                                <span className='uploaded-name'>
                                    <label className="label left_align name">Transaction Number:</label>
                                    <p>{contacts.Transaction_Number}</p>
                                </span>
                            </div>

                            <div class="control has-icons-left has-icons-right">
                                <span className='uploaded-name'>
                                    <label className="label left_align name">Subject:</label>
                                    <p>{contacts.Subject}</p>
                                </span>
                            </div>

                            <div class="control has-icons-left has-icons-right">
                                <span className='uploaded-name upload-msg '>
                                    <label className="label left_align name">Message:</label>
                                    <p className='show-msg '>{contacts.Message}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='uploaded-documents'>
                    <div class="control has-icons-left has-icons-right">
                        <span className='uploaded-name document'>
                            <label className="label left_align name">Uploaded Document:</label>
                            {
                                 Documents.map((document, index) => {
                                   let doc = 'http://18.219.191.74:7777:7777/'.concat(document)
                                  return (
                                    <a href={doc}>{document}</a>
      
                                  )
                              })
                            }
                        </span>
                    </div>

                    <div class="control has-icons-left has-icons-right">
                        <span className='uploaded-image'>
                            <label className="label left_align name">Uploaded Image:</label>
                            <div className='container image-container'>
                            <div className='row image-row'>
                            {
                                 Images.map((image, index) => {
                                   let imgsrc = 'http://localhost:7777/'.concat(image)
                                   console.log("imgsrc ==>", imgsrc)
                                  return (
                                        
                                            <div className='column-img'>
                                                <img src={imgsrc} className="uploaded-image-data columns" />
                                            </div>
                                      
                                   
                                  )
                              })
                            }
                             </div>
                             </div>
                        </span>
                    </div>

                    <div class="control has-icons-left has-icons-right">
                        <span className='uploaded-name'>
                            <label className="label left_align name">Uploaded Link</label>
                            <p>{contacts.Link}</p>
                        </span>
                    </div>
                    </div>
                    <div className="field">
                        <label className="label left_align reply-msg">Reply</label>
                        <div className="control">
                            <textarea className="textarea reply-msg" name="message" placeholder="Enter Message (Mandatory)" 
                             value={message.body} onChange={handleMessageChange} />
                            <button className="button is-success send-btn" onClick ={sendMail}>Send</button>
                        </div>
                    </div>
                </Modal>
        </div>
    );
}


export default AdminModal

