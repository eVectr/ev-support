import React, { useEffect, useState } from 'react'
import '../../styles/MessageLogs.css'
import axios from 'axios'
import { Container, Row, Col, Table, Form,CardBody,UncontrolledCollapse,FormGroup, Label, Input, FormText, Button, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText } from 'reactstrap'
import ModalUi from './ModalUi'
const MessageLogs = (props) => {
  const [activeTab, setActiveTab] = useState('1')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [userMessage, setUserMessage] = useState([])
  const [showReplyInput, setshowReplyInput] = useState(false)
  const [testIndex, setTestIndex] = useState('')
  const [sendStatus, setSendStatus] = useState(false)
  const [messageStatus, setMessageStatus] = useState(false)
  const [open, setOpen] = useState(false)
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
    setSendStatus(true)
    let SenderId = JSON.parse(localStorage.user)._id
    axios.post(`http://localhost:7777/usertousermessage`, { SenderId: SenderId, ReceiverName: name, Message: message })
      .then(res => {

      })
  }

  let closeModal = () => {
    setOpen(false)
  }
  let usersendMessage = (e) => {
    setMessageStatus(true)
  }
  useEffect(() => {
    axios.post(`http://localhost:7777/getusertousermessage`, { ReceiverName: JSON.parse(localStorage.user).Name })
      .then(res => {
        console.log("user message ==>", res.data)
        if (res.data.ReceiverName != 'admin') {
          setUserMessage(res.data)
        }
      })
  }, [])
  let showReply = (id) => {
    let findObj = userMessage.find(itm => itm.SenderId === id)
    if (findObj.SenderId === id) {
      setTestIndex(id)
      //setshowReplyInput(!showReplyInput) 
    }

  }
  return (
    <div>
      <Row className="message-mail">
        <h2>Message</h2>
        <Col md="2" className="left-sidebar">
        <Nav vertical>
          <NavItem>
            <ModalUi open = {open} closeModal={closeModal} className="sent-modal"></ModalUi>
        <Button className="message-btn" onClick={sendMessage}>Compose</Button>
               
          </NavItem>
        </Nav>
        <Nav vertical>
        <NavLink href="#" className="adminlink">
            <NavItem  id="toggler" style={{ marginBottom: '1rem' }}>
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
        <Col md="10">
        <Table striped className="message-box">
        <tbody>
          <tr>
            <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
            <td class="message-detail">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1</td>
            <td align="right">5mins ago</td>
            <td><i class="fas fa-reply"></i></td>
          </tr>
          <tr>
            <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
            <td class="message-detail">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1</td>
            <td align="right">5mins ago</td>
            <td><i class="fas fa-reply"></i></td>
          </tr>
          <tr>
            <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
            <td class="message-detail">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1</td>
            <td align="right">5mins ago</td>
            <td><i class="fas fa-reply"></i></td>
          </tr>
          <tr>
            <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
            <td class="message-detail">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1</td>
            <td align="right">5mins ago</td>
            <td><i class="fas fa-reply"></i></td>
          </tr>
          <tr>
            <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
            <td class="message-detail">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1</td>
            <td align="right">5mins ago</td>
            <td><i class="fas fa-reply"></i></td>
          </tr>
          <tr>
            <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
            <td class="message-detail">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1</td>
            <td align="right">5mins ago</td>
            <td><i class="fas fa-reply"></i></td>
          </tr>
          <tr>
            <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
            <td class="message-detail">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1</td>
            <td align="right">5mins ago</td>
            <td><i class="fas fa-reply"></i></td>
          </tr>
          <tr>
            <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
            <td class="message-detail">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1</td>
            <td align="right">5mins ago</td>
            <td><i class="fas fa-reply"></i></td>
          </tr>
          <tr>
            <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
            <td class="message-detail">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1</td>
            <td align="right">5mins ago</td>
            <td><i class="fas fa-reply"></i></td>
          </tr>
          <tr>
            <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
            <td class="message-detail">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1</td>
            <td align="right">5mins ago</td>
            <td><i class="fas fa-reply"></i></td>
          </tr>
        </tbody>
      </Table>
        </Col> 
      </Row>
    </div>
  )
}

export default MessageLogs
