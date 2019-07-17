import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Input, Table } from 'reactstrap'
import {  authRoutes } from '../../utils/Common'
import axios from 'axios'
import '../../styles/adminpanel1.css'
const AdminPanel1 = (props) => {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
  
    authRoutes(props)
    let user = JSON.parse(localStorage.getItem('user'))
    let { Type = '' } = user || {}

    if (Type !== 'admin') {
      props.history.push('/contact')
    }

    axios.get(`http://18.219.191.74:7777/getcontacts`)
      .then(res => {
        let { data = [] } = res
        console.log(data, 'data')
        setContacts(data.reverse())
      })
  }, [])

  console.log(contacts, 'CONTACTS')
  return (
    <Container>
      <Row>
        <Col>
          <div className='admin-panel'>
            <h1 className='heading'>Admin Panel</h1>
            <div className='admin-add-btn '>
              <button className='add-user-btn'><i class='fas fa-user-plus' />Add User</button>

              <button className='csv-btn'><i class='fas fa-user-plus hello' />Export CSV</button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='admin-panel-search-section'>
            <div className='edit-delete-btn'>
              <button className='edit'>Edit</button>
              <button className='delete'>Delete</button>
            </div>
            <div className='active-admin'>
              <span>All Subscription:267</span>
              <div />
              <span>Active 100</span>
              <div />
              <span>Inactive100</span>
            </div>
            <form className='admin-search'>
              <Input type='password' name='password' id='examplePassword' placeholder='Search' />
              <button type='submit'><i class='fas fa-search' /></button>
            </form>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th><Input type='checkbox' className='table-checkbox' /></th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Case No</th>
                <th>Date</th>
              </tr>
            </thead>
      </Row>  
            <Row> 
                 
            <tr>
              <td><Input type='checkbox' className='table-checkbox' /></td>
              <td className='name'><img src={require('../../images/nature.jpeg')} className='images' /><span>ABC</span></td>
              <td className='admin-data'>Kripalramola@gmail.com</td>
              <td className='admin-data'>xyzksldzjhxvo;s</td>
              <td className='admin-data'>openhsdxmbxv;ks</td>
              <td className='admin-data'>12345678</td>
              <td className='admin-data'>12|10|12</td>
            </tr>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
export default AdminPanel1
