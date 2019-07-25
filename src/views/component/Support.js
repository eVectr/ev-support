import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import axios from 'axios'
import Modal from 'react-responsive-modal'
import { Container, Row, Col, Input, Table } from 'reactstrap'
import { filterArray, authRoutes } from '../../utils/Common'
import PaginationAdmin from '../component/Pagination'
import '../../styles/adminpanel.css'

const SupportTicket = (props) => {
  const [contacts, setContacts] = useState([])
  const [caseNo, setCaseNo] = useState('')
  const [contact, setContact] = useState({})
  const [open, setOpen] = useState(false)
  const [start, setStart] = useState(0)
  const [limit] = useState(5)
  const [loader, setLoader] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    authRoutes(props)
    setLoader(true)
    let user = JSON.parse(localStorage.getItem('user'))
    let { _id = '', Type = '' } = user || {}
    if (_id) {
      axios.post(`http://18.219.191.74:7777/getbyuserid`, { UserId: JSON.parse(localStorage.user)._id })
        .then(res => {
          let { data = [] } = res
          setContacts(data.reverse())
          setLoader(false)
          setShow(true)
        })
    }
    if (Type !== 'user') {
      props.history.push('/contact')
    }
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
  let nextPage = () => {
    setStart(start + limit)
  }
  let prevPage = () => {
    setStart(start - limit)
  }
  const searchCases = filterArray(contacts, 'Case_No', caseNo)
  const filteredContacts = searchCases.slice(start, start + limit)

  return (
  // <div className='container '>
  //   <div className='row'>
  //     <div className='admin-panel'>
  //       <h3 className='admin-header'>Support Tickets</h3>
  //       <div className='search-cases'>
  //         <input type='text' placeholder='Search by Case No.....' className='link-data search' onChange={handleSearchChange} />
  //       </div>
  //     </div>
  //     {
  //       loader ? <div className='admin-panel-loader'>
  //         <img src={require('../../images/loader.gif')} />
  //       </div> : ''
  //     }
  //   </div>
  //   {searchCases.length
  //     ? filteredContacts.map(
  //       (contact, index) =>
  //         <div className='card admin-card' key={index} onClick={() => onOpenModal(contact.Case_No)}>
  //           <div className='admin-cases'>
  //             <div>
  //               <b>Name:</b><span className='case-number'>{contact.Name}</span>
  //             </div>
  //             <div>
  //               <b>Email:</b> <span className='case-number'>{contact.Email}</span>
  //             </div>
  //           </div>
  //           <div className='admin-cases'>
  //             <div>
  //               <span className='case-number'><b>Subject:</b>{contact.Subject}</span>
  //             </div>
  //             <div >
  //               <span className='case-number'><b>Status:</b>{contact.Status}</span>
  //             </div>
  //           </div>
  //           <div className='admin-cases'>
  //             <div>
  //               <span className='case-number'><b>Case Number:</b>{contact.Case_No}</span>
  //             </div>
  //             <div>
  //               <span>
  //                 <b>Date:</b>
  //                 <Moment format='YYYY-MM-DD'>{contact.date}</Moment>
  //               </span>
  //             </div>
  //           </div>
  //         </div>
  //     )
  //     : <h1 className='admin-panel-error'>{loader ? '' : 'No Result Found'}</h1>
  //   }
  //   {
  //     show
  //       ? <div className='page-data'>
  //         <button disabled={!start} onClick={start ? prevPage : () => { prevPage() }} className={`previous ${(!start) ? '' : 'prevactive'}`}>&laquo; Previous</button>
  //         <button disabled={searchCases.length <= (start + limit)}
  //           onClick={searchCases.length <= (start + limit) ? () => { nextPage() } : nextPage}className={`next ${(searchCases.length <= (start + limit)) ? '' : 'prevactive'}`}>Next &raquo;</button>
  //       </div> : ''
  //   }
  //   <Modal open={open} onClose={onCloseModal}>
  //     <div className='pading'>
  //       <div className='field'>
  //         <div class='control has-icons-left has-icons-right'>
  //           {
  //             contact.Transaction_Number === '' ? '' : <span className='uploaded-name'>
  //               <label className='label left_align name'>Transaction Number:</label>
  //               <p>{contact.Transaction_Number}</p>
  //             </span>
  //           }
  //         </div>
  //         <div class='control has-icons-left has-icons-right'>
  //           <span className='uploaded-name upload-msg '>
  //             <label className='label left_align name'>Message:</label>
  //             <p className='show-msg '>{contact.Message}</p>
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //     <div className='uploaded-documents uploaded-data'>
  //       {
  //         Documents.length > 0 ? <div class='control has-icons-left has-icons-right'>
  //           <span className='uploaded-name document'>
  //             <label className='label left_align name'>Uploaded Document:</label>
  //             {
  //               Documents.map((document, index) => {
  //                 let doc = 'http://18.219.191.74:7777/'.concat(document)
  //                 return (
  //                   <a href={doc}>{document}</a>
  //                 )
  //               })
  //             }
  //           </span>
  //         </div> : ''
  //       }
  //       <div class='control has-icons-left has-icons-right'>
  //         {
  //           Images.length > 0 ? <span className='uploaded-image'>
  //             <label className='label left_align name'>Uploaded Image:</label>
  //             <div className='container image-container'>
  //               <div className='row image-row'>
  //                 {
  //                   Images.map((image, index) => {
  //                     let imgSrc = 'http://18.219.191.74:7777/'.concat(image)
  //                     return (

    //                       <div className='column-img' key={index}>
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
    //           contact.Link === '' ? '' : <span className='uploaded-name'>
    //             <label className='label left_align name'>Uploaded Link:</label>
    //             <p>{contact.Link}</p>
    //           </span>
    //         }
    //       </div>
    //     </div>
    //   </Modal>
    // </div>
    <Container>
      <Row>
        <Col>
          <div className='admin-panel'>
            <h1 className='heading'>Support Panel</h1>
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
              <div className='custom-select'>
                <select>
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

                <select>
                  <option value='Filter by'>Sort By</option>
                  <option value='CaseNo'>CaseNumber</option>
                  <option value='Date'>Date</option>
                </select>
              </div>
            </div>

            <form className='admin-search'>
              <Input
                type='number'
                placeholder='Search Record per page'
              />
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
                <th>Assign To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tr>
              <td className='admin-data' />
              <td className='admin-data' />
              <td className='admin-data' />
              <td className='admin-data' />
              <td className='admin-data' />
              <td className='admin-data'>Not Assign</td>
              <td className='admin-data '>
                <div className='actions'>
                  <button className='open'>
                        View
                  </button>
                  {/* <div />
                      <button className='active'>Assign</button>
                      <div /> */}
                </div>
              </td>
            </tr>
          </Table>
          <Row>
            <Col>
              <PaginationAdmin />
            </Col>
          </Row>

        </Col>
      </Row>
    </Container>
  )
}

export default SupportTicket
