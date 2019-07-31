import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Modal from 'react-responsive-modal'
import { Button } from 'reactstrap'
import Select from 'react-select'
import '../../styles/MessageLogs.css'
import { isCallExpression } from '@babel/types';
const ModalUi = props => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')
  const [Message, setMessage] = useState('')
  const [AdminMessage, setAdminMessage] = useState('')
  const [options, setOptions] = useState([])
  const [userIds, setUserIds] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [usermessagesend, setUsermessagesend] = useState(false)
  const [adminmessagesend, setAdminmessagesend] = useState(false)
  const [showSuccessModal, setSuccessModal] = useState(false)
  const [showAdminSuccessModal, setAdminSuccessModal] = useState(false)
  
  const [MessageSend, setMessageSend] = useState('')
  const [Errors, setErrors] = useState('')
  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }
  useEffect(() => {
    axios.get(`http://localhost:7777/getalluser`)
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Name === 'Admin' || res.data[i].Name === JSON.parse(localStorage.user).Name) {
          
          } else {
            setUserIds(prev => {
              const updated = prev.concat(res.data[i]._id)
              return updated
            })
            setOptions(prev => {
              const updated = prev.concat({ value:res.data[i]._id, label:res.data[i].Name})
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
    setSelectedUser(e.value)
  }


  let composeMessage = () => {
    if (Message == '' || selectedUser == '') {
      setErrors('Please select required fields')
    } else {
      changeUserStatue().then(res =>{
        setTimeout(() => {
          setSuccessModal(false)
       }, 1000)
      })
      axios.post(`http://localhost:7777/usertousermessage`, {
        SenderId: JSON.parse(localStorage.user)._id,
        SenderName: JSON.parse(localStorage.user).Name,
        ReceiverId: selectedUser,
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
    return new Promise((resolve, reject)=>{
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
      setErrors('Please select required fields')
    } else {
      changeStatue().then(res =>{
        setTimeout(() => {
          setAdminSuccessModal(false)
       }, 1000)
      })
    axios.post(`http://localhost:7777/admintousermessage`, { ReceiverId: userIds,
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
              <label>To:</label> <input value="All Users" className="admin-input" ></input>
              <div className="check-label">
                  <input type="checkbox" className="checkbox" onChange ={handleChecked}></input>
                  <label>Mark as a Urgent</label>
              </div>
              <textarea placeholder='write a message .....' onChange = {(e) => onAdminMessage(e)} className="admin-area"></textarea>
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
