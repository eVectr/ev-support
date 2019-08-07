import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Card, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import Document from './Documents'
import SelectAssign from './SelectAssign'
import Link from './Link'
import { Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import '../../styles/adminticket.css'

const options = [
  { value: 'Akash', label: 'Akash' },
  { value: 'Love', label: 'Love' },
  
]

const AdminTicket = (props) => {
  const [messageLogs, setMessageLogs] = useState([])
  const [contacts, setContacts] = useState([])
  const [reply, setReply] = useState('')
  const [selectedTab, setSelected] = useState(0)
  const [active, setActive] = useState('')
  const [loader, setLoader] = useState(true)
  let [showTextArea, setshowTextArea] = useState(false)
  let [Test, setTest] = useState(false)
  const [dropdownOpen, setdropdownOpen] = useState(false)
  const [showAdminPanel, setshowAdminPanel] = useState(false)
  const [SelectedStatus, setSelectedStatus] = useState('')
  const [SelectOptions, setSelectOptions] = useState([])
  const [assignTo, setAssignto] = useState('')
  
  const item = ['Open', 'Close', 'Active']
  const [activityLog, setActivityLog] = useState([])

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
        let findObj = item.find(itm => itm === res.data[0].Status)
        if (findObj) {
          setSelectedStatus(findObj)
        }

      })
      axios.post(`http://localhost:7788/findlogentry`,{Id:props.match.params.id})
      .then(res =>{
        setActivityLog(res.data.reverse())
      })
  }, [SelectedStatus, reply])

  let sendemail = () => {
    // axios.post(`http://localhost:7777/adminreply`, { ID: props.match.params.id, Message: reply })
    axios.post(`http://3.83.23.220:7788/adminreply`, { ID: props.match.params.id, Message: reply })
      .then(res => {
        // setContacts([res.data])
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
    if (selectedTab === 0 || selectedTab === 1 || selectedTab === 2) {
      return <Document contacts={contacts} />
    }
    else {
      return <Document />
    }
  }
  let showTestMsgBox = () => {
    setshowTextArea(true)
  }
  let showHideTestMsgBox = () => {
    setshowTextArea(!showTextArea)
    axios.post(`http://localhost:7788/logentry`,{Id:contacts[0].Case_No,
    log:'Ticket assigned to ' + assignTo }) 
  }

  let toggle = () => {
    setdropdownOpen(!dropdownOpen)
  }
  let Status = (e) => {
    setSelectedStatus(e.target.value)
    axios.post(`http://3.83.23.220:7788/updateStatus`, { Id:contacts[0]._id, changedStatus: e.target.value })
    .then(res => {
      axios.post(`http://localhost:7788/logentry`,{Id:contacts[0].Case_No,
      log:'Ticket Status Changed to ' + SelectedStatus })
      .then(res =>{
        axios.post(`http://localhost:7788/findlogentry`,{Id:props.match.params.id})
        .then(res =>{
          setActivityLog(res.data.reverse())
        })
      })
      })
  }
  let onAssignChange = (e) =>{
    setAssignto(e.value)
  }
 
  let backtopage = () => {
    props.history.push('/admin')
    //setshowAdminPanel(!showAdminPanel)
  }
  console.log('contacts  ==> ', contacts)
  
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
                   <div className="ticket-docs" onClick={() => backtopage()}>
                      <i class="fas fa-arrow-left"></i>
                   </div>
                  <div className='user-img'>
                    <img src={require('../../images/head-659652_960_720.png')} />
                    <span>{element.Name}</span>
                  </div>
                  <div className='user-data'>
                    <p><span className='email'>Case No:</span><span>{element.Case_No}</span></p>
                    <p><span className='email'>Type:</span><span>{element.Template}</span></p>
                    <p><span className='email'>Date:</span><span>{moment(element.date).format('lll')}</span></p>
                    <p><span className='email'>Transaction No:</span><span>{element.Transaction_Number == ""?'N/A':element.Transaction_Number}</span></p>
                    <p><span className='email'>Email:</span><span>{element.Email}</span></p>
                    {/* <p><span className='email'>Reason:</span><span>{element.Reason}</span></p> */}
                    <p><span className='email'>Status:</span><span>
                      <Input type="select" name="select" id="exampleSelect" className="btn-status" onChange={(e) => Status(e)} value={SelectedStatus}>
                        <option>Open</option>
                        <option>Close</option>
                        <option>Active</option>
                      </Input>
                    </span>
                    </p>
                  </div>
                  <div className='setting-tab-list'>
                    <ul>
                      <li className="assign-task" >
                        <span onClick={showTestMsgBox}>Assign to </span><span className="arrow-down"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                        {
                          showTextArea ?
                            <div>
                              <li>
                              <Select options={options} onChange={e => onAssignChange(e)} />
                              </li>
                              <button onClick={showHideTestMsgBox} className="list-save">Save</button>
                            </div>

                            : ''
                        }

                      </li>
                      <li className="assignee-task">
                        <div className="inner-assign">
                          <span><img src={require('../../images/head-659652_960_720.png')} /></span>
                          <span className="assign-name">Vijaya</span>
                        </div>
                      </li>

                    </ul>
                  </div>
                </Col>
              )
            })
          }
          <Col md='7' className='right-tab' >
            <Card className='show-card'>
              {renderTabs()}
            </Card>
            {/* --------------------------------------comment-section----------------------------------- */}

            
              <Col md='5' className='admin-chats-data'>
                <div className='comments'>
                  <p className='image-headings'>Comments</p>
                </div>
              </Col>
            {
              messageLogs.map((message, index) => {
              
                if (message.Type == 'user') {
                  return (
                    ''
                  )
                } else if (message.Type == 'admin') {
                  return (
                   
                      <Col md={{ size: 7, offset: 1 }}>
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
                   
                  )
                }
              })
            }
              <Col md={{ size: 7, offset: 1 }} className="comment-inner">
                <div className='text-area-field'>
                  <textarea className='textarea reply-msg' name='message' placeholder='Enter Message'
                    value={reply} onChange={(e) => onMessageChange(e)} />
                  <button className='reply-btn' onClick={sendemail}>Add Reply</button>
                </div>
              </Col>
          </Col>
          <Col md="2" className="activity-logs">

              <li className="logs-section">
                <li className="list-view">
                    <h6>Activity Logs</h6>
                      {activityLog.map(function(d, idx){
                      return (<li key={idx}>
                        {/* <span class="email">Status:</span> */}
                        <span>{d.Log}</span>
                        {/* <span>Ticket created</span> */}
                        <p className="ticket-assign">
                          <span>{moment(d.Date).format('lll')}</span>
                          
                        </p>
                        
                        {/* <p>Ticket status changed to active</p> */}
                        </li>)
                    })}
                </li>
              </li>
      </Col>
      
        </Row>
      }
    </Col>
  )
}
export default connect(state => state)(AdminTicket)
