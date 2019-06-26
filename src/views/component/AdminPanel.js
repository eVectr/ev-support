import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import axios from 'axios'
import AdminModal from './AdminModal'
import '../../styles/adminpanel.css'


const AdminPanel = (props) => {

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:7777/getcontacts`)
            .then(res => {
                setContacts(res.data)
            })
    }, [])

    console.log("res =>", contacts)
    return (
        <div className='container '>
            <div className='row'>
                <div className='admin-panel'>
                    <h3 className='admin-header'>Admin Panel</h3>
                    <div className='search-cases'>
                        <input type="text" className='link-data search'></input>
                        <button type="button" className='search-btn'>Search</button>
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
                            <AdminModal></AdminModal>
                        </div>

                )
            }

        </div>
    )
}


export default AdminPanel