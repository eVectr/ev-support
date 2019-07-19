import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Input, Table } from 'reactstrap'
import { connect } from 'react-redux'
import is from 'is_js'
import Moment from 'react-moment'
import FlashMassage from 'react-flash-message'
import axios from 'axios'
import AdminModal from './AdminModal'
import Modal from "react-responsive-modal"
import '../../styles/adminpanel.css'
import {filterArray, authRoutes} from '../../utils/Common'
import Navbar from './Navbar'
import { longStackSupport } from 'q';
import {  CaseNo } from '../../redux/actions/notification/notification'
import PaginationAdmin from '../component/Pagination'
import adminValidation from '../../utils/adminValidation'
import '../../styles/adminpanel1.css'

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
  const [totalContact, setTotalContact] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [filterCase, setFilterCase] = useState({ name: '', value: '' })

  useEffect(() => {
    axios.get(`http://localhost:7777/getcontactslength`)
      .then(res => {
        setTotalContact(res.data.length)
      })
  }, [])

  useEffect(() => {
    
    authRoutes(props)
    let user = JSON.parse(localStorage.getItem('user'))
    let { Type = '' } = user || {}
    if (Type !== 'admin') {
      props.history.push('/contact')
    }
    setLoader(true)
    axios.post(`http://localhost:7777/getcontactsbypage`, { Pagenumber: pageNumber, size: limit })
      .then(res => {
        let { data = [] } = res
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

  let showAdminTicket = (caseNo) => {
    props.history.push('/adminticket/' + caseNo)
  }

  let paginate = (number) => {
    setPageNumber(number)
    setIsActive(true)
    setContacts([])
  }

  let searchNumberOfRecords = (e) => {
    if (e.target.value > 0 && e.target.value < 31) {
      setLimit(e.target.value)
    }
  }

  let setfilterType = (e) => {
    console.log(e, 'event')
    let filterArrayData = e.target.value
    console.log(filterArrayData, 'filterarraydata')
    let splitFilterArrayData = filterArrayData.split(',')
    axios.post(`http://localhost:7777/getcontactsbyfilter`, { filterName: splitFilterArrayData[1], filterValue: splitFilterArrayData[0], Pagenumber: pageNumber, size: limit })
      .then(res => {
        let { data = {} } = res
        setContacts(data)
        setLoader(false)
        setShow(true)
      })
  }

  let getDataByFilter = (e) => {
    axios.post(`http://localhost:7777/getcontactsbysort`, { sortName: e.target.value, Pagenumber: pageNumber, size: limit })
      .then(res => {
        let { data = {} } = res
        setContacts(data)
        setLoader(false)
        setShow(true)
      })
  }

  // let showAdminTicket = (caseNo) => {
  //   props.history.push('/adminticket/' + caseNo)
  // }
  
  let totalPages = Math.ceil(totalContact / limit)
  return (
    <Container className='containers'>
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
            {/* <form className='admin-search'>
              <Input type='text' placeholder='Search Record' />
              <button type='submit'>
                <i class='fas fa-search' />
              </button>

            </form> */}
            <div className='searching'>
              <div className='custom-select' >
                <select onChange={(e) => setfilterType(e)}>
                  <option value='Filter by'>Filter By</option>
                  <option value='Open,Status'> Open Status</option>
                  <option value='Active,Status'> Active Status</option>
                  <option value='Closed,Status'> Closed Status</option>
                  <option value='Standard,Type'>Standard Type</option>
                  <option value='Mandatory Uploads,Type'>Optional Type</option>
                  <option value='Optional Uploads + Transaction Number, Type'>Optional+Transaction Type</option>
                 
                </select>
              </div>

              <div className='custom-select'>

                <select onChange={(e) => getDataByFilter(e)}>
                  <option value='Filter by'>Sort By</option>
                  <option value='CaseNo'>CaseNumber</option>
                  <option value='Date'>Date</option>
                </select>
              </div>
            </div>

            <form className='admin-search'>
              <Input
                type='number'
                onChange={e => searchNumberOfRecords(e)}
                placeholder='Search Record per page'
              />
            </form>
          </div>
        </Col>
      </Row>

      { loader
        ? <Row>
          <Col>
            <div className='loader-img'>
              <img src={require('../../images/loader.gif')} />
            </div>
          </Col>
        </Row> : '' }

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
                <th>Assign To</th>
                <th>Actions</th>
              </tr>
            </thead>
            {contacts.map(contact => {
              return (
                <tr>
                  <td className='admin-data'>{contact.Case_No}</td>
                  <td className={`${(contact.Status === 'Open' ? 'open' : contact.Status === 'Active'
                    ? 'active' : 'closed')}`}>
                    {contact.Status}</td>
                  <td className='admin-data'>{contact.date.split('T')[0]}</td>
                  <td className='admin-data'>{contact.Subject}</td>
                  <td className='admin-data'>{contact.Template}</td>
                  <td className='admin-data'>Not Assign</td>
                  <td className='admin-data '>
                    <div className='actions'>
                      <button className='view' onClick={() => showAdminTicket(contact.Case_No)}>
                        View
                      </button>
                      <div />
                      <button className='assign'>Assign</button>
                      <div />
                    </div>
                  </td>
                </tr>
              )
            })}
          </Table>
          {
            show ? <Row>
              <Col>
                <PaginationAdmin
                  paginate={paginate}
                  nextPage={nextPage}
                  pageNumber={pageNumber}
                  totalPages={totalPages}
                  isActive={isActive}
                />
              </Col>
            </Row> : ''
          }
        </Col>
      </Row>
    </Container>
  )
}

export default connect(state => state)(AdminPanel)
