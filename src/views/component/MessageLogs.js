import React, { useEffect, useState, Fragment } from 'react'
import '../../styles/MessageLogs.css'
import MessageDetails from './MessageDetails'
import axios from 'axios'
import TimeAgo from 'timeago-react'
import { Row, Col, Button, Table, Nav, NavItem, NavLink, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import ModalUi from './ModalUi'
import MessagePagination from './MessagePagination'
import { limit } from '../../utils/Const';
const MessageLogs = (props) => {
  const [userMessage, setUserMessage] = useState([])
  const [adminMessage, setAdminMessage] = useState([])
  const [sentMessage, setSentMessage] = useState([])
  const [messageStatus, setMessageStatus] = useState(false)
  const [open, setOpen] = useState(false)
  const [showMessageDetails, setShowMessageDetails] = useState(false)
  const [showCase, setshowCase] = useState('0')
  const [messageId, setMessageId] = useState('')
  const [logsId, setLogsId] = useState('')
  const [showLoader, setshowLoader] = useState(true)
  const [isNoUserData, setIsNoUserData] = useState(false)
  const [isNoAdminData, setIsNoAdminData] = useState(false)
  const [isNoSentData, setIsNoSentData] = useState(false)
  const [start, setStart] = useState(0)
  const nextPage = () => {
    console.log(setStart(start + limit), 'setStart(start + limit)')
    setStart(start + limit)
  }
  const prevPage = () => {
    console.log(setStart(start - limit), 'setStart(start - limit)setStart(start - limit)')
    setStart(start - limit)
  }
  const adminMessagePagination = adminMessage.slice(start, start + limit)
  const userMessagePagination = userMessage.slice(start, start + limit)
  const sentMessagePagination = sentMessage.slice(start, start + limit)

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
    setShowMessageDetails(false)
    setshowCase(c)
  }
  useEffect(() => {
   // axios.post(`http://localhost:7788/getusertousermessage`, { ReceiverId: JSON.parse(localStorage.user)._id })
    axios.post(`http://54.165.185.4:7788/getusertousermessage`, { ReceiverId: JSON.parse(localStorage.user)._id })
    .then(res => {
        if (res.data.length < 1) {
          setIsNoUserData(true)
        }
        setshowLoader(false)
        setUserMessage(prev => {
          const updated = prev.concat(res.data.reverse())
          return updated
        })
       // axios.post(`http://localhost:7788/getallusertousermessage`, { SenderId: JSON.parse(localStorage.user)._id })
        axios.post(`http://54.165.185.4:7788/getallusertousermessage`, { SenderId: JSON.parse(localStorage.user)._id })
        .then(res => {
            if (res.data.length < 1) {
              setIsNoSentData(true)
            }
            setshowLoader(false)
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].SenderId === JSON.parse(localStorage.user)._id) {
                setSentMessage(prev => {
                  const updated = prev.concat(res.data.reverse())
                  return updated
                })
              }
            }
          })
      })

    //axios.get(`http://localhost:7788/getadminmessage`)
    axios.get(`http://54.165.185.4:7788/getadminmessage`)
      .then(res => {
        if (res.data.length < 1) {
          setIsNoAdminData(true)
        }
        setAdminMessage(prev => {
          const updated = prev.concat(res.data.reverse())
          return updated
        })
        setshowLoader(false) 
      })
  }, [])

  let onMessageClick = (id, detailId) => {
    setLogsId(detailId)
    setMessageId(id)
    setShowMessageDetails(!showMessageDetails)
  }
  let backtopage = () => {
    setShowMessageDetails(!showMessageDetails)
  }

  return (
    <div className="messagelogs">
      <Row className="message-mail">

        <div className="pagination-msg">
          <MessagePagination
            prevPage={prevPage}
            nextPage={nextPage}
            start={start}
            limit={limit}
            list={adminMessage}
            list={userMessage}
            list={sentMessage}
          />
        </div>
        {showMessageDetails ? <h2 className="backtopage" onClick={() => backtopage()}><i class="fas fa-arrow-left"></i><span>Back to page</span></h2> : ''}
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
                          {adminMessagePagination.map((message, index) => {
                            return (<tr onClick={() => onMessageClick(message._id)} key={index}>
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
                </Col>}
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
                              {userMessagePagination.map((message, index) => {
                                return (<tr onClick={() => onMessageClick(message._id,  message.Id)}>
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
                    </Col>}
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
                              {sentMessagePagination.map((message, index) => {
                              let receiver = ''
                              for(let i = 0 ; i < message.ReceiverName.length; i++){
                                console.log("receiver =>", receiver.concat(message.ReceiverName[i])) 
                              }
                            
                                return (<tr onClick={() => onMessageClick(message._id)}>
                                  <th scope="row"><span className="circleborder"><i class="far fa-circle"></i></span></th>
                                  <td className="name-table">{message.ReceiverName}</td>
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
          : <MessageDetails showCase={showCase} messageId={messageId} logsId={logsId} />
        }
      </Row>
    </div>
  )
}

export default MessageLogs
