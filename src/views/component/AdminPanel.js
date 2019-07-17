import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import FlashMassage from 'react-flash-message'
import axios from 'axios'
import adminValidation from '../../utils/adminValidation'
import Modal from 'react-responsive-modal'
import '../../styles/adminpanel.css'
import { filterArray, authRoutes } from '../../utils/Common'
import is from 'is_js'
import { Container, Row, Col, Input, Table } from 'reactstrap'
import '../../styles/adminpanel1.css'
import PaginationAdmin from '../component/Pagination'

const AdminPanel = (props) => {
  const [contacts, setContacts] = useState([])
  const [caseNo, setCaseNo] = useState('')
  const [contact, setContact] = useState({})
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [show, setShow] = useState(false)
  const [start, setStart] = useState(0)
  const [limit] = useState(5)
  const [emailStatus, setEmailStatus] = useState('')
  const [emailCheck, setEmailCheck] = useState(false)
  const [showFlashMsg, setShowFlashMsg] = useState(false)
  const [Errors, setErrors] = useState({})

  useEffect(() => {
    setLoader(true)
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
        setLoader(false)
        setShow(true)
      })
  }, [])

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
    setStart(start + limit)
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

  let totalPages = Math.ceil((contacts.length) / limit)
  let record = contacts.slice(start, start + limit)

  const searchCases = filterArray(contacts, 'Case_No', caseNo)
  const filteredContacts = searchCases.slice(start, start + limit)
  console.log(contacts, 'contacts')
  console.log(contacts.length, 'contacts length')
  return (
  // <div className='container '>

  //   <div className='row'>
  //     <div>
  //       <div className='admin-panel'>
  //         <h3 className='admin-header'>Admin Panel</h3>
  //         <div className='search-cases'>
  //           <input type='text' placeholder='Search by Case No.....' className='link-data search' onChange={handleSearchChange} />
  //         </div>
  //       </div>
  //       {
  //         loader ? <div className='admin-panel-loader'>
  //           <img src={require('../../images/loader.gif')} />
  //         </div> : ''
  //       }
  //     </div>
  //     {searchCases.length
  //       ? filteredContacts.map(
  //         (contact, _index) =>
  //           <div className='card admin-card' key={_index} onClick={() => onOpenModal(contact.Case_No)}>
  //             <div className='admin-cases'>
  //               <div>
  //                 <b>Name:</b><span className='case-number'>{contact.Name}</span>
  //               </div>

  //               <div>
  //                 <b>Email:</b> <span className='case-number'>{contact.Email}</span>
  //               </div>
  //             </div>
  //             <div className='admin-cases'>
  //               <div>
  //                 <span className='case-number'><b>Subject:</b>{contact.Subject}</span>
  //               </div>
  //               <div >
  //                 <span className='case-number'><b>Status:</b>{contact.Status}</span>
  //               </div>
  //             </div>
  //             <div className='admin-cases'>
  //               <div>
  //                 <span className='case-number'><b>Case Number:</b>{contact.Case_No}1243</span>
  //               </div>
  //               <div>
  //                 <span>
  //                   <b>Date:</b>
  //                   <Moment format='YYYY-MM-DD'>{contact.date}</Moment>
  //                 </span>
  //               </div>
  //             </div>
  //           </div>

  //       )
  //       : <h1 className='admin-panel-error'>{loader ? '' : 'No Match found'}</h1>
  //     }
  //     { show ? <div className='page-data'>
  //       <button disabled={!start} onClick={start ? prevPage : () => { prevPage() }} className={`previous ${(!start) ? '' : 'prevactive'}`} >&laquo; Previous</button>
  //       <button disabled={searchCases.length <= (start + limit)}
  //         onClick={searchCases.length <= (start + limit) ? () => { nextPage() } : nextPage}className={`next ${(searchCases.length <= (start + limit)) ? '' : 'prevactive'}`} >Next &raquo;</button>
  //     </div> : '' }
  //     <PaginationAdmin totalPages={totalPages} record ={record} />
  //   </div>

  //   <Modal open={open} onClose={onCloseModal}>
  //     <div className='pading'>
  //       <div className='field'>
  //         <div class='control has-icons-left has-icons-right'>
  //           {
  //             contact.Transaction_Number == '' ? '' : <span className='uploaded-name'>
  //               <label className='label left_align name'>Transaction Number:</label>
  //               <p>{contact.Transaction_Number}</p>
  //             </span>
  //           }
  //         </div>
  //         <div class='control has-icons-left has-icons-right'>
  //           <span className='uploaded-name upload-msg '>
  //             <label className='label left_align name'>Message:</label>
  //             <p className='show-msg'>{contact.Message}</p>
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //     <div className='uploaded-documents'>
  //       <div class='control has-icons-left has-icons-right'>
  //         {
  //           Documents.length > 0 ? <span className='uploaded-name document'>
  //             <label className='label left_align name'>Uploaded Document:</label>
  //             {
  //               Documents.map((document, _index) => {
  //                 let doc = 'http://18.219.191.74:7777/'.concat(document)
  //                 return (
  //                   <a href={doc}>{document}</a>
  //                 )
  //               })
  //             }
  //           </span> : ''
  //         }
  //       </div>
  //       <div class='control has-icons-left has-icons-right'>
  //         {
  //           Images.length > 0 ? <span className='uploaded-image'>
  //             <label className='label left_align name'>Uploaded Image:</label>
  //             <div className='container image-container'>
  //               <div className='row image-row'>
  //                 {
  //                   Images.map((image, _index) => {
  //                     let imgSrc = 'http://18.219.191.74:7777/'.concat(image)
  //                     return (
  //                       <div className='column-img'>
  //                         <img src={imgSrc} className='uploaded-image-data columns' />
  //                       </div>
  //                     )
  //                   })
  //                 }
  //               </div>
  //             </div>
  //           </span> : ''
  //         }
  //       </div>
  //       <div class='control has-icons-left has-icons-right'>
  //         {
  //           contact.Link == '' ? '' : <span className='uploaded-name uploaded-link-data'>
  //             <label className='label left_align name'>Uploaded Link</label>
  //             <a href={contact.Link} className='link-text'>{contact.Link}</a>
  //           </span>
  //         }
  //       </div>
  //     </div>
  //     <div className='field'>
  //       <label className='label left_align reply-msg'>Reply</label>
  //       <div className='control'>
  //         <textarea className='textarea reply-msg' name='message' placeholder='Enter Message'
  //           value={message.body} onChange={handleMessageChange} required />
  //         <p className='error-message-text'>{(Errors.message && Errors.message[0]) || ''}</p>
  //         <div className='send-email-btn'>
  //           <button className='button is-success send-btn' onClick={sendMail}>Send</button>
  //         </div>
  //         {
  //           loader ? <div className='admin-panel-loader'>
  //             <img src={require('../../images/loader.gif')} />
  //           </div> : ''
  //         }
  //         {
  //           showFlashMsg ? <FlashMassage duration={5000} persistOnHover>
  //             <p className='send-email-success'>{emailStatus}</p>
  //           </FlashMassage> : null
  //         }
  //       </div>
  //     </div>
  //   </Modal>
  // </div>

    <Container>
      <Row>
        <Col>
          <div className='admin-panel'>
            <h1 className='heading'>Admin Panel</h1>
            {/* <div className='admin-add-btn '>
              <button className='add-user-btn'><i class='fas fa-user-plus' />Add User</button>
              <button className='csv-btn'><i class='fas fa-user-plus hello' />Export CSV</button>
            </div> */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='admin-panel-search-section'>
            <div className='edit-delete-btn'>
              {/* <button className='edit'>Edit</button> */}
              {/* <button className='delete-btn'>Delete</button> */}
            </div>
            {/* <div className='active-admin'>
              <span>All Subscription:267</span>
              <div />
              <span>Active 100</span>
              <div />
              <span>Inactive100</span>
            </div> */}
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
                <th>Case No</th>
                {/* <th>Name</th>
                <th>Email</th> */}
                <th>Status</th>
                <th>Date</th>
                <th>Subject</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tr>
              {/* <td className='checkbox1'><Input type='checkbox' className='input-check-boxes'/></td>
              <td className='name'><img src={require('../../images/nature.jpeg')} className='images' /><span>ABC</span></td> */}
              {/* <td className='admin-data'>Kripalramola@gmail.com</td> */}
              <td className='admin-data'>12345678</td>
              <td className='admin-data'>open</td>
              <td className='admin-data'>12|10|12</td>
              <td className='admin-data'>xyzksldzjhxvo;s</td>
              <td className='admin-data'>Admin</td>
              <td className='admin-data '>
                <div className='actions'>
                  <button className='open' onClick={showAdminTicket}>View</button>
                  <div />
                  <button className='active'>Assign</button>
                  <div />
                </div>
              </td>
            </tr>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
export default AdminPanel
