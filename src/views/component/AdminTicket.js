import React, { useState, useEffect} from 'react'
import { Card, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import axios from 'axios'
import Document from './Documents'
import Images from './Images'
import Link from './Link'
import '../../styles/adminticket.css'

let dataArray = [
  {
    icon: '',
    value: 'Document'
  },

  {
    icon: '',
    value: 'Images'
  },

  {
    icon: '',
    value: 'Link'
  }

]

const AdminTicket = (props) => {
  const [messageLogs, setMessageLogs] = useState([])
  const [contacts, setContacts] = useState([])
  const [reply, setReply] = useState('')
  const [selectedTab, setSelected] = useState(0)

  useEffect(() => {
    axios.post(`http://localhost:7777/messagelogs`, { ID: props.match.params.id })
      .then(res => {
        setMessageLogs(res.data.reverse())
      })
    axios.post(`http://localhost:7777/getcontactbycaseno`, { caseno: props.match.params.id })
      .then(res => {
        console.log(res, '<<<<<<<<=======REsponse')
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

  const onSelectedTab = (index) => {
    setSelected(index)
  }
  const renderTabs = () => {
    switch (selectedTab) {
      case 0:
        return <Document contacts={contacts} />
      case 1:
        return <Images contacts={contacts} />
      case 2:
        return <Link contacts={contacts} />
      default:
        return <Document />
    }
  }

  return (
  // <Container>
  //   <Row>
  //     <Col>
  //       <div className='heading'>
  //         <h4>User Info</h4>
  //       </div>
  //     </Col>
  //   </Row>
  //   {
  //     contacts.map(contact => {
  //       return (
  //         <div>
  //           <Row>
  //             <Col className='user-documents'>
  //               <h1>Username:{contact.Name}</h1>
  //               <p>Transaction Number: 123456</p>
  //               <p>Email:{contact.Email}</p>
  //             </Col>
  //           </Row>
  //           <h4 className='image-headings'>Images</h4>
  //           {
  //             contact.Image.length > 0 ? <Row className='images'>
  //               {contact.Image.map((img, index) => {
  //                 let getimg = img.split('/')[1]
  //                 let url = 'http://localhost:7777/'
  //                 let imgurl = url.concat(getimg)
  //                 return (
  //                   <Col md='3'>
  //                     <img src={'http://localhost:7777/2019-07-02T11:41:52.837Zpexels-photo-459225.jpeg'} />
  //                   </Col>
  //                 )
  //               })}
  //             </Row> : <img className='images' src={require('../../images/NO Image Available.jpg')} width='100px' />
  //           }

  //           <h4 className='image-headings'>Documents</h4>
  //           {
  //             contact.Document.length > 0 ? <Row className='documents'>
  //               {
  //                 contact.Document.map((Document, index) => {
  //                   return (
  //                     <Col md='2' >
  //                       <a href={Document} target='_blank'>
  //                         <img className='link-images documents' src={require('../../images/doc.png')} />
  //                       </a>
  //                     </Col>
  //                   )
  //                 })
  //               }

  //             </Row> : <img src={require('../../images/dummy.jpg')} width='100px' />
  //           }

  //           <h4 className='image-headings'>Links</h4>

  //           {
  //             contact.Link.length > 0 ? <Row className='documents'>
  //               {
  //                 contact.Link.map((link, index) => {
  //                   return (
  //                     <Col md='2' >
  //                       <a href={link} target='_blank'>
  //                         <img className='link-images documents' src={require('../../images/WebSearch_link_Building.jpg')} />
  //                       </a>
  //                     </Col>
  //                   )
  //                 })
  //               }

  //             </Row> : <img src={require('../../images/dummy.jpg')} width='100px' />
  //           }

  //         </div>
  //       )
  //     })
  //   }
  //   <Row>
  //     <Col className='admin-chats-data'>
  //       <div className='comments'>
  //         <p className='image-headings'>Comments</p>
  //       </div>
  //     </Col>
  //   </Row>

  //   <Row>
  //     <Col>
  //       <div>
  //         <textarea className='textarea reply-msg' name='message' placeholder='Enter Message'
  //           value={reply} onChange={(e) => onMessageChange(e)} />
  //       </div>
  //       <div className='load-msg-btn btn1'>
  //         <button className='reply-btn' onClick={sendemail}>Add Reply</button>
  //       </div>
  //     </Col>
  //   </Row>

  //   {
  //     messageLogs.map((message, index) => {
  //       console.log('message ===>', message)
  //       if (message.Type == 'user') {
  //         return (
  //           <Row>
  //             <Col>
  //               <div className='admin-panel-chat admin'>
  //                 <img src={require('../../images/head-659652_960_720.png')} />
  //                 <div className='user-info'>
  //                   <span className='name'>{message.Name}</span>
  //                   <span className='time'>{message.Date.split('T')[0]}</span>
  //                 </div>
  //               </div>
  //               <Row className='msg admin-msg-text'>
  //                 <p>{message.Message}jslhdzmxhbfv;cksdzxbv;k </p>
  //               </Row>
  //             </Col>
  //           </Row>
  //         )
  //       } else if (message.Type == 'admin') {
  //         return (
  //           <Row>
  //             <Col>
  //               <div className='admin-panel-chat'>
  //                 <img src={require('../../images/head-659652_960_720.png')} />
  //                 <div className='user-info'>
  //                   <span className='name'>{message.Name}</span>
  //                   <span className='time'>{message.Date.split('T')[0]}</span>

  //                 </div>
  //               </div>
  //               <Row className='msg'>
  //                 <p>{message.Message}</p>
  //               </Row>
  //             </Col>
  //           </Row>
  //         )
  //       }
  //     })
  //   }
  // </Container>

    <Col className='container-fluid'>
      <Row>
        {
          contacts.map((element, index) => {
            return (
              <Col md='3' className='settings-tab'>
                <div className='user-img'>
                  <img src={require('../../images/head-659652_960_720.png')} width='50px' />
                  <span>{element.Name}</span>
                </div>
                <div className='user-data'>
                  <p><span className='email'>Transaction No:</span><span>123456789</span></p>
                  <p><span className='email'>Email:</span><span>{element.Email}</span></p>
                </div>
                <div className='setting-tab-list'>
                  <ul className='list-group'>
                    {
                      dataArray.map((data, index) => {
                        return (
                          <li className='active-tab list-group-item' onClick={() => onSelectedTab(index)}>
                            <span>{data.value}</span>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </Col>
            )
          })
        }
        <Col md='9' className='' >
          <Card className='show-card'>
            {renderTabs()}
          </Card>
        </Col>
      </Row>

      {/* --------------------------------------comment-section----------------------------------- */}

      <Row>
        <Col className='admin-chats-data'>
          <div className='comments'>
            <p className='image-headings'>Comments</p>
          </div>
        </Col>
      </Row>

      {/* <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <div className='text-area-field'>
            <textarea className='textarea reply-msg' name='message' placeholder='Enter Message'
              value={reply} onChange={(e) => onMessageChange(e)} />
            <button className='reply-btn' onClick={sendemail}>Add Reply</button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <div className='admin-panel-chat admin'>
            <img src={require('../../images/head-659652_960_720.png')} />
            <div className='user-info'>
              <span className='name' />
              <span className='time' />
            </div>

          </div>
          <Row className='msg admin-msg-text'>
            <p>jslhdzmxhbfv;cksdzxbv;k </p>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <div className='admin-panel-chat'>
            <img src={require('../../images/head-659652_960_720.png')} />
            <div className='user-info'>
              <span className='name'>kjsdhfvlcjh</span>
              <span className='time'>12-10-2019</span>
            </div>
          </div>
          <Row className='msg'>
            <p>hello</p>
          </Row>
        </Col>
      </Row> */}

      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <div className='text-area-field'>
            <textarea className='textarea reply-msg' name='message' placeholder='Enter Message'
              value={reply} onChange={(e) => onMessageChange(e)} />
            <button className='reply-btn' onClick={sendemail}>Add Reply</button>
          </div>
        </Col>
      </Row>

      {/* <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <div className='admin-panel-chat admin'>
            <img src={require('../../images/head-659652_960_720.png')} />
            <div className='user-info'>
              <span className='name' />
              <span className='time' />
            </div>

          </div>
          <Row className='msg admin-msg-text'>
            <p>jslhdzmxhbfv;cksdzxbv;k </p>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <div className='admin-panel-chat'>
            <img src={require('../../images/head-659652_960_720.png')} />
            <div className='user-info'>
              <span className='name'>kjsdhfvlcjh</span>
              <span className='time'>12-10-2019</span>
            </div>
          </div>
          <Row className='msg'>
            <p>hello</p>
          </Row>
        </Col>
      </Row> */}

      {
        messageLogs.map((message, index) => {
          console.log('message ===>', message)
          if (message.Type == 'user') {
            return (
              <Row>
                <Col md={{ size: 10, offset: 1 }}>
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
                <Col md={{ size: 10, offset: 1 }}>
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

    </Col>
  )
}
export default connect(state => state)(AdminTicket)
