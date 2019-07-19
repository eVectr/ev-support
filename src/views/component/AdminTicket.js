import React, { useState, useEffect, Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import axios from 'axios'
import '../../styles/adminticket.css'

const AdminTicket = (props) => {
  const [messageLogs, setMessageLogs] = useState([])
  const [contacts, setContacts] = useState([])
  const [reply, setReply] = useState('')

  useEffect(() => {
    axios.post(`http://localhost:7777/messagelogs`, { ID: props.match.params.id })
      .then(res => {
        setMessageLogs(res.data.reverse())
      })
    axios.post(`http://localhost:7777/getcontactbycaseno`, { ID: props.match.params.id })
      .then(res => {
        setContacts(res.data)
      })
  }, [reply])

  let sendemail = () => {
    axios.post(`http://localhost:7777/adminreply`, { ID: props.match.params.id, Message: reply })
      .then(res => {
        setContacts(res.data)
        setReply('')
      })
  }

  let onMessageChange = (e) => {
    setReply(e.target.value)
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className='heading'>
            <h1>User Info</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>

          <div className='admin-user-info'>
            <p>AKASH VERMA</p>
            <p>akash@123gmail.com</p>
            <p>Transction Number : 1234567890 </p>
          </div>
          <div>
          <img src="https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Smiley face" width="320" height="320"/>
          </div>

        </Col>
      </Row>

      <Row>
        <Col className='user-documents'>
          <h1>User</h1>
          <p>user1234@gmail.com</p>

          <Row className='all-data'>
            <Col className='data'>sdf</Col>
            <Col className='data'>dfsddxf</Col>
            <Col className='data'>fdsf</Col>
            <Col className='data'>dfasd</Col>
            <Col className='data'>dfasd</Col>
          </Row>

          {/* {
            contacts.map(contact => {
              return (
                <Fragment>
                  <div className='admin-user-info'>
                    <p>{contact.Name} </p>
                    <p>{contact.Email}</p>
                  </div>
                  <div>
                  <p>Documents</p>
                  <p>document 1</p>
                  </div>
                </Fragment>

              )
            })
          } */}
          {/* <div>
            <img src={require('../../images/unnamed.png')} />
            <div>sfdbcvlfkjsmdzbc;hklsbdcx;kjdsb;c/</div>
          </div>
          <div>
            <img src={require('../../images/unnamed.png')} />
            <div>sfdbcv</div>
          </div>
          <div>
            <img src={require('../../images/unnamed.png')} />
            <div>sfdbcv</div>
          </div>
          <div>
            <img src={require('../../images/unnamed.png')} />
            <div>sfdbcv.fsmdzbc ;jlsfamndbc;ihebsdclhkxbk</div>
          </div> */}

        </Col>
      </Row>
      <Row>
        <Col className='admin-chats-data'>
          <div className='comments'>
            <p>Comments</p>
          </div>
        </Col>
      </Row>
      <Row className='admin-data'>

        <Row>
          <Col>
            <div>
            <textarea className='textarea reply-msg' name='message' placeholder='Enter Message'
                value={reply} onChange={(e) => onMessageChange(e)} />
          </div>
            <div className='load-msg-btn btn1'>
            <button className='reply-btn' onClick={sendemail}>Add Reply</button>
          </div>
          </Col>
        </Row>

        {
          messageLogs.map((message, index) => {
            console.log('message ===>', message)
            if (message.Type == 'user') {
              return (
                <Row>
                  <Col>
                    <div className='admin-panel-chat admin'>
                      <img src={require('../../images/head-659652_960_720.png')} />
                      <div className='user-info'>
                        <span className='name'>{message.Name}</span>
                        <span className='time'>{message.Date.split('T')[0]}</span>
                      </div>
                    </div>
                    <Row className='msg admin-msg-text'>
                      <p>{message.Message}</p>
                    </Row>
                  </Col>
                </Row>
              )
            } else if (message.Type == 'admin') {
              return (
                <Row>
                  <Col>
                    <div className='admin-panel-chat'>
                      <img src={require('../../images/head-659652_960_720.png')} />
                      <div className='user-info'>
                        <span className='name'>{message.Name}</span>
                        <span className='time'>{message.Date.split('T')[0]}</span>

                      </div>
                    </div>
                    <Row className='msg'>
                      <p>{message.Message}</p>
                    </Row>
                  </Col>
                </Row>
              )
            }
          })
        }

        <Row>
          {/* <Col>
            <div className='admin-panel-chat admin'>
              <img src={require('../../images/head-659652_960_720.png')} />
              <div className='user-info'>
                <span className='name'>Admin</span>
                <span className='time'>10pm</span>
                <span className='time'>Today</span>
              </div>
            </div>
            <Row className='msg admin-msg'>
              <p>This message from admin side!!!!!</p>
            </Row>
          </Col> */}

          {/* <Row>
            <Col>
              <div className='load-msg-btn'>
                <button>Load More</button>
              </div>
            </Col>
          </Row> */}

        </Row>
      </Row>
    </Container>
  )
}
export default connect(state => state)(AdminTicket)
