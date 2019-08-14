import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Modal from 'react-responsive-modal'
import NoticePagination from './NoticePagination'
import { Col, Button, Row, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap'
import '../../styles/Userlist.css'



const UserList = props => {
  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }
  const [isActive, setIsActive] = useState(false)
  const [subAdmin, setSubAdmin] = useState([])
  const [activePage, setactivePage] = useState(1)
  useEffect(() => {
    axios.get(`http://54.165.185.4:7788/findagent`)
    //axios.get(`http://localhost:7788/findagent`)
      .then(res => {
        // console.log("res data ==>", data)
        setSubAdmin(res.data)
      })
  }, [])

  const data = [
    {
      "Firstname": "John",
      "Lastname": "Doe",
      "Email": "Johan@gmail.com",
      "TicketAssignTo": "Assigned To Standard"
    },
    {
      "Firstname": "Rohan",
      "Lastname": "Damndadasd",
      "Email": "Rohan@gmail.com",
      "TicketAssignTo": "Assigned To Mandatory Uploads"
    },
    {
      "Firstname": "Rohaniya",
      "Lastname": "Damniihs",
      "Email": "Rohanjdhk@gmail.com",
      "TicketAssignTo": "Assigned To Optional+Transaction Type"
    },
    {
      "Firstname": "damn",
      "Lastname": "damniya",
      "Email": "pankajjdhk@gmail.com",
      "TicketAssignTo": "Assigned To Assigned To Standard, Assigned To Mandatory Uploads, Optional+Transaction Type"
    },


  ];

  let handlePageChange = (pageNumber) => {
    setactivePage(pageNumber)
  }

  let adminListPagination = subAdmin.slice((activePage * 5) - 5, (activePage * 5))

  console.log("page no  =>", activePage)
  return (
    <div style={styles} className="userlist-show" >
      <Table>
        <thead>
          <tr>
            <th>First name </th>
            <th>Last name </th>
            <th>Email</th>
            <th>Assigned Ticket </th>
            <th></th>

          </tr>
        </thead>
        {adminListPagination.map(function (d, idx) {
          return (
            <tr key={idx}>{d.name}
              <td>{d.FirstName}</td>
              <td>{d.LastName}</td>
              <td>{d.Email}</td>
              <td>{d.Type}</td>
              <td className="edit-icons"> <i class="fas fa-edit"></i></td>




            </tr>)
        })}


      </Table>
      <Row>
        <Col>
          <NoticePagination totalItemsCount={subAdmin.length} handlePageChange ={handlePageChange}
          activePage={activePage}></NoticePagination>
        </Col>

      </Row>
    </div>
  )
}
export default UserList
