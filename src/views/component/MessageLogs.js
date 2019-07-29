import React, { useEffect, useState } from 'react'
import '../../styles/MessageLogs.css'
import axios from 'axios'
import { Container, Row, Col, Form, FormGroup, Label, Input, FormText, Button, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText } from 'reactstrap'
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
    <Container>
      <Row>
        <ModalUi open = {open} closeModal={closeModal} ></ModalUi>
        <h1 className='heading msghead'>Message Logs</h1>
        <Col md='9' className="message-main">
          <div className="message-inner">
            <Form>
              <Row form>
                <FormGroup className="mb-4 mr-sm-3 mb-sm-0">
                  <Input type="text" name="text" placeholder="Input Name" onChange={(e) => onName(e)} />
                </FormGroup>
                <FormGroup className="mb-4 mr-sm-3 mb-sm-0">
                  <Input type="text" name="text" placeholder="Input message" onChange={(e) => onMessage(e)} />
                </FormGroup>
                <Button className="message-btn" onClick={sendMessage}>Send SMS</Button>
                {sendStatus ? <p>Send SuccesFully</p> : ''}
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      <Row>
        <Nav tabs>
          <NavItem>
            <NavLink
              onClick={() => setactive('1')}
              className={`${activeTab == '1' ? 'nav-link active' : 'nav-link notactive'}`}>
              Admin Message
             </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => setactive('2')}
              className={`${activeTab == '1' ? 'nav-link notactive' : 'nav-link active'}`}
            >
              User Message
                </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          {activeTab == '1' ?
            <TabPane tabId="1">
              <Row>
                <Col sm="12">

                  <Card body className="innercard">
                    <div class="user-info">
                      <span class="name">Admin</span>
                      <span class="time">2019-07-25</span>
                      <p>Helo</p>
                      <span class="name">Admin</span>
                      <span class="time">2019-07-24</span>
                      <p>This is admin Message </p>
                      <span class="name">Admin</span>
                      <span class="time">2019-07-22</span>
                      <p>this is also admin message</p>

                    </div>

                  </Card>
                </Col>

              </Row>
            </TabPane> :
            <TabPane tabId="2" className="user">
              <Row>
                <Col sm="12">
                  <Card body>
                    {userMessage.map((message, index) => {
                      return (
                        <div class="user-info">
                          <div><span class="name">{message.SenderId}</span>
                            <span className="reply-message" onClick={() => showReply(message.SenderId)}><i class="fas fa-reply"></i></span>
                            <span class="time">2019-07-25</span>
                            <p>{message.Message}</p>
                            {
                              message.SenderId == testIndex ?
                                <div className="msgtextarea">
                                  <input type='text' placeholder='Input Message' className="send-input"></input>
                                  <Button className="sendmessage-btn sender" onClick={usersendMessage}>Send</Button>
                                  {messageStatus ? <p>Send SuccesFully</p> : ''}
                                </div>
                                : ''
                              // <div>
                              //   <input>text</input> <Button className="sendmessage-btn innersend">Send</Button>
                              // </div> : ''
                            }

                          </div>
                        </div>
                      )
                    })}
                  </Card>
                </Col>
              </Row>
            </TabPane>
          }
        </TabContent>
      </Row>
    </Container>
  )
}

export default MessageLogs
