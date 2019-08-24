import React, { useEffect, useState, Fragment } from 'react'
import {Row, Col, Input, Table,Button } from 'reactstrap'
import { connect } from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import { filterArray, authRoutes } from '../../utils/Common'
import adminValidation from '../../utils/adminValidation'
import PaginationAdmin from '../component/Pagination'
import NoticePagination from './NoticePagination'
import is from 'is_js'
import '../../styles/adminpanel.css'
import ModalUi from './ModalUi'
import AgentModal from './AgentModal/AgentModal';
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
  const [activePage, setactivePage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [emailStatus, setEmailStatus] = useState('')
  const [emailCheck, setEmailCheck] = useState(false)
  const [showFlashMsg, setShowFlashMsg] = useState(false)
  const [Errors, setErrors] = useState({})
  const [pageNumber, setPageNumber] = useState(1)
  const [totalContact, setTotalContact] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isSortBySelected, setisSortBySelected] = useState(false)
  const [isFilterBySelected, setisFilterBySelected] = useState(false)
  const [filterCase, setFilterCase] = useState({ name: '', value: '' })
  const [filterName, setFilterName] = useState('')
  const [sortData, setSortData] = useState('')
  const [test, setTest] = useState([])
  const [AgentOpen, setAgentOpen] = useState(false)
  const [showLoader, setshowLoader] = useState(true)
  const [filterData1, setFilterData1] = useState({
    filterValue: '',
    filterName: ''
  })
  const [msg, setShowMsg] = useState('')
  const [showTextArea, setshowTextArea] = useState(false)

  //var socket = io.connect('http://localhost:7777')

  useEffect(() => {
    setLoader(true)

    if (JSON.parse(localStorage.user).Type == 'subadmin') {
        //axios.post(`http://localhost:7788/findsubadmincontact`, {Type :JSON.parse(localStorage.user).TicketType})
        axios.post(`https://ev2.softuvo.xyz/findsubadmincontact`, {Type :JSON.parse(localStorage.user).TicketType})
       
       .then(res => {
         setContacts(res.data)
         setTotalContact(res.data.length)
         setLoader(false)
       })
    } else {
      // axios.get(`http://localhost:7788/findcontact`)
      axios.get(`https://ev2.softuvo.xyz/findcontact`)
        .then(res => {
          setContacts(res.data)
          setTotalContact(res.data.length)
          setLoader(false)
        })
    }

  }, [])

  useEffect(() => {
  //   authRoutes(props)
  //   setLoader(true)
  //   if (!isFilterBySelected && !isSortBySelected) {
  //     //axios.post(`http://localhost:7788/getcontactsbypage`, { Pagenumber: pageNumber, size: limit })
  //       axios.post(`https://ev2.softuvo.xyz/getcontactsbypage`, { Pagenumber: pageNumber, size: limit })
  //     .then(res => {
  //         let { data = [] } = res
  //         setContacts(data)
  //         setLoader(false)
  //         setShow(true)
  //       })
  //   }
  //   else if (isFilterBySelected && isSortBySelected) {

  // // axios.post(`http://localhost:7788/getcontactsbyfilter&sort`, { filterName: filterData1.filterName, filterValue: filterData1.filterValue, sortName: sortData, Pagenumber: pageNumber, size: limit })
  //    axios.post(`https://ev2.softuvo.xyz/getcontactsbyfilter&sort`, { filterName: filterData1.filterName, filterValue: filterData1.filterValue, sortName: sortData, Pagenumber: pageNumber, size: limit }) 
  //   .then(res => {
  //         let { data = {} } = res
  //         setContacts(data.data)
  //         setLoader(false)
  //         setShow(true)
  //       })

  //   } else if (isFilterBySelected) {
  //   // axios.post(`http://localhost:7788/getcontactsbyfilter`, { filterName: filterData1.filterName, filterValue: filterData1.filterValue, Pagenumber: pageNumber, size: limit })
  //      axios.post(`https://ev2.softuvo.xyz/getcontactsbyfilter`, { filterName: filterData1.filterName, filterValue: filterData1.filterValue, Pagenumber: pageNumber, size: limit })
  //     .then(res => {
  //         let { data = {} } = res
  //         setContacts(data)
  //         setLoader(false)
  //         setShow(true)
  //       })
  //   }
  //   else if (isSortBySelected) {
  //    // axios.post(`http://localhost:7788/getcontactsbysort`, { sortName: sortData, Pagenumber: pageNumber, size: limit })
  //      axios.post(`https://ev2.softuvo.xyz/getcontactsbysort`, { sortName: sortData, Pagenumber: pageNumber, size: limit })
  //     .then(res => {
  //         let { data = {} } = res
  //         setContacts(data.data)
  //         setLoader(false)
  //         setShow(true)
  //       })
  //   }
  }, [pageNumber, limit])

  let paginationContact = contacts.slice((activePage * limit) - limit, (activePage * limit))

  let handleSearchChange = (e) => {
    setCaseNo(e.target.value)
    // const searchedProduct = filterArray(contacts, 'Case_No', caseNo)
    // setContacts(searchedProduct)
  }

  let onCloseModal = () => {
    setOpen(false)
  }
  

  let clearEmailCheck = () => {
    setTimeout(function () { setEmailStatus('') }, 3000)
  }
  let handlePageChange = (pageNumber) => {
    setactivePage(pageNumber)
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
  //  axios.post(`http://localhost:7788/sendmail`, { message: message, email: contact.Email })
     axios.post(`https://ev2.softuvo.xyz/sendmail`, { message: message, email: contact.Email })
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

  let showSubAdminList = () => {
    props.history.push('/subAdminList')
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
    if(e.target.value == ''){
      setLimit(5)
    }
  }
  useEffect(() => { 
    if (isFilterBySelected && !isSortBySelected) {
      if(JSON.parse(localStorage.user).Type == 'subadmin') {
        if (filterData1.filterValue == 'null') {
  
          //axios.post(`http://localhost:7788/findsubadmincontact`, {Type :JSON.parse(localStorage.user).TicketType})
          axios.post(`https://ev2.softuvo.xyz/findsubadmincontact`, {Type :JSON.parse(localStorage.user).TicketType})
          .then(res => {
              setContacts(res.data)
              setTotalContact(res.data.length)
              setLoader(false)
            })
        }
        else{
           //axios.post(`http://localhost:7788/getsubadmincontactsbyfilter`, {Type :JSON.parse(localStorage.user).TicketType, filterName: filterData1.filterName, filterValue: filterData1.filterValue, Pagenumber: pageNumber, size: limit })
          axios.post(`https://ev2.softuvo.xyz/getsubadmincontactsbyfilter`, {Type :JSON.parse(localStorage.user).TicketType, filterName: filterData1.filterName, filterValue: filterData1.filterValue, Pagenumber: pageNumber, size: limit })
         .then(res => {
             let { data = {} } = res
             console.log("dataaaaaa= >", data)
             setContacts(data)
             setLoader(false)
             setShow(true)
           })
        }
      }
      else{
        if (filterData1.filterValue == 'null') {
          // axios.get(`http://localhost:7788/findcontact`)
          axios.get(`https://ev2.softuvo.xyz/findcontact`)
            .then(res => {
              setContacts(res.data)
              setTotalContact(res.data.length)
              setLoader(false)
            })
        }
        else{
          // axios.post(`http://localhost:7788/getcontactsbyfilter`, { filterName: filterData1.filterName, filterValue: filterData1.filterValue, Pagenumber: pageNumber, size: limit })
         axios.post(`https://ev2.softuvo.xyz/getcontactsbyfilter`, { filterName: filterData1.filterName, filterValue: filterData1.filterValue, Pagenumber: pageNumber, size: limit })
         .then(res => {
             let { data = {} } = res
             setContacts(data)
             setLoader(false)
             setShow(true)
           })
        }
      }
    
    }
  }, [filterData1.filterValue])

  useEffect(() => {

    if (isSortBySelected && !isFilterBySelected) {
      if(JSON.parse(localStorage.user).Type == 'subadmin') {
         // axios.post(`http://localhost:7788/getsubadmincontactsbysort`, {Type:JSON.parse(localStorage.user).TicketType, sortName: sortData, Pagenumber: pageNumber, size: limit })
          axios.post(`https://ev2.softuvo.xyz/getsubadmincontactsbysort`, {Type:JSON.parse(localStorage.user).TicketType, sortName: sortData, Pagenumber: pageNumber, size: limit })
       .then(res => {
           let { data = {} } = res
           setContacts(data.data)
          setLoader(false)
           setShow(true)
         })
      }else{
        // axios.post(`http://localhost:7788/getcontactsbysort`, { sortName: sortData, Pagenumber: pageNumber, size: limit })
       axios.post(`https://ev2.softuvo.xyz/getcontactsbysort`, { sortName: sortData, Pagenumber: pageNumber, size: limit })
       .then(res => {
           let { data = {} } = res
           setContacts(data.data)
          setLoader(false)
           setShow(true)
         })
      }
    }
  }, [sortData])

  useEffect(() => {
  
    if (isSortBySelected && isFilterBySelected) {
      setLoader(false)
      if(JSON.parse(localStorage.user).Type == 'subadmin') {
        if(filterData1.filterValue == 'null'){
        
          // axios.post(`http://localhost:7788/getsubadmincontactsbyfilter&sort`, {Type:JSON.parse(localStorage.user).TicketType, sortName: sortData, Pagenumber: pageNumber, size: limit })
           axios.post(`https://ev2.softuvo.xyz/getsubadmincontactsbyfilter&sort`, {Type:JSON.parse(localStorage.user).TicketType, sortName: sortData, Pagenumber: pageNumber, size: limit })
          
          .then(res => {
           setLoader(false)
              let { data = {} } = res
              setContacts(data.data)
              setShow(true)
            })
         }else{
          //  axios.post(`http://localhost:7788/getsubadmincontactsbyfilter&sort`, { filterName: filterData1.filterName, 
          //  Type:JSON.parse(localStorage.user).TicketType,filterValue: filterData1.filterValue, sortName: sortData, Pagenumber: pageNumber, size: limit })
          axios.post(`https://ev2.softuvo.xyz/getsubadmincontactsbyfilter&sort`, { filterName: filterData1.filterName, 
          Type:JSON.parse(localStorage.user).TicketType,filterValue: filterData1.filterValue, sortName: sortData, Pagenumber: pageNumber, size: limit })
          .then(res => {
              let { data = {} } = res
              setContacts(data.data)
             
              setShow(true)
            })
         }
      }
      else{
        if(filterData1.filterValue == 'null'){
        
          // axios.post(`http://localhost:7788/getcontactsbysort`, { sortName: sortData, Pagenumber: pageNumber, size: limit })
           axios.post(`https://ev2.softuvo.xyz/getcontactsbysort`, { sortName: sortData, Pagenumber: pageNumber, size: limit })
          .then(res => {
           setLoader(false)
              let { data = {} } = res
              setContacts(data.data)
              setShow(true)
            })
         }else{
          // axios.post(`http://localhost:7788/getcontactsbyfilter&sort`, { filterName: filterData1.filterName, 
           //filterValue: filterData1.filterValue, sortName: sortData, Pagenumber: pageNumber, size: limit })
           axios.post(`https://ev2.softuvo.xyz/getcontactsbyfilter&sort`, { filterName: filterData1.filterName, filterValue: filterData1.filterValue, sortName: sortData, Pagenumber: pageNumber, size: limit })
          .then(res => {
              let { data = {} } = res
              setContacts(data.data)
             
              setShow(true)
            })
         }
      }
    }
  }, [sortData, filterData1.filterValue])

  async function setfilterType (e) {

    if(e.target.value == 'Status, Open' && !isSortBySelected){
      setisSortBySelected(false)
      //axios.get(`http://localhost:7788/findcontact`)
     axios.get(`https://ev2.softuvo.xyz/findcontact`)
      .then(res => {
        setContacts(res.data)
        setTotalContact(res.data.length)
       
      })
    }else{
      setisFilterBySelected(true)
      setLoader(true)
      let filterArrayData = e.target.value
      let splitFilterArrayData = filterArrayData.split(',')
      return (
        setFilterData1({
          filterName: splitFilterArrayData[1],
          filterValue: splitFilterArrayData[0]
        })
      )
    }
}

  async function getDataByFilter (e) {
   
    if(e.target.value == 'Status,Open' && !isFilterBySelected){
      setisFilterBySelected(false)
      setLoader(true)
      //axios.get(`http://localhost:7788/findcontact`)
      axios.get(`https://ev2.softuvo.xyz/findcontact`)
        .then(res => {
          setContacts(res.data)
          setTotalContact(res.data.length)
        })
    }else{
      setisSortBySelected(true)
      setLoader(true)
      return (
        setSortData(e.target.value)
      )
    }
  }
  let showTestMsgBox = () => {
    setshowTextArea(!showTextArea)
    
  }
  let sendMessage = () => {
    setOpen(true)
  }
  let AgentUserMessage = () => {
    setAgentOpen(true)
  }
  let closeModal = () => {
    setOpen(false)
  }
  let onAgentCloseModal = () =>{
    setAgentOpen(false)
  }
 
  let totalPages = Math.ceil(totalContact / limit)
  let searchedResult = filterArray(contacts, 'Case_No', caseNo)

  let user = JSON.parse(localStorage.getItem('user'))
  if(!user){
    return null
  } else if(user.Type == 'user'){
    props.history.push('/contact')
  }
 
  const searchedProduct = filterArray(paginationContact, 'Case_No', caseNo)
  // console.log('local storage =>', JSON.parse(localStorage.user).Type)
  // console.log('local storage =>', JSON.parse(localStorage.user).TicketType)
 
  console.log("contacts ==>", contacts)
  return (
    <div className="containers">
      <div className="inner-containers">
      <Row>
        <Col>
          <div className='admin-panel'>
            <h1 className='heading'>Admin Panel</h1>
          </div>
          <div className="msg-btn">
            <ModalUi open = {open} closeModal={closeModal} className="sent-modal"></ModalUi>
            <Button onClick={sendMessage} className="sendmessage-btn">Send Message to Users</Button>
        </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='admin-panel-search-section'>
            <div className='searching'>
              <div className='select-option'>
                <select onChange={(e) => setfilterType(e)}>
                  <option value='null,Status'>Filter By</option>
                  <option value='Open,Status'> Open Status</option>
                  <option value='Active,Status'> Active Status</option>
                  <option value='Closed,Status'> Closed Status</option>
                  <option value='Standard,Template'>Standard</option>
                  <option value='Mandatory Uploads,Template'>Mandatory Uploads</option>
                  <option value='Optional Uploads + Transaction Number,Template'>Optional+Transaction</option>
                      
                </select>
                
              </div>
              <div>
                <select onChange={(e) => getDataByFilter(e)}>
                  <option value='Filter, by'>Sort By</option>
                  <option value='Case_No'>CaseNumber</option>
                  <option value='date'>Date</option>
                </select>
              </div>
            </div>
            <div>
              <form className='admin-search'>
                <Input
                  type='number'
                  onChange={e => searchNumberOfRecords(e)}
                  placeholder='Record per page'
                />
              </form>
              <form className='admin-search'>
                <Input type='text' placeholder='Search By CaseNo' onChange={(e) => handleSearchChange(e)} />
                {/* <button type='submit'>
                  <i class='fas fa-search' />
                </button> */}
              </form>
            </div>
          </div>
        </Col>
      </Row>
      {/* <Row className="agent-modal-admin">
      <Col>
          <AgentModal className="sent-modal" open = {AgentOpen} onAgentCloseModal={onAgentCloseModal}></AgentModal>
          <Button onClick={AgentUserMessage}> <i class="fas fa-user-plus"></i></Button>
      </Col>
      </Row> */}
      {loader
        ? <Row>
          <Col>
            <div className='loader-img'>
              <img src={require('../../images/loader.gif')} />
            </div>
          </Col>
        </Row> : ''}
      <Row className="sendTextarea">
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
                <th>Assign To</th>
                <th>Actions</th>
              </tr>
            </thead>
            {searchedProduct.map(contact => {
              return (
                <tr>
                  <td className='admin-data'>{contact.Case_No}</td>
                  <td className={`${(contact.Status === 'Open' ? 'open' : contact.Status === 'Active'
                    ? 'active' : 'closed')}`}>
                    {contact.Status}</td>
                  <td className='admin-data'>{moment(contact.date).format('lll')}</td>
                  <td className='admin-data'>{contact.Subject}</td>
                  <td className='admin-data'>{contact.Template}</td>
                  <td className='admin-data'>{contact.AssignTo.length < 1? 'Not Assigned' : 'Sub Admin'}</td>
                  <td className='admin-data '>
                    <div className='actions'>
                      <button className='view' onClick={() => showAdminTicket(contact.Case_No)}>
                        View
                      </button>
                     
                    </div>
                  </td>
                </tr>
              )
            })}
          </Table>
          {/* {
            show ? <Row>
              <Col className="admin-pagination">
              <NoticePagination totalItemsCount={totalContact} handlePageChange ={handlePageChange}
              activePage={activePage}></NoticePagination>
              </Col>
            </Row> : ''
          } */}
          <Row>
              <Col className="admin-pagination">
              <NoticePagination totalItemsCount={totalContact} handlePageChange ={handlePageChange}
              activePage={activePage}></NoticePagination>
              </Col>
            </Row>
        </Col>
      </Row>
      </div>
    </div>
  )
}

export default connect(state => state)(AdminPanel)
