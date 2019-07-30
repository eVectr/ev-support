import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-responsive-modal'
import { Button } from 'reactstrap'
import Select from 'react-select'
import '../../styles/MessageLogs.css'
const ModalUi = props => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')
  const [Message, setMessage] = useState('')
  const [options, setOptions] = useState([])

  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }
  useEffect(() => {
    axios.get(`http://localhost:7777/getalluser`)
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Name === 'Admin' || res.data[i].Name === JSON.parse(localStorage.user).Name) {
            console.log('')
          } else {
            setOptions(prev => {
              const updated = prev.concat({ value:res.data[i].Name, label:res.data[i].Name})
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

  let onMessage = (e) => {
    setMessage(e.target.value)
  }
  let onSelect = (e) => {
    setSelectedUser(e.value)
  }

  let composeMessage = () => {
    axios.post(`http://localhost:7777/usertousermessage`, { SenderName: JSON.parse(localStorage.user).Name,
      ReceiverName: selectedUser,
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
  console.log('type == >', props.type)

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
             <h2>Admin Test</h2>
             <div className='modal-inner'>
               <label>To:</label> <input value="All Users" className="admin-input"></input>
              <div className="check-label">
                  <input type="checkbox" className="checkbox"></input>
                  <label>Mark as a User</label>
              </div>
               <textarea placeholder='write a message .....' onChange = {(e) => onMessage(e)} className="admin-area"></textarea>
               <Button className='message-btn' onClick={composeMessage}>Send</Button>
             </div>
           </div>
        }
      </Modal>
    </div>

  )
}
export default ModalUi
