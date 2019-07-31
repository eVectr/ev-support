import React, { useEffect, useState, Fragment } from 'react'
import '../../styles/MessageLogs.css'
import MessageDetails from './MessageDetails'
import axios from 'axios'
import TimeAgo from 'timeago-react';
import timeago from 'timeago.js';
import { Container, Row, Col, Table, Form, CardBody, UncontrolledCollapse, FormGroup, Label, Input, FormText, Button, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import ModalUi from './ModalUi'
import { set } from 'mongoose';

const MessageLogs = (props) => {
  const [activeTab, setActiveTab] = useState('1')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [userMessage, setUserMessage] = useState([])
  const [adminMessage, setAdminMessage] = useState([])
  const [sentMessage, setSentMessage] = useState([])
  const [testIndex, setTestIndex] = useState('')
  const [sendStatus, setSendStatus] = useState(false)
  const [messageStatus, setMessageStatus] = useState(false)
  const [open, setOpen] = useState(false)
  const [showMessageDetails, setShowMessageDetails] = useState(false)
  const [showReplyInput, setshowReplyInput] = useState(false)
  const [showCase, setshowCase] = useState('0')
  const [showLoader, setshowLoader] = useState(true)
  const [isNoUserData, setIsNoUserData] = useState(false)
  const [isNoAdminData, setIsNoAdminData] = useState(false)
  const [isNoSentData, setIsNoSentData] = useState(false)

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
  let handleShowCase = (c) => {
    setshowCase(c)
  }
  useEffect(() => {
    axios.post(`http://localhost:7777/getusertousermessage`, { ReceiverId: JSON.parse(localStorage.user)._id })
      .then(res => {
        if (res.data.length < 1) {
          setIsNoUserData(true)
        }
        setshowLoader(false)
        setUserMessage(prev => {
          const updated = prev.concat(res.data.reverse())
          return updated
        })

        axios.post(`http://localhost:7777/getallusertousermessage`, { SenderId: JSON.parse(localStorage.user)._id })
          .then(res => {
            if (res.data.length < 1) {
              setIsNoSentData(true)
            }
            setshowLoader(false)
            setSentMessage(prev => {
              const updated = prev.concat(res.data.reverse())
              return updated
            })
          })
      })

    axios.get(`http://localhost:7777/getadminmessage`)
      .then(res => {
        if (res.data.length < 1) {
          setIsNoAdminData(true)
        }
        for (let i = 0; i < res.data.length; i++) {
          setAdminMessage([res.data[i]])
          setshowLoader(false)
        }
      })
  }, [])
  let showReply = (id) => {
    setShowMessageDetails(!showMessageDetails)
  }
  console.log('is user data ==>', isNoUserData)
  return (
    <div className="messagelogs">
      <Row className="message-mail">
       
        <div className="pagination-msg">
          <Pagination aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last href="#" />
            </PaginationItem>
          </Pagination>
        </div>
        {showMessageDetails ? <h2 className="backtopage" onClick={() => showReply()}><i class="fas fa-arrow-left"></i><span>Back to page</span></h2> : ''}
        <Col md="2" className="left-sidebar">
        <h2>Message</h2>
          <Nav vertical>
            <NavItem>
              <ModalUi type={'user'} open={open} closeModal={closeModal} className="sent-modal"></ModalUi>
              <Button className="message-btn" onClick={sendMessage}>Compose</Button>
            </NavItem>
          </Nav>
          <Nav vertical>
            <NavLink href="#" className="adminlink">

              <NavItem onClick={() => handleShowCase('0')} id="toggler" className={`${showCase == '0' ? 'active' : ''}`} style={{ marginBottom: '1rem' }}>
                <i class="fa fa-user-circle" aria-hidden="true" ></i>Admin Message
            </NavItem>
              <NavItem onClick={() => handleShowCase('1')} id="toggler" className={`${showCase == '1' ? 'active' : ''}`} style={{ marginBottom: '1rem' }}>
                <i class="fa fa-users" aria-hidden="true" ></i>Users Message
            </NavItem>
              <NavItem onClick={() => handleShowCase('2')} id="toggler" className={`${showCase == '2' ? 'active' : ''}`} style={{ marginBottom: '1rem' }}>
                <i class="fa fa-paper-plane" aria-hidden="true" ></i>Sent
            </NavItem>
            </NavLink>
          </Nav>
        </Col>
        {!showMessageDetails ?
          <Fragment>
            {showCase == '0' ?
          <Fragment>{isNoAdminData ? 
              <div className="no-data-msg"><h3>No Messages</h3></div> :   
          <Col md="10">
              <Table striped className="message-box">
                <Fragment>
                  {showLoader ?
                    <div className='loader-img'>
                      <img src={require('../../images/loader.gif')} />
                    </div> :
                    <tbody>
                      {adminMessage.map((message, index) => {
                        return (<tr onClick={() => showReply('test')}>
                          <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
                          <td className="name-table">{message.SenderName}</td>
                          <td class="message-detail">{message.Message}</td>
                          <td className="time-detail" align="right">{<TimeAgo
                            datetime={message.Date}
                            locale='IST' />}</td>
                          <td><i class="fas fa-envelope"></i></td>
                        </tr>
                        )

                      })
                      }
                    </tbody>}
                </Fragment>
              </Table>
            </Col> }
            </Fragment> : <Fragment>
                {showCase == '1' ?
                  <Fragment>{isNoUserData ? 
                    <div className="no-data-msg"><h3>No Messages</h3></div> : 
              
                  <Col md="10">
                  <Table striped className="message-box">
                    <Fragment>
                      {showLoader ?
                        <div className='loader-img'>
                          <img src={require('../../images/loader.gif')} />
                        </div> :
                        <tbody>
                          {userMessage.map((message, index) => {
                            return (<tr onClick={() => showReply('test')}>
                              <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
                              <td className="name-table">{message.SenderName}</td>
                              <td class="message-detail">{message.Message}</td>
                              <td className="time-detail" align="right">{<TimeAgo
                                datetime={message.Date}
                                locale='IST' />}</td>
                              <td><i class="fas fa-envelope"></i></td>
                            </tr>
                            )

                          })
                          }
                        </tbody>}
                    </Fragment>
                  </Table>
                </Col>  }
                </Fragment>
                  :
                  <Fragment>{isNoSentData ? 
                    <div className="no-data-msg"><h3>No Messages</h3></div> : 
                  <Col md="10">
                    <Table striped className="message-box">
                      <Fragment>
                        {showLoader ?
                          <div className='loader-img'>
                            <img src={require('../../images/loader.gif')} />
                          </div> :
                          <tbody>
                            {sentMessage.map((message, index) => {
                              return (<tr onClick={() => showReply('test')}>
                                <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
                                <td className="name-table">{message.SenderName}</td>
                                <td class="message-detail">{message.Message}</td>
                                <td className="time-detail" align="right">{<TimeAgo
                                  datetime={message.Date}
                                  locale='IST' />}</td>
                                <td><i class="fas fa-envelope"></i></td>
                              </tr>
                              )

                            })
                            }
                          </tbody>}
                      </Fragment>
                    </Table>
                  </Col>
                  }
                </Fragment>
                  }
              </Fragment>}
          </Fragment>
        : <MessageDetails />
      }
      </Row>
    </div>
  )
}

export default MessageLogs
