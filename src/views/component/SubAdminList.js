import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Modal from 'react-responsive-modal'
import NoticePagination from './NoticePagination'
import { Col, Button, Row, Form, FormGroup, Label, Input, FormText, Table,Container } from 'reactstrap'
import '../../styles/Userlist.css'
import AgentModal from './AgentModal/AgentModal';





const UserList = props => {
  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }
  const [isActive, setIsActive] = useState(false)
  const [subAdmin, setSubAdmin] = useState([])
  const [activePage, setactivePage] = useState(1)
  const [AgentOpen, setAgentOpen] = useState(false)
   const [showLoader, setshowLoader] = useState(true)
  useEffect(() => {
    axios.get(`http://54.165.185.4:7788/findagent`)
    // axios.get(`http://localhost:7788/findagent`)
      .then(res => {
        setshowLoader(false)
         setSubAdmin(res.data)
      })
     
  }, [])



  let handlePageChange = (pageNumber) => {
    setactivePage(pageNumber)
  }

  let adminListPagination = subAdmin.slice((activePage * 5) - 5, (activePage * 5))

  let AgentUserMessage = () => {
    setAgentOpen(true)
  }
 
  let onAgentCloseModal = () =>{
    setAgentOpen(false)
  } 
 

  return (
    <Container style={styles} className="userlist-show" >
       <div className="agent-modal-admin">
        <Col>
            <AgentModal className="sent-modal" open={AgentOpen} onAgentCloseModal={() => setAgentOpen(!AgentOpen)}></AgentModal>
            <Button onClick={() => setAgentOpen(!AgentOpen)}> <i class="fas fa-user-plus"></i></Button>
        </Col>
      </div>
      <Row>
      {showLoader
        ? <Row>
          <Col>
            <div className='loader-img'>
              <img src={require('../../images/loader.gif')} />
            </div>
          </Col>
        </Row> : ''}
       

        <Col className="subadmin-table">
        <Table>
        <thead>
          <tr>
            <th className="head-text">First name </th>
            <th className="head-text">Last name </th>
            <th className="head-text">Email</th>
            <th className="head-text">Assigned Ticket </th>
            <th></th>

          </tr>
        </thead>
        {adminListPagination.map(function (d, idx) {
          return (
            <tr key={idx}>{d.name}
              <td>{d.FirstName}</td>
              <td>{d.LastName}</td>
              <td>{d.Email}</td>
              {d.Type.map((type, index)=>{
                let Type = type.label
                console.log("Type ===", Type)
                return(
                  <td className="type-subadmin">
                     {Type}
                  </td>
                  
                )
              })}
              <td className="edit-icons"> <i class="fas fa-edit" onClick={() => setAgentOpen(!AgentOpen)}></i></td>
            </tr>)
        })}


      </Table>
        </Col>
        
      </Row>
     
      <Row>
        <Col>
          <NoticePagination totalItemsCount={subAdmin.length} handlePageChange ={handlePageChange}
          activePage={activePage}></NoticePagination>
        </Col>

      </Row>
    </Container>
  )
}
export default UserList
