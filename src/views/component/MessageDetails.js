import React, { useEffect, useState, Fragment } from 'react'
import '../../styles/MessageLogs.css'
import axios from 'axios'
import { Row, Col } from 'reactstrap'
import ModalUi from './ModalUi'
import MessageLogs from './MessageLogs'
const MessageDetails = (props) => {
 
  const [userMessage, setUserMessage] = useState([])
  const [adminMessage, setAdminMessage] = useState([])
  const [showMessageLogs, setShowMessageLogs] = useState(false)
  const [showTextArea, setshowTextArea] = useState(false)
  
  useEffect(() => {
    axios.post(`http://localhost:7777/getusertousermessage`, { ReceiverName: JSON.parse(localStorage.user).Name })
      .then(res => {
        if (res.data.ReceiverName !== 'admin') {
          setUserMessage(res.data)
        }
      })

    axios.post(`http://localhost:7777/getadminmessagebyId`, { Id: props.messageId })
      .then(res => {
        setAdminMessage(res.data[0])
      })
  }, [])
  
  let showTestMsgBox = () => {
    setshowTextArea(!showTextArea) 
  }
  let showReply = () => {
    setShowMessageLogs(!showMessageLogs)
  }
  console.log('show case ===>', props.showCase)
  return (
    <div className="messagedetail">
      <Row className="message-mail">
        <Col md="2" className="left-sidebar">
       
      </Col> 
          { props.showCase == '1'?
        <Col md="10" className="message-deatil-inner">
          <div className="message-outer">
            <div className="conversation-mess ">
            <div className="detail-images">
                <span className="detail-images"><img src={require('../../images/head-659652_960_720.png')} /></span>
            </div>
            <div className="head-mess">
            <h3>Manoj </h3><span>2019-07-20</span>
            </div>
            <div className="summay-message">
                    <p>
                       hello
                    </p>
              </div>
              </div>
            <div className="conversation-mess receiver">
                <div className="detail-images">
                    <span className="detail-images"><img src={require('../../images/head-659652_960_720.png')} /></span>
                </div>
                <div className="head-mess">
                    <h3>Love </h3><span>2019-07-20</span>
                </div>
                <div className="summay-message">
                    <p>
                       their is no longer msg 
                    </p>
                </div>
                </div>
                </div>
           
            <div className="Reply-section">
                <button onClick={showTestMsgBox}><span><i class="fas fa-reply"></i></span>Reply</button>
            </div>
            {
          showTextArea ?  <div className="reply-detail-text">
          <textarea placeholder="input reply"></textarea>
          <button className="message-btn btn btn-secondary">Send</button>
      </div> : ''
        }
        </Col> 
        :<Fragment>{
          props.showCase == '0'?
          //<Col md="10" className='message-deatil-inner'>
          <div className='message-section'>
            <div className='detail-images'>
                <span className='detail-images'><img src={require('../../images/head-659652_960_720.png')} /></span>
            </div>
            <div className='head-mess'>
          <h3>Receiver </h3><span>2019-07-20</span>
          </div>
          <div className="summay-message">
          <p>
              Hello  Hello  Hello  Hello
              Hello  Hello  Hello  Hello
              
          </p>
        </div>
          </div>
         // </Col>
          
         :'sent messages'
        }</Fragment>}
      </Row>
    </div>
  )
}

export default MessageDetails
