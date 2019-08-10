import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Modal from 'react-responsive-modal'
import PaginationAdmin from '../component/Pagination'
import { Col, Button, Row, Form, FormGroup, Label, Input, FormText, Table  } from 'reactstrap'
import '../../styles/Userlist.css'



const UserList = props => {
  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }
  const [isActive, setIsActive] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const data =[
      {
       "Firstname":"John",
       "Lastname":"Doe",
       "Email": "Johan@gmail.com",
       "TicketAssignTo" : "Assigned To Standard"
    },
    {
        "Firstname":"Rohan",
        "Lastname":"Damndadasd",
        "Email": "Rohan@gmail.com",
        "TicketAssignTo" : "Assigned To Mandatory Uploads"
    },
    {
        "Firstname":"Rohaniya",
        "Lastname":"Damniihs",
        "Email": "Rohanjdhk@gmail.com",
        "TicketAssignTo" : "Assigned To Optional+Transaction Type"
    },
    {
        "Firstname":"damn",
        "Lastname":"damniya",
        "Email": "pankajjdhk@gmail.com",
        "TicketAssignTo" : "Assigned To Assigned To Standard, Assigned To Mandatory Uploads, Optional+Transaction Type"
    },
   
    
    ];
   
  return (
    <div style={styles} className="userlist-show" >
         <Table>
            <thead>
              <tr>
                <th>First name </th>
                <th>Last name </th>
                <th>Email</th>
                <th>Ticket Assign To </th>
                <th></th>
              
              </tr>
            </thead>
            {data.map(function(d, idx){
         return (
            <tr key={idx}>{d.name}
            <td>{d.Firstname}</td>
            <td>{d.Lastname}</td>
            <td>{d.Email}</td>
            <td>{d.TicketAssignTo}</td>
            <td className="edit-icons"> <i class="fas fa-edit"></i></td>

            
            
            
            </tr>)
       })}
           

            </Table>
            <Row>
            <Col>
                <PaginationAdmin
                 

                />
              </Col>

            </Row>
    </div>
  )
}
export default UserList
