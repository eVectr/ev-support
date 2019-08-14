import React, { useEffect, useState, Fragment } from 'react'
import '../../styles/MessageLogs.css'
import axios from 'axios'
import moment from 'moment'
import { Row, Col } from 'reactstrap'

const MessageDetails = (props) => {

  const [userMessage, setUserMessage] = useState([])
  const [userMessageLogs, setUserMessageLogs] = useState([])
  const [adminMessage, setAdminMessage] = useState([])
  const [sentMessage, setSentMessage] = useState([])
  const [replyMessage, setReplyMessage] = useState('')
  const [showTextArea, setshowTextArea] = useState(true)
  const [showLoader, setshowLoader] = useState(true)
  const [conversation, setConversation] = useState([])
  const [Errors, setErrors] = useState('')
  useEffect(() => {
    // axios.post(`http://localhost:7788/getusertousermessage`, { ReceiverName: JSON.parse(localStorage.user).Name })
    //   .then(res => {
    //     if (res.data.ReceiverName !== 'admin') {
    //       setUserMessage(res.data)
    //     }
    //   })
    //axios.post(`http://localhost:7788/getadminmessagebyId`, { Id: props.messageId })
    axios.post(`http://54.165.185.4:7788/getadminmessagebyId`, { Id: props.messageId })
      .then(res => {
        setAdminMessage(res.data[0])
      })
    // axios.post(`http://localhost:7788/getsentmessagebyId`, { Id: props.messageId })
    axios.post(`http://54.165.185.4:7788/getsentmessagebyId`, { Id: props.messageId })
      .then(res => {
        setSentMessage(res.data[0])
        setUserMessage(res.data[0])
        setshowLoader(false)
        // axios.post(`http://localhost:7788/getusermessagelogs`, { Id: userMessage._id })
        axios.post(`http://54.165.185.4:7788/getusermessagelogs`, { Id: userMessage._id })
          .then(res => {
            setUserMessageLogs(res.data)
          })
      })
      axios.post(`http://54.165.185.4:7788/findconversation`, { ConvId: props.messageId })
      //axios.post(`http://localhost:7788/findconversation`, { ConvId: props.messageId })
      .then(res => {
        setConversation(res.data)
      })
  }, [])

  useEffect(() => {
    if (props.showCase === 1) {
      //  axios.post(`http://localhost:7788/getusermessagelogs`, { Id: userMessage._id })
      axios.post(`http://54.165.185.4:7788/getusermessagelogs`, { Id: userMessage._id })
        .then(res => {
          setUserMessageLogs(res.data)
        })
      setshowLoader(false)
      // axios.post(`http://localhost:7788/getusermessagelogs`, { Id: props.logsId })
      axios.post(`http://54.165.185.4:7788/getusermessagelogs`, { Id: props.logsId })
        .then(res => {
          setUserMessageLogs(res.data)
        })
    }
  }, [userMessage])

  let showTestMsgBox = () => {
    setshowTextArea(!showTextArea)
  }
  let sendReply = () => {
    if (replyMessage == '') {
      setErrors('Please fill in this filed')
    } else {
      axios.post(`http://54.165.185.4:7788/createconversation`, {
       // axios.post(`http://localhost:7788/createconversation`, {
        SenderId: JSON.parse(localStorage.user)._id,
        SenderName:JSON.parse(localStorage.user).Name,
        ConvId:sentMessage._id,
        ReceiverId:sentMessage.ReceiverId[0],
        ReceiverName:sentMessage.ReceiverName[0],
        Message:replyMessage
      })
      .then(res =>{
        axios.post(`http://54.165.185.4:7788/findconversation`, { ConvId: props.messageId })
       // axios.post(`http://localhost:7788/findconversation`, { ConvId: props.messageId })
        .then(res => {
          setConversation(res.data)
        })
      })
      axios.post(`http://54.165.185.4:7788/savenotification`, {
       // axios.post(`http://54.165.185.4:7788/savenotification`, {
        Type: 'User to User Message',
        SentBy: JSON.parse(localStorage.user).Name,
        SentTo: userMessage.ReceiverId,
      })
      setErrors('success')
      setshowLoader(false)
    }
    
  }

  let onReplyChange = (e) => {
    setReplyMessage(e.target.value)
  }

 
console.log("conversation --->  ", conversation) 
  return (
    <div className="messagedetail">
      <Row className="message-mail">
        {/* <Col md="2" className="left-sidebar">

      </Col>  */}
        {props.showCase == '1' ?
          <Fragment>
            {showLoader ?
              <div className='loader-img'>
                <img src={require('../../images/loader.gif')} />
              </div> :
              <Col md="10" className="message-deatil-inner">
                <div className="message-outer">
                  <div className="conversation-mess ">
                    <div className="detail-images">
                      <span className="detail-images"><img src={require('../../images/head-659652_960_720.png')} /></span>
                    </div>
                    <div className="head-mess">
                      <h3>{userMessage.SenderName}</h3><span>{moment(userMessage.Date).format('lll')}</span>
                    </div>
                    <div className="summay-message">
                      <p>
                        {userMessage.Message}
                      </p>
                    </div>
                  </div>
                  {/* <div className="conversation-mess receiver ">
                    <div className="detail-images">
                      <span className="detail-images"><img src={require('../../images/head-659652_960_720.png')} /></span>
                    </div>
                    <div className="head-mess">
                      <h3>{userMessage.SenderName}</h3><span>{moment(userMessage.Date).format('MMMM Do YYYY, h:mm:ss a')}</span>
                    </div>
                    <div className="summay-message">
                      <p>
                        {userMessage.Message}
                      </p>
                    </div>
                  </div> */}
                  {conversation.map((message, index) => {
                    return (
                      <div className= 'conversation-mess'>
                        <div className="detail-images">
                          <span className="detail-images"><img src={require('../../images/head-659652_960_720.png')} /></span>
                        </div>
                        <div className="head-mess">
                          <h3>{message.SenderName} </h3><span>{moment(message.Date).format('MMMM Do YYYY, h:mm:ss a')}</span>
                        </div>
                        <div className="summay-message">
                          <p>
                            {message.Message}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="Reply-section">
                 
                </div>
                {
                  showTextArea ? <div className="reply-detail-text">
                    <textarea placeholder="input reply" onChange={(e) => onReplyChange(e)}></textarea>
                    <button className="message-btn btn btn-secondary" onClick={sendReply}>Reply</button>
                    <Fragment>
                      {
                        setErrors ? <p className="error-msg">{Errors != 'success' ? Errors : ''}</p> : <p>Success</p>
                      }
                    </Fragment>
                  </div> : ''
                }
              </Col>}
          </Fragment>
          : <Fragment>{
            props.showCase == '0' ?
              <Fragment>
                {showLoader ?
                  <div className='loader-img'>
                    <img src={require('../../images/loader.gif')} />
                  </div> :
                  <Col md="10" className='message-deatil-inner'>
                   <div className="message-outer">
                    <div className="conversation-mess">

                      <div className='message-section'>
                        <div className='detail-images'>
                          <span className='detail-images'><img src={require('../../images/head-659652_960_720.png')} /></span>
                        </div>
                        <div className='head-mess'>
                          <h3>{adminMessage.SenderName}</h3><span> {moment(adminMessage.Date).format('MMMM Do YYYY, h:mm:ss a')}</span>
                        </div>
                        <div className="summay-message">
                          <p>
                            {adminMessage.Message}
                          </p>
                        </div>
                      </div>
                    </div>
                    </div>
                  </Col>}</Fragment>

              :
              <Fragment>
                {showLoader ?
                  <div className='loader-img'>
                    <img src={require('../../images/loader.gif')} />
                  </div> :
                  <Col md="10" className='message-deatil-inner'>
                     <div className="message-deatil-section">
                    <div className='conversation-mess'>
                      <div className='message-section'>
                        <div className='detail-images'>
                          <span className='detail-images'><img src={require('../../images/head-659652_960_720.png')} /></span>
                        </div>
                        <div className='head-mess'>
                          <h3>{sentMessage.SenderName}</h3><span> {moment(sentMessage.Date).format('MMMM Do YYYY, h:mm:ss a')}</span>
                        </div>
                        <div className="summay-message">
                          <p>
                            {sentMessage.Message}
                          </p>
                        </div>
                      </div>
                    </div>
                    </div>

                    {conversation.map((message, index) => {
                    return (
                      <div className= 'conversation-mess'>
                        <div className="detail-images">
                          <span className="detail-images"><img src={require('../../images/head-659652_960_720.png')} /></span>
                        </div>
                        <div className="head-mess">
                          <h3>{message.SenderName} </h3><span>{moment(message.Date).format('MMMM Do YYYY, h:mm:ss a')}</span>
                        </div>
                        <div className="summay-message">
                          <p>
                            {message.Message}
                          </p>
                        </div>
                      </div>
                    )
                  })}

                    <div className="Reply-section">
                  
                </div>
                {
                  showTextArea ? <div className="reply-detail-text">
                    <textarea placeholder="input reply" onChange={(e) => onReplyChange(e)}></textarea>
                    <button className="message-btn btn btn-secondary" onClick={sendReply}>Reply</button>
                    <Fragment>
                      {
                        setErrors ? <p className="error-msg">{Errors != 'success' ? Errors : ''}</p> : <p>Success</p>
                      }
                    </Fragment>
                  </div> : ''
                }
                  </Col>}</Fragment>
          }</Fragment>}
      </Row>
    </div>
  )
}

export default MessageDetails
