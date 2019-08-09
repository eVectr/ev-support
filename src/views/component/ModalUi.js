import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Modal from 'react-responsive-modal'
import { Button } from 'reactstrap'
import Select from 'react-select'
import '../../styles/MessageLogs.css'
import ImageUploader from './ImageUploader'
import Uploader from './Uploader'
const ModalUi = props => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState('')
  const [FileNames, setFileNames] = useState([])
  const [selectedUserName, setSelectedUserName] = useState('')
  const [Message, setMessage] = useState('')
  const [AdminMessage, setAdminMessage] = useState('')
  const [options, setOptions] = useState([])
  const [userIds, setUserIds] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [usermessagesend, setUsermessagesend] = useState(false)
  const [adminmessagesend, setAdminmessagesend] = useState(false)
  const [showSuccessModal, setSuccessModal] = useState(false)
  const [showAdminSuccessModal, setAdminSuccessModal] = useState(false)
  const [selectDocument, setselectDocument] = useState('')
  
  const [MessageSend, setMessageSend] = useState('')
  const [Errors, setErrors] = useState('')
  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }
  useEffect(() => {
    //axios.get(`http://localhost:7777/getalluser`)
    axios.get(`http://3.83.23.220:7788/getalluser`)
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Name === 'Admin' || res.data[i].Name === JSON.parse(localStorage.user).Name) {
          
          } else {
            setUserIds(prev => {
              const updated = prev.concat(res.data[i]._id)
              return updated
            })
            let data = {
              Id: res.data[i]._id,
              Name: res.data[i].Name
            }
            setOptions(prev => {
              const updated = prev.concat({ value:data, label:res.data[i].Name})
              return updated
            })
          }
        }
      })
  }, [])

  let onCloseModal = () => {
    if (props.closeModal) {
      props.closeModal()
    } else {
      setIsOpen(false)
    }
  }
  let handleChecked = () =>{
    setIsChecked(!isChecked)
  }

  let onMessage = (e) => {
    setMessage(e.target.value)
  }
  
  let onAdminMessage = (e) =>{
    setAdminMessage(e.target.value)
  }

  let onSelect = (e) => {
    console.log('selecte value ==>', e.value)
    setSelectedUserId(e.value.Id)
    
  }
  let composeMessage = () => {
    if (Message == '' || selectedUserId === '') {
      setTimeout(() => {
        setErrors(false)
        setErrors('')
    }, 1000)
      setErrors('Please select required fields')
    } else {
      changeUserStatue().then(res => {
        setTimeout(() => {
          setSuccessModal(false)
         
      }, 1000)
      setSelectedUserId('')
      })
      //axios.post(`http://localhost:7777/usertousermessage`, {
        axios.post(`http://3.83.23.220:7788/usertousermessage`, {
        SenderId: JSON.parse(localStorage.user)._id,
        SenderName: JSON.parse(localStorage.user).Name,
        ReceiverId: selectedUserId,
        ReceiverName: selectedUserName,
        Message: Message
      })
        .then(res => {
          setUsermessagesend(true)
          console.log('res ==>', res)
          setMessage('')
        })
    }
  }

  let changeStatue = () =>{
    return new Promise((resolve, reject) => {
      resolve(setAdminSuccessModal(!showAdminSuccessModal))
    })
  }
  let changeUserStatue = () =>{
    return new Promise((resolve, reject)=>{
      resolve(setSuccessModal(!showSuccessModal))
    })
  }
 

  let sendAdminMessage = () => {
    if (AdminMessage == '') {
      setTimeout(() => {
        setErrors(false)
        setErrors('')
    }, 1000)
      setErrors('Please select required fields')
    } else {
      changeStatue().then(res =>{
        setTimeout(() => {
          setAdminSuccessModal(false)
       }, 1000)
      })
    // axios.post(`http://localhost:7777/admintousermessage`, { ReceiverId: userIds,
    //   Urgegent: isChecked,
    //   Message: AdminMessage })
      axios.post(`http://3.83.23.220:7788/admintousermessage`, { ReceiverId: userIds,
      Urgegent: isChecked,
      Message: AdminMessage })
      .then(res => {
        console.log('res ==>', res)
        if (props.closeModal) {
          props.closeModal()
        } else {
          setIsOpen(false)
        }
        setAdminMessage('')
      })
  }
}

const onDrop = (files) => {
    if (!files.length) {
      return
    }

    if (files.length > 1) {
      setFileNames(files)
      let formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append('SelectedImage', files[i])
      }

    } else {
      let formData = new FormData()
      formData.append('SelectedImage', files[0])
      setFileNames(prev => {
        const update = prev.concat(files[0])
        return update
      })
    }
  }
  let deleteFile = (file) => {
    let files = FileNames.filter((filename, index) => {
      console.log(filename, 'filename')
      return filename.name !== file
    })
    setFileNames(files)
  }
  return (
    <div style={styles} >
      {/* <h2>react-responsive-modal</h2> */}
      <Modal open={props.open || isOpen} onClose={onCloseModal} classNames={'sent-modal'} center >
        { props.type == 'user' && !showSuccessModal ?
        <div className='sent-modal'>
          <h2>New Message</h2>
          <div className='modal-inner'>
            <label>To:</label> <Select options={options} onChange={(e) => onSelect(e)} />
            <textarea placeholder='write a message .....' onChange = {(e) => onMessage(e)} ></textarea>
            <Button className='message-btn' onClick={composeMessage}>Send</Button>
            {!showSuccessModal ?
            <p className="error-msg">{Errors != ''? Errors: ''}</p>
            :''
            }
          </div>
        </div>:
          <Fragment>{showSuccessModal?
             <div className='sent-modal'>
             <h2>Send Succesfuly</h2>
             <div className='modal-inner'>
                <h3 className="succes-msg"><i class="far fa-check-circle"></i></h3>
                <p className="succes-text">Send Message Succesfully</p>
             </div>
           </div>:<Fragment>{showAdminSuccessModal? 
             <div className='sent-modal'>
             <h2>Send Succesfuly</h2>
             <div className='modal-inner'>
                <h3 className="succes-msg"><i class="far fa-check-circle"></i></h3>
                <p className="succes-text">Send Message Succesfully</p>
             </div>
           </div>:
              <div className='sent-modal'>
              <h2>Send Message</h2>
              <div className='modal-inner'>
                <div className="send-user-details-inner">
                    <span>To :</span> 
                    <input value="All Users" className="admin-input"></input>
                </div>
                <div className='send-user-details-inner'>
                    <span>Subject :</span> 
                    <input type = 'text' className="subject-describe"></input>
                </div>
              {/* <div className="check-label">
                  <input type="checkbox" className="checkbox" onChange ={handleChecked}></input>
                  <label>Mark as a Urgent</label>
              </div> */}
              <textarea placeholder='write a message .....' onChange = {(e) => onAdminMessage(e)} className="admin-area"></textarea>
              <div> {
                    FileNames.map((file, index) => {
                        return (
                            <ul>
                                <li className='uploding-file'><h1 className='file-name'>{file.name} </h1><i class="fas fa-times" onClick={()=> deleteFile(file.name)} ></i></li>
                            </ul>
                        )
                    })
                }</div>
              <Uploader onDrop={onDrop}>
                    <Fragment>
                        <button><i class="fa fa-paperclip" aria-hidden="true"></i></button>
                        <p className="show-document-msg"></p>
                        
                    </Fragment>
                </Uploader>
                <Button className='message-btn' onClick={sendAdminMessage}>Send</Button>
                {!showSuccessModal ?
                <p className="error-msg">{Errors != ''? Errors: ''}</p>
                :''
                }
              </div>
            </div>}</Fragment>
            
          }
           </Fragment>
        
        }
      </Modal>
    </div>
  )
}
export default ModalUi
