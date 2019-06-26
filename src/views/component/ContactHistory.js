import React, { useState } from 'react'
import { connect } from 'react-redux' 
import axios from 'axios'
import '../../styles/login.css'
import { userDetailsAction } from '../../redux/actions/auth';


const ContactHistory = (props) => {

  const [contactHistory, setContactHistory] = useState([])

  let onHistory = () =>{
    let id = props.auth.userDetails.data[0]._id
    axios.post(`http://localhost:7777/contacthistory`, {id:id})
    .then(res =>{
      console.log("res =>", res.data)
      setContactHistory(res.data)
   })
   
}

console.log(" history =>", contactHistory)
return (
<div className="log-form">
<button onClick={onHistory}>See Previous Contact Hisotry</button>
{contactHistory.map((history, index)=>{
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

export default connect(state => state)(ContactHistory);

