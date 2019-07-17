import React, { useEffect, useState } from 'react'

import FlashMassage from 'react-flash-message'
import axios from 'axios'
import adminValidation from '../../utils/adminValidation'

import '../../styles/adminpanel.css'
import { filterArray, authRoutes } from '../../utils/Common'
import is from 'is_js'
import { Container, Row, Col, Input, Table } from 'reactstrap'
import '../../styles/adminpanel1.css'
import PaginationAdmin from '../component/Pagination'
import Pagination from 'reactstrap/lib/Pagination'

const AdminPanel = (props) => {
  const [contacts, setContacts] = useState([])
  const [caseNo, setCaseNo] = useState('')
  const [contact, setContact] = useState({})
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [show, setShow] = useState(false)
  const [start, setStart] = useState(0)
  const [limit, setLimit] = useState(5)
  const [emailStatus, setEmailStatus] = useState('')
  const [emailCheck, setEmailCheck] = useState(false)
  const [showFlashMsg, setShowFlashMsg] = useState(false)
  const [Errors, setErrors] = useState({})
  const [pageNumber, setPageNumber] = useState(1)
  const [pageArray, setPageArray] = useState([1,2,3,4,5])
  

  useEffect(() => {
    axios.get(`http://localhost:7777/getcontactslength`)
            .then(res => {
             console.log(res.length, 'contacts length')
           })
  }, [])

  useEffect(() => {
    console.log("inside page number  ===>", pageNumber)
    console.log("inside limit  ===>", limit)
    setLoader(true)
    authRoutes(props)
    let user = JSON.parse(localStorage.getItem('user'))
    let { Type = '' } = user || {}

    if (Type !== 'admin') {
      props.history.push('/contact')
    }

    axios.post(`http://localhost:7777/getcontactsbypage`, {Pagenumber:pageNumber, size:limit})
      .then(res => {
        let { data = [] } = res
        console.log("res ========>", res)
        console.log(data, 'data')
        setContacts(data)
        setLoader(false)
        setShow(true)
      })
  }, [pageNumber, limit])

  let handleSearchChange = e => {
    const { value } = e.target
    setCaseNo(value)
  }

  let onOpenModal = (CaseNo) => {
    axios.post(`http://18.219.191.74:7777/getbycaseno`, { caseNo: CaseNo })
      .then(res => {
        setContact(res.data[0])
      })
    setOpen(true)
  }

  let onCloseModal = () => {
    setOpen(false)
  }

  let clearEmailCheck = () => {
    setTimeout(function () { setEmailStatus('') }, 3000)
  }

  const handleMessageChange = e => {
    const { value } = e.target
    setMessage(value)
    setErrors({})
  }

  let sendMail = () => {
    const errors = adminValidation({ message })
    if (!is.empty(errors)) {
      setErrors(errors)
      return
    }
    setLoader(true)
    axios.post(`http://18.219.191.74:7777/sendmail`, { message: message, email: contact.Email })
      .then(res => {
        setLoader(false)
        setShowFlashMsg(true)
        if (res.status == 200) {
          setEmailCheck(true)
          setEmailStatus('Email sent successfully')
          clearEmailCheck()
        } else {
          setEmailCheck(true)
          setEmailStatus('Something went wrong')
          clearEmailCheck()
        }
      })
    setShowFlashMsg(false)
  }

  let nextPage = () => {
    setStart(limit)
  }

  let prevPage = () => {
    setStart(start - limit)
  }

  let Images = []
  if (contact.Image) {
    contact.Image.map(item => {
      let itemArr = item.split('/')
      Images.push(itemArr[1])
    })
  }

  let Documents = []
  if (contact.Document) {
    contact.Document.map(item => {
      let itemArr = item.split('/')
      Documents.push(itemArr[1])
    })
  }

  let showAdminTicket = () => {
    props.history.push('/admintickets')
  }


  let paginate = (number) => {
    setPageNumber(number)
  }
  const searchCases = filterArray(contacts, 'Case_No', caseNo)
  const filteredContacts = searchCases.slice(start, start + limit)

  let searchNumberOfRecords = (e) => {
    setLimit(e.target.value)
  }


  return (
  

    <Container>
      <Row>
        <Col>
          <div className='admin-panel'>
            <h1 className='heading'>Admin Panel</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='admin-panel-search-section'>
            <form className='admin-search'>
              <Input type='text' placeholder='Search Record' />
              <button type='submit'><i class='fas fa-search' /></button>
            </form>
            <form className='admin-search' >
              <Input type='number' onChange={(e) => searchNumberOfRecords(e)} placeholder='Search Record per page' />
            </form>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Case No</th>
                <th>Status</th>
                <th>Date</th>
                <th>Subject</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            {
              contacts.map(contact => {
                return (
                  <tr>
                    <td className='admin-data'>{contact.Case_No}</td>
                    <td className='admin-data'>{contact.Status}</td>
                    <td className='admin-data'>{contact.date}</td>
                    <td className='admin-data'>{contact.Subject}</td>
                    <td className='admin-data'>{contact.Template}</td>
                    <td className='admin-data '>
                      <div className='actions'>
                        <button className='open' onClick={showAdminTicket}>View</button>
                        <div />
                        <button className='active'>Assign</button>
                        <div />
                      </div>
                    </td>

                  </tr>
                )
              })
            }
          </Table>
          <Row>
            <Col>
              <PaginationAdmin  paginate={paginate} nextPage={nextPage} pageArray={pageArray} pageNumber = {pageNumber}/>
            </Col>
          </Row>

        </Col>
      </Row>
    </Container>
  )
}
export default AdminPanel
