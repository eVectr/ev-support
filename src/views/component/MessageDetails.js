import React, { useEffect, useState } from 'react'
import '../../styles/MessageLogs.css'
import axios from 'axios'
import { Container, Row, Col, Table, Form,CardBody,UncontrolledCollapse,FormGroup, Label, Input, FormText, Button, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText } from 'reactstrap'
import ModalUi from './ModalUi'
const MessageDetails = (props) => {
  const [activeTab, setActiveTab] = useState('1')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [userMessage, setUserMessage] = useState([])
  const [testIndex, setTestIndex] = useState('')
  const [sendStatus, setSendStatus] = useState(false)
  const [messageStatus, setMessageStatus] = useState(false)
  const [open, setOpen] = useState(false)
  const [showReplyInput, setshowReplyInput] = useState(false)
  const [showTextArea, setshowTextArea] = useState(false)
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
    alert('test')
    // let findObj = userMessage.find(itm => itm.SenderId === id)
    // if (findObj.SenderId === id) {
    //   setTestIndex(id)
    //   setshowReplyInput(!showReplyInput) 
    // }

  }
  let showTestMsgBox = () => {
    setshowTextArea(!showTextArea)
    
  }
  return (
    <div>
      <Row className="message-mail">
        <Col md="2" className="left-sidebar">
       
      </Col>       
        <Col md="10" className="message-deatil-inner">
            <div className="message-section">
            <div className="detail-images">
                <span className="detail-images"><img src={require('../../images/head-659652_960_720.png')} /></span>
            </div>
            <div className="head-mess">
                <h3>Sender </h3>
                <p>7:00Pm <span>(29july)</span></p>
            </div>
            <div className="summay-message">
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div className="conversation-mess">
                <div className="detail-images">
                    <span className="detail-images"><img src={require('../../images/head-659652_960_720.png')} /></span>
                </div>
                <div className="head-mess">
                    <h3>Receiver </h3><span>2019-07-20</span>
                </div>
                <div className="summay-message">
                    <p>
                        Lorem Ipsum is simply dummy Lorem Ipsum  of Lorem Ipsum.
                    </p>
                </div>
                <div className="detail-images">
                    <span className="detail-images"><img src={require('../../images/head-659652_960_720.png')} /></span>
                </div>
                <div className="head-mess">
                    <h3>Receiver </h3><span>2019-07-28</span>
                </div>
                <div className="summay-message">
                    <p>
                      hello
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
      </Row>
    </div>
  )
}

export default MessageDetails
