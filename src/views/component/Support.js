import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import axios from 'axios'
import AdminModal from './AdminModal'
import Modal from "react-responsive-modal"
import '../../styles/adminpanel.css'
import {filterArray,  authRoutes} from '../../utils/Common'



const SupportTicket = (props) => {

    const [contacts, setContacts] = useState([])
    const [caseNo, setCaseNo] = useState('')
    const [contact, setContact] = useState({})
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)
    const [start, setStart] = useState(0)
    const [limit, setLimit] = useState(5)
    const [loader, setLoader]= useState(false)
    const [show, setshow]= useState(false)

    useEffect(() => {
        authRoutes(props)
        setLoader(true)
        let user = JSON.parse(localStorage.getItem('user'))
        let { _id = '', Type = ''} = user || {}
        if(_id){
            axios.post(`http://18.219.191.74:7777/getbyuserid`,{UserId:JSON.parse(localStorage.user)._id})
            .then(res => {
                let { data = [] } = res
                setContacts(data.reverse())
                setLoader(false)
                setshow(true)
            })
        }
        
        if(Type !== 'user'){  
            props.history.push('/contact')          
        }

        
    }, [])

    let handleSearchChange = e =>{
        const { value } = e.target
        setCaseNo(value)
    }

    let onSearch = ()=>{
        
        axios.post(`http://18.219.191.74:7777/getbycaseno`, {caseNo:caseNo})
             .then(res => {
                if(res.data.length >0 ){
                    setContacts([])
                    setContacts([res.data[0]])
                }else{
                    
                }
              
            })
    }



    let onOpenModal = (CaseNo) => {
        axios.post(`http://18.219.191.74:7777/getbycaseno`, {caseNo:CaseNo})
             .then(res => {
               setContact(res.data[0])
            })
        setOpen(true)
    }

    let onCloseModal = () => {
        setOpen(false)
    }

    let sendMail = () =>{
        axios.post(`http://18.219.191.74:7777/sendmail`, {message:message, email:contact.Email})
        .then(res => {
          console.log("res ==>", res)
       })
    }
   
    const handleMessageChange = e => {
        const { value } = e.target
        setMessage(value)
       }

    let Images = []
    if(contact.Image){
      contact.Image.map(item => {
        let itemArr = item.split('/')
        console.log(itemArr[1], "hjkhklh")
        Images.push(itemArr[1])
         })
      }

      let Documents = []
      if(contact.Document){
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
        <div className='container '>
            <div className='row'>
                <div className='admin-panel'>
                    <h3 className='admin-header'>Support Tickets</h3>
                    <div className='search-cases'>
                        <input type="text" placeholder ="Search by Case No....."  className='link-data search' onChange={handleSearchChange}></input>
        
                    </div>
                </div>
                {
                    loader ?    <div className="admin-panel-loader"> 
                        <img src = {require('../../images/loader.gif')}/>
                    </div> : ''
                }
            </div>
            {searchCases.length?
                filteredContacts.map(
                    (contact, index) =>

                        <div className='card admin-card'  onClick={() => onOpenModal(contact.Case_No)}>
                            <div className='admin-cases'>  
                                <div>
                                    <b>Name:</b><span className='case-number'>{contact.Name}</span>
                                </div>
                    
                                <div>
                                <b>Email:</b> <span className='case-number'>{contact.Email}</span>
                                </div> 
                            </div>    

                            <div className='admin-cases'>
                                <div>
                                    <span className='case-number'><b>Subject:</b>{contact.Subject}</span>
                                </div>
                                <div >
                                    <span className='case-number'><b>Status:</b>{contact.Status}</span>
                                </div>
                            </div>   

                            <div className='admin-cases'>
                            <div>
                                <span className='case-number'><b>Case Number:</b>{contact.Case_No}</span>
                            </div>
                                <div>
                                    <span>
                                        <b>Date:</b> 
                                        <Moment format="YYYY-MM-DD">{contact.date}</Moment>
                                    </span>
                                </div>
                            </div>
                            
                        </div>

                )
                :<h1 className='admin-panel-error'>{loader ? '' : 'No Result Found'}</h1>
            }
            {
                show ? 
                <div className='page-data'>
                <button disabled={!start}  onClick={start ? prevPage : () => {prevPage()}} className={`previous ${(!start)?'':'prevactive'}`}>&laquo; Previous</button>
                <button disabled={searchCases.length <= (start + limit)} 
                onClick={searchCases.length <= (start + limit) ? () => {nextPage()} : nextPage}className={`next ${(searchCases.length <= (start + limit))?'':'prevactive'}`}>Next &raquo;</button>
                </div> : ''
            }
            

            <Modal open={open} onClose={onCloseModal}>
                <div className="pading">
                    <div className="field">
                       
                        <div class="control has-icons-left has-icons-right">
                        {
                            contact.Transaction_Number == '' ? '' : <span className='uploaded-name'>
                            <label className="label left_align name">Transaction Number:</label>
                            <p>{contact.Transaction_Number}</p>
                        </span>

                        }
                            
                        </div>

                        <div class="control has-icons-left has-icons-right">
                            <span className='uploaded-name upload-msg '>
                                <label className="label left_align name">Message:</label>
                                <p className='show-msg '>{contact.Message}</p>
                            </span>
                        </div>
                    </div>
                </div>

                <div className='uploaded-documents uploaded-data'>
                    {
                        Documents.length>0 ?   <div class="control has-icons-left has-icons-right">
                        <span className='uploaded-name document'>
                            <label className="label left_align name">Uploaded Document:</label>
                            {
                                Documents.map((document, index) => {
                                let doc = 'http://18.219.191.74:7777/'.concat(document)
                                return (
                                    <a href={doc}>{document}</a>
    
                                )
                            })
                            }
                        </span>
                    </div> : ''
                    }
                    

                    <div class="control has-icons-left has-icons-right">
                        {
                            Images.length>0 ? <span className='uploaded-image'>
                            <label className="label left_align name">Uploaded Image:</label>
                            <div className='container image-container'>
                                <div className='row image-row'>
                                {
                                    Images.map((image, index) => {
                                    let imgsrc = 'http://18.219.191.74:7777/'.concat(image)
                                    return (
                                            
                                        <div className='column-img'>
                                            <img src={imgsrc} className="uploaded-image-data columns" />
                                        </div>
                                    )
                                })
                                }
                                </div>
                            </div>
                        </span> : ''
                        }
                        
                    </div>

                    <div class="control has-icons-left has-icons-right">
                        {
                            contact.Link == '' ? '' : <span className='uploaded-name'>
                            <label className="label left_align name">Uploaded Link:</label>
                            <p>{contact.Link}</p>
                        </span>
                        }
                        
                    </div>
                </div>
              
            </Modal>

        </div>
    )
}

export default SupportTicket



