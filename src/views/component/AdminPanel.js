import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import axios from 'axios'
import AdminModal from './AdminModal'
import '../../styles/adminpanel.css'


const AdminPanel = (props) => {

    const [contacts, setContacts] = useState([])
    const [caseNo, setCaseNo] = useState('')

    useEffect(() => {
        axios.get(`http://18.219.191.74:7777/getcontacts`)
            .then(res => {
                let { data = [] } = res
                setContacts(data.reverse())
            })
    }, [])

    let handleSearchChange = e =>{
        const { value } = e.target
        setCaseNo(value)
    }

    let onSearch = ()=>{
        setContacts([])
        axios.post(`http://18.219.191.74:7777/getbycaseno`, {caseNo:caseNo})
             .then(res => {
                 console.log("search case =>",res )
               setContacts([res.data[0]])
            })
    }

    // const filterArray = (arr, key, searchTerm) =>
    //     arr.filter(
    //         val =>
    //             val[key]
    //                 .toString()
    //                 .toLowerCase()
    //                 .includes(
    //                     searchTerm.toLowerCase().trim()
    //                 ) || searchTerm === ‘’
    //     )

    // const searchedProduct = filterArray(finalFilteredArchivedProducts, ‘name’, searchString)
    return (
        <div className='container '>
            <div className='row'>
                <div className='admin-panel'>
                    <h3 className='admin-header'>Admin Panel</h3>
                    <div className='search-cases'>
                        <input type="text" className='link-data search' onChange={handleSearchChange}></input>
                        <button type="button" className='search-btn' onClick ={onSearch}>Search</button>
                    </div>
                </div>
            </div>
            {
                contacts.map(
                    (contact, index) =>

                        <div className='card'>
                            <div className='admin-cases'>
                                <div className='show-admin-case'>
                                <span className='case-number'>Case Number:-</span><p>{contact.Case_No}</p>
                                </div>
                                <span>
                                Date:
                                <Moment format="YYYY-MM-DD">
                                    {contact.date}
                                 </Moment>
                                </span>
                            </div>
                            <AdminModal caseNo={contact.Case_No}></AdminModal>
                        </div>

                )
            }

        </div>
    )
}


export default AdminPanel