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
  const [showTextArea, setshowTextArea] = useState(false)
  
  useEffect(() => {
    // axios.post(`http://localhost:7777/getusertousermessage`, { ReceiverName: JSON.parse(localStorage.user).Name })
    //   .then(res => {
    //     if (res.data.ReceiverName !== 'admin') {
    //       setUserMessage(res.data)
    //     }
    //   })
    axios.post(`http://localhost:7777/getadminmessagebyId`, { Id: props.messageId })
      .then(res => {
        setAdminMessage(res.data[0])
      })
    axios.post(`http://localhost:7777/getsentmessagebyId`, { Id: props.messageId })
      .then(res => {
        setSentMessage(res.data[0])
        setUserMessage(res.data[0])
        axios.post(`http://localhost:7777/getusermessagelogs`, { Id: userMessage._id })
          .then(res => {
            console.log('res -======>', res)
            setUserMessageLogs(res.data)
          })
      })
  }, [])

  useEffect(() => {
    if (props.showCase === 1) {
      axios.post(`http://localhost:7777/getusermessagelogs`, { Id: userMessage._id })
        .then(res => {
          console.log('res -======>', res)
          setUserMessageLogs(res.data)
        })
      axios.post(`http://localhost:7777/getusermessagelogs`, { Id: props.logsId })
        .then(res => {
          console.log(' logs res -======>', res)
          setUserMessageLogs(res.data)
        })
    }
  }, [userMessage])

  let showTestMsgBox = () => {
    setshowTextArea(!showTextArea) 
  }
  let sendReply = () => {
    axios.post(`http://localhost:7777/usermessagelogs`, {
      Id: userMessage._id,
      SenderName: userMessage.SenderName,
      ReceiverName: userMessage.ReceiverName,
      Message: replyMessage
    })
      .then(res => {
        console.log('send reply ==>', res)
      })

    axios.post(`http://localhost:7777/checkallusertousermessage`, { Id: userMessage._id })
      .then(res => {
        console.log('check response ==>', res.data)
        if (res.data.length < 1) {
          axios.post(`http://localhost:7777/checkallusermessage`, { Id: props.messageId })
            .then(res => {
              console.log('check second response ==>', res.data)
              if (res.data.length < 1) {
                axios.post(`http://localhost:7777/usertousermessage`, {
                  Id: userMessage._id,
                  SenderId: JSON.parse(localStorage.user)._id,
                  SenderName: JSON.parse(localStorage.user).Name,
                  ReceiverId: userMessage.SenderId,
                  ReceiverName: userMessage.SenderName,
                  Message: replyMessage
                })
              }
            })
        }
      })
  }

  let onReplyChange = (e) => {
    setReplyMessage(e.target.value)
  }
  
  console.log('props ===>', props.messageId)

  return (
    <div className="messagedetail">
      <Row className="message-mail">
        {/* <Col md="2" className="left-sidebar">

      </Col>  */}
          { props.showCase == '1'?
        <Col md="10" className="message-deatil-inner">
          <div className="message-outer">
            <div className="conversation-mess ">
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
              </div>
              <div className="conversation-mess receiver ">
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
              </div>
              {userMessageLogs.map((message, index)=>{
                return(
                 
                <div  className={`${JSON.parse(localStorage.user).Name == message.ReceiverName ? 'conversation-mess receiver' : 'conversation-mess'}`}>
                <div className="detail-images">
                    <span className="detail-images"><img src={require('../../images/head-659652_960_720.png')} /></span>
                </div>
                <div className="head-mess">
                    <h3>{message.ReceiverName} </h3><span>{moment(message.Date).format('MMMM Do YYYY, h:mm:ss a')}</span>
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
                <button onClick={showTestMsgBox}><span><i class="fas fa-reply"></i></span>Reply</button>
            </div>
            {
          showTextArea ?  <div className="reply-detail-text">
          <textarea placeholder="input reply" onChange = {(e) =>onReplyChange(e)}></textarea>
          <button className="message-btn btn btn-secondary" onClick = {sendReply}>Send</button>
      </div> : ''
        }
        </Col> 
        :<Fragment>{
          props.showCase == '0'?
          <Col md="10" className='message-deatil-inner'>
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
          </Col>
          
         :
         <Col md="10" className='message-deatil-inner'>
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
         </Col>
        }</Fragment>}
      </Row>
    </div>
  )
}

export default MessageDetails
