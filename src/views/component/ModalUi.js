import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Modal from 'react-responsive-modal'
import { Button } from 'reactstrap'
import Select from 'react-select'
import '../../styles/MessageLogs.css'
import ImageUploader from './ImageUploader'
import Uploader from './EmailUploader'
const ModalUi = props => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState([])
  const [FileNames, setFileNames] = useState([])
  const [selectedUserName, setSelectedUserName] = useState('')
  const [ subject, setSubject] = useState('')
  const [ adminSubject, setAdminSubject] = useState('')
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
    console.log("local =>", localStorage)
    if(localStorage !== undefined){
     // axios.get(`http://localhost:7788/getalluser`)
      axios.get(`https://ev2.softuvo.xyz/getalluser`)
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            if(localStorage.length > 0){
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
                const updated = prev.concat({ value:res.data[i]._id, label:res.data[i].Name})
                return updated
              })
            }
          }
          }
        })
    }
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

  let userNameArray = []
  let userIdArray = []

  let onSelect = (e) => {
    if(e){
      for(let i = 0; i< e.length ; i++){
        userIdArray.push(e[i].value)
        userNameArray.push(e[i].label)
        setSelectedUserId(userIdArray)
        setSelectedUserName(userNameArray)
       // console.log('selecte value ==>', e[i].label)
      }
    }
  }

  let composeMessage = () => {
    if (Message == '' || selectedUserId == '') {
      setTimeout(() => {
        setErrors(false)
        setErrors('')
    }, 1000)
      setErrors('Please select required fields')
    } else {
      changeUserStatue().then(res => {
        setTimeout(() => {
          setSuccessModal(false)
          props.closeModal()
         
      }, 1000)
      setSelectedUserId('')
      })
      let formData = new FormData()
      for (let i = 0; i < FileNames.length; i++) {
        formData.append('SelectedImage', FileNames[i])
      }
     // axios.post(`http://localhost:7788/fileupload`, formData,
       axios.post(`https://ev2.softuvo.xyz/fileupload`, formData,
       ).then(res => {
        setFileNames([])
        //axios.post(`http://localhost:7788/usertousermessage`, {
        axios.post(`https://ev2.softuvo.xyz/usertousermessage`, {
        SenderId: JSON.parse(localStorage.user)._id,
        SenderName: JSON.parse(localStorage.user).Name,
        ReceiverId: selectedUserId,
        ReceiverName: selectedUserName,
        Message: Message,
        Subject:subject
      })
        .then(res => {
          props.handleSentMessage()
          setUsermessagesend(true)
          setMessage('')
          setSelectedUserId([])
        })
      })
    }
  }

  let changeStatue = () =>{
    return new Promise((resolve, reject) => {
      resolve(setAdminSuccessModal(!showAdminSuccessModal))
    })
  }
  let onSubChange = (e) =>{
    setSubject(e.target.value)
  }

  let changeUserStatue = () =>{
    return new Promise((resolve, reject)=>{
      resolve(setSuccessModal(!showSuccessModal))
    })
  }

  let onAdminSubjectChange = (e) =>{
    setAdminSubject(e.target.value)
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
      let formData = new FormData()
      for (let i = 0; i < FileNames.length; i++) {
        formData.append('SelectedImage', FileNames[i])
      }
       //axios.post(`http://localhost:7788/fileupload`, formData,
       axios.post(`https://ev2.softuvo.xyz/fileupload`, formData,
       ).then(res => {
         axios.post(`https://ev2.softuvo.xyz/admintousermessage`, { ReceiverId: userIds,
        //axios.post(`http://localhost:7788/admintousermessage`, { ReceiverId: userIds,
        Subject:adminSubject,
         Message: AdminMessage,
          isUrgent:isChecked })
         .then(res => {
           console.log('res ==>', res)
           if (props.closeModal) {
             props.closeModal()
           } else {
             setIsOpen(false)
           }
           setAdminMessage('')
         })
         setFileNames([])
        })
  }
}

const onDrop = (files) => {
    if (!files.length) {
      return
    }

    if (files.length > 1) {
      setFileNames(files)
      // let formData = new FormData()
      // for (let i = 0; i < files.length; i++) {
      //   formData.append('SelectedImage', files[i])
      // }
      //   axios.post(`http://localhost:7788/fileupload`, formData,
      // // axios.post(`http://3.83.23.220:7788/fileupload`, formData,
      //  ).then(res => { })

    } else {
      //let formData = new FormData()
      // formData.append('SelectedImage', files[0])
      //  axios.post(`http://localhost:7788/fileupload`, formData,
      // // axios.post(`http://3.83.23.220:7788/fileupload`, formData,
      //  ).then(res => { })
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
        <div className='sent-modal compose-message'>
          <h2>New Message</h2>
          <div className='modal-inner'>
          <div className="send-user-details-inner">
            <label>To:</label> <Select isMulti options={options} onChange={(e) => onSelect(e)} className="admin-input"/>
            </div>
            <div className="send-user-details-inner">
            <label>Subject:</label><input type = "text" className="subject-describe" onChange ={(e) => onSubChange(e)}></input>
            </div>
            
            <textarea placeholder='write a message .....' onChange = {(e) => onMessage(e)} ></textarea>
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
            <Button className='message-btn' onClick={composeMessage}>Send</Button>
            {!showSuccessModal ?
            <p className="error-msg">{Errors != ''? Errors: ''}</p>
            :''
            }
          </div>
        </div>:
          <Fragment>{showSuccessModal?
             <div className='sent-modal'>
             <h2>Send Successfuly</h2>
             <div className='modal-inner'>
                <h3 className="succes-msg"><i class="far fa-check-circle"></i></h3>
                <p className="succes-text">Send Message Successfully</p>
             </div>
           </div>:<Fragment>{showAdminSuccessModal? 
             <div className='sent-modal'>
             <h2>Send Successfuly</h2>
             <div className='modal-inner'>
                <h3 className="succes-msg"><i class="far fa-check-circle"></i></h3>
                <p className="succes-text">Send Message Successfully</p>
             </div>
           </div>:
              <div className='sent-modal'>
              <h2>Send Message</h2>
              <div className='modal-inner'>
                <div className="send-user-details-inner">
                    <span>To :</span> 
                    <span className="admin-input"> All Users</span>
                </div>
                <div className='send-user-details-inner'>
                    <span>Subject :</span> 
                    <input type = 'text' className="subject-describe" onChange={(e) =>onAdminSubjectChange(e)}></input>
                </div>
              <div className="check-label">
                  <input type="checkbox" className="checkbox" onChange ={handleChecked}></input>
                  <label>Mark as  Urgent</label>
              </div>
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
