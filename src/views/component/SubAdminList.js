import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Select from 'react-select'
import Modal from 'react-responsive-modal'
import NoticePagination from './NoticePagination'
import { Col, Button, Row, Form, FormGroup, Label, Input, FormText, Table,Container } from 'reactstrap'
import '../../styles/Userlist.css'
import AgentModal from './AgentModal/AgentModal';
import { subAdminDetail } from '../../redux/actions/SubAdminDetail/SubAdminDetails';





const UserList = props => {
  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }
  const [isActive, setIsActive] = useState(false)
  const [subAdmin, setSubAdmin] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [activePage, setactivePage] = useState(1)
  const [AgentOpen, setAgentOpen] = useState(false)
   const [showLoader, setshowLoader] = useState(true)
  useEffect(() => {
    axios.get(`https://ev2.softuvo.xyz/findagent`)
    // axios.get(`http://localhost:7788/findagent`)
      .then(res => {
        setshowLoader(false)
         setSubAdmin(res.data)
      })
      let user = JSON.parse(localStorage.getItem('user'))
      if (localStorage.length < 1) {
        props.history.push('/')
      }else{
      
      }
     
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
 
  let fetchadmin = () =>{
    axios.get(`https://ev2.softuvo.xyz/findagent`)
    // axios.get(`http://localhost:7788/findagent`)
      .then(res => {
       
         setSubAdmin(res.data)
      })
  }

  let editAdmin = (selectedItem) =>{
    setSelectedItem(selectedItem)
    setAgentOpen(!AgentOpen)
    // let data = {
    //   id:id,
    //   first_name:firstname,
    //   last_name:lastname,
    //   email:email,
    //   password:Password
    // }
    // props.dispatch(subAdminDetail(data))
    // console.log("id ==>", id)
    // console.log("firstname ==>", firstname)
    // console.log(" lastname ==>", lastname)
    // console.log(" email ==>", email)
  }
  let user = JSON.parse(localStorage.getItem('user'))
  if(!user){
    return null
  } else if(user.Type == 'user'){
    props.history.push('/contact')
  }
  return (
    <Container style={styles} className="userlist-show" >
       <div className="agent-modal-admin">
        <Col>
            <AgentModal selectedItem = {selectedItem} editAdmin={editAdmin} fetchadmin={fetchadmin} className="sent-modal" open={AgentOpen} onAgentCloseModal={() => setAgentOpen(!AgentOpen)}></AgentModal>
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
              <td>{d.Type.length < 1? 'Not Assigned':
                <Fragment>
                 {d.Type.map((type, index)=>{
                  let Type = type.label
                  console.log("Type ===", Type)
                  return(
                    <div className="type-subadmin">
                       {Type}
                    </div>
                    
                  )
                })}
                </Fragment>
              }</td>
             
              <td className="edit-icons"> <i class="fas fa-edit" onClick={() => editAdmin(d)}></i></td>
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
export default connect(
  state => ({
    dispatch: state.dispatch
  })
)(UserList)
