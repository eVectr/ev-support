import React, { useState, useEffect } from 'react'
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
    axios.post(`http://localhost:7777/usertousermessage`, { SenderId: JSON.parse(localStorage.user)._id,
      SenderName: JSON.parse(localStorage.user).Name,
      ReceiverId: selectedUser,
      Message: Message })
      .then(res => {
        console.log('res ==>', res)
        if (props.closeModal) {
          props.closeModal()
        } else {
          setIsOpen(false)
        }
        setMessage('')
      })
  }

  let sendAdminMessage = () => {
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
  
  return (
    <div style={styles} >
      {/* <h2>react-responsive-modal</h2> */}
      <Modal open={props.open || isOpen} onClose={onCloseModal} classNames={'sent-modal'} center >
        { props.type == 'user' ?
        <div className='sent-modal'>
          <h2>New Message</h2>
          <div className='modal-inner'>
            <label>To:</label> <Select options={options} onChange={(e) => onSelect(e)} />
            <textarea placeholder='write a message .....' onChange = {(e) => onMessage(e)} ></textarea>
            <Button className='message-btn' onClick={composeMessage}>Send</Button>
          </div>
        </div>:
           <div className='sent-modal'>
             <h2>Send Message</h2>
             <div className='modal-inner'>
               <label>To:</label> <input value="All Users" className="admin-input"></input>
              <div className="check-label">
                  <input type="checkbox" className="checkbox" onChange ={handleChecked}></input>
                  <label>Mark as a Urgent</label>
              </div>
               <textarea placeholder='write a message .....' onChange = {(e) => onAdminMessage(e)} className="admin-area"></textarea>
               <Button className='message-btn' onClick={sendAdminMessage}>Send</Button>
             </div>
           </div>
        }
      </Modal>
    </div>

  )
}
export default ModalUi
