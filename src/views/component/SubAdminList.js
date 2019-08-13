import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Modal from 'react-responsive-modal'
import PaginationAdmin from './Pagination'
import { Col, Button, Row, Form, FormGroup, Label, Input, FormText, Table  } from 'reactstrap'
import '../../styles/Userlist.css'
const UserList = props => {
  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }
  const [isActive, setIsActive] = useState(false)
  const [subAdmin, setSubAdmin] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [showLoader, setshowLoader] = useState(true)
  useEffect(() => {
    axios.get(`http://localhost:7788/findagent`)
      .then(res => {
        setSubAdmin(res.data)
      })
      setshowLoader(false) 
  }, [])
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
              <Fragment>
                {showLoader ?
                    <div className='loader-img'>
                      <img src={require('../../images/loader.gif')} />
                    </div> :
              <tbody>
                {subAdmin.map(function(d, idx){
                  return (
                      <tr key={idx}>{d.name}
                        <td>{d.FirstName}</td>
                        <td>{d.LastName}</td>
                        <td>{d.Email}</td>
                        <td>{d.Type}<i class="fas fa-edit"></i></td>
                      </tr>)
                      })}
               </tbody>
               }
               </Fragment>
            </Table>
                  
            
            <Row>
                <Col>
                    <PaginationAdmin/>
                </Col>
            </Row>
        </div>
  )
}
export default UserList
