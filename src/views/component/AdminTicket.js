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
  const [active, setActive] = useState('')
  const [loader, setLoader] = useState(true)
  const [showTextArea, setshowTextArea] = useState(false)

  useEffect(() => {
    //axios.post(`http://localhost:7777/messagelogs`, { ID: props.match.params.id })
    axios.post(`http://3.83.23.220:7788/messagelogs`, { ID: props.match.params.id })
    .then(res => {
        setMessageLogs(res.data.reverse())
      })
   // axios.post(`http://localhost:7777/getcontactbycaseno`, { caseno: props.match.params.id })
    axios.post(`http://3.83.23.220:7788/getcontactbycaseno`, { caseno: props.match.params.id })
    .then(res => {
        setLoader(false)
        setContacts(res.data)
      })
  }, [reply, messageLogs])

  let sendemail = () => {
   // axios.post(`http://localhost:7777/adminreply`, { ID: props.match.params.id, Message: reply })
    axios.post(`http://3.83.23.220:7788/adminreply`, { ID: props.match.params.id, Message: reply })
    .then(res => {
        console.log('replyy===>', res)
        setContacts([res.data])
        setReply('')
      })
  }

  let onMessageChange = (e) => {
    setReply(e.target.value)
  }

  const onSelectedTab = (index) => {
    setSelected(index)
  }

  useEffect(() => {
    if (selectedTab === 0) {
      setActive('Document')
    } else if (selectedTab === 1) {
      setActive('Image')
    } else if (selectedTab === 2) {
      setActive('Link')
    }
    else {
      setActive('Document')
    }
  }, [selectedTab])

  const renderTabs = () => {
    //switch (selectedTab) {
    if (selectedTab === 0) {
      return <Document contacts={contacts} />
    } else if (selectedTab === 1) {
      return <Images contacts={contacts} />
    } else if (selectedTab === 2) {
      return <Link contacts={contacts} />
    }
    else {
      return <Document />
    }
  }
  let showTestMsgBox = () => {
    setshowTextArea(!showTextArea) 
  }
 
  console.log("contacts ====>", contacts)
  return (
  

    <Col className='container-fluid'>
      {loader ?
        <div className='loader-img'>
          <img src={require('../../images/loader.gif')} />
        </div> :

<Row>
{
  contacts.map((element, index) => {
    return (
      <Col md='3' className='settings-tab'>
        <div className='user-img'>
          <img src={require('../../images/head-659652_960_720.png')} />
          <span>{element.Name}</span>
        </div>
        <div className='user-data'>
          <p><span className='email'>Transaction No:</span><span>123456789</span></p>
          <p><span className='email'>Email:</span><span>{element.Email}</span></p>
          <p><span className='email'>Status:</span><span>Open</span>
          <span class="editicon is-medium is-left icn" onClick={showTestMsgBox} ><i class="fas fa-edit icn1 "></i></span></p>
          {
          showTextArea ?  <div className="reply-detail-text">
          <input placeholder="status" className="status-field"/>
          <button className="reply-btn btn btn-secondary">Send</button>
           {/* <p className="error-msg">{Errors != 'success'? Errors: ''}</p> */}
      </div> : ''
        }
        </div>
        <div className='setting-tab-list'>
          <ul className='list-group'>
            {
              dataArray.map((data, index) => {
                console.log("index === >" , index)
                return (
                 <li className={`${index == selectedTab ? 'selectedtab list-group-item' : 'notselected list-group-item'}`} onClick={() => onSelectedTab(index)}>
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
<Col md='9' className='right-tab' >
  <Card className='show-card'>
    {renderTabs()}
  </Card>
  {/* --------------------------------------comment-section----------------------------------- */}

<Row>
<Col className='admin-chats-data'>
  <div className='comments'>
    <p className='image-headings'>Comments</p>
  </div>
</Col>
</Row>


<Row>
<Col md={{ size: 10, offset: 1 }} className="comment-inner">
  <div className='text-area-field'>
    <textarea className='textarea reply-msg' name='message' placeholder='Enter Message'
      value={reply} onChange={(e) => onMessageChange(e)} />
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
        <Col md={{ size: 10, offset: 1 }}>
          <div className='admin-panel-chat admin'>
            <img src={require('../../images/admin.jpg')} />
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
            <img src={require('../../images/images.jpeg')} />
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
</Row>
      }
      

      

    </Col>
  )
}
export default connect(state => state)(AdminTicket)
