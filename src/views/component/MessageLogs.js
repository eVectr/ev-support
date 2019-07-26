import React, { useEffect, useState } from 'react'
import '../../styles/MessageLogs.css'
import classnames from 'classnames';
import axios from 'axios'
import { Container, Row, Col, Form, FormGroup, Label, Input, FormText, Button, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText } from 'reactstrap'
const MessageLogs = (props) => {
  const [activeTab, setActiveTab] = useState('1')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [userMessage, setUserMessage] = useState([])
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
    let SenderId = JSON.parse(localStorage.user)._id
    axios.post(`http://localhost:7777/usertousermessage`, { SenderId: SenderId, ReceiverName: name, Message: message })
      .then(res => {

      })
  }

  useEffect(() => {
    axios.post(`http://localhost:7777/getusertousermessage`, { ReceiverName: JSON.parse(localStorage.user).Name})
      .then(res => {
        console.log("user message ==>",res.data)
        if(res.data.ReceiverName != 'admin'){
          setUserMessage(res.data)
        }
      })
  }, [])


  console.log("userMessage ======  =>", userMessage)
  return (
    <Container>
      <Row>
        <Col md='9' className="message-main">
          <h1 className='heading'>Message Logs</h1>
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
                            <span className="reply-message"><i class="fas fa-reply"></i></span>
                            <span class="time">2019-07-25</span>
                            <p>{message.Message}</p>
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
