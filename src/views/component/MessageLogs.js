import React, { useEffect, useState } from 'react'
import '../../styles/MessageLogs.css'
import MessageDetails from './MessageDetails'
import axios from 'axios'
import TimeAgo from 'timeago-react';
import timeago from 'timeago.js';
import { Container, Row, Col, Table, Form,CardBody,UncontrolledCollapse,FormGroup, Label, Input, FormText, Button, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText } from 'reactstrap'
import ModalUi from './ModalUi'

const MessageLogs = (props) => {
  const [activeTab, setActiveTab] = useState('1')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [userMessage, setUserMessage] = useState([])
  const [testIndex, setTestIndex] = useState('')
  const [sendStatus, setSendStatus] = useState(false)
  const [messageStatus, setMessageStatus] = useState(false)
  const [open, setOpen] = useState(false)
  const [showMessageDetails, setShowMessageDetails] = useState(false)
  const [showReplyInput, setshowReplyInput] = useState(false)
  let setactive = (parameter) => {
    if (parameter == 1) {
      setActiveTab('1')
    } else if (parameter == 2) {
      setActiveTab('2')
    }
  }
  let onName = (e) => {
    setName(e.target.value)
  }
  let onMessage = (e) => {
    setMessage(e.target.value)
  }
  let sendMessage = () => {

    setOpen(true)
  }

  let closeModal = () => {
    setOpen(false)
  }
  let usersendMessage = (e) => {
    setMessageStatus(true)
  }
  useEffect(() => {
    axios.post(`http://localhost:7777/getusertousermessage`, { ReceiverId: JSON.parse(localStorage.user)._id })
      .then(res => {
        setUserMessage(prev => {
          const updated = prev.concat(res.data.reverse())
          return updated
        })
      })
  }, [])
  let showReply = (id) => {
    setShowMessageDetails(!showMessageDetails)
  }
  console.log('user message ====>', userMessage)
  return (
    <div>
      <Row className="message-mail">
        <h2>Message</h2>
        {showMessageDetails?<h2 className="backtopage" onClick={() => showReply()}><i class="fas fa-arrow-left"></i><span>Back to page</span></h2>:''}
        <Col md="2" className="left-sidebar">
        <Nav vertical>
          <NavItem>
            <ModalUi type = {'user'} open = {open} closeModal={closeModal} className="sent-modal"></ModalUi>
              <Button className="message-btn" onClick={sendMessage}>Compose</Button> 
          </NavItem>
        </Nav>
        <Nav vertical>
        <NavLink href="#" className="adminlink">
            <NavItem  id="toggler" className="active" style={{ marginBottom: '1rem' }}>
            <i class="fa fa-user-circle" aria-hidden="true"></i>Admin Message 
            </NavItem>
            <NavItem  id="toggler" style={{ marginBottom: '1rem' }}>
            <i class="fa fa-users" aria-hidden="true"></i>Users Message 
            </NavItem>
            <NavItem  id="toggler" style={{ marginBottom: '1rem' }}>
              <i class="fa fa-paper-plane" aria-hidden="true"></i>Sent 
            </NavItem>
            </NavLink>
        </Nav>
      </Col>  
       
      { !showMessageDetails?   
        <Col md="10">
        <Table striped className="message-box">
        <tbody>
                {userMessage.map((message, index) => {

                  let time = Date.now() - message.Date
                  console.log('date ==>', time)

                  return( <tr onClick={() => showReply('test')}>
                  <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
                  <td className="name-table">{message.SenderName}</td>
                    <td class="message-detail">{message.Message}</td>
                    <td align="right" className="time-list">{<TimeAgo
                      datetime={message.Date}
                      locale='IST' />}</td>
                    <td><i class="fas fa-envelope"></i></td>
                </tr>
              )

                })
                }
        </tbody>
      </Table>
        </Col> 
        :
        <div>
          <MessageDetails/> 
        </div>
        
      }
      </Row>
    </div>
  )
}

export default MessageLogs
