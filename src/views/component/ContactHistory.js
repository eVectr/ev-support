import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import '../../styles/login.css'

const ContactHistory = (props) => {
  const [contactHistory, setContactHistory] = useState([])
  let onHistory = () => {
    let id = props.auth.userDetails.data[0]._id
    axios.post(`http://18.219.191.74:7777/contacthistory`, { id: id })
      .then(res => {
        setContactHistory(res.data)
      })
  }
  return (
    <div className='log-form'>
      <button onClick={onHistory}>See Previous Contact History</button>
      {contactHistory.map((history, index) => {
        return (
          <ul key={index}>
            <li>{history.user_Id}</li>
            <li>{history.Name}</li>
            <li>{history.Reason}</li>
            <li>{history.Message}</li>
          </ul>
        )
      })}
    </div>
  )
}
export default connect(state => state)(ContactHistory)
