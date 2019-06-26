import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux' 
import axios from 'axios'
import '../../styles/login.css'
import { userDetailsAction } from '../../redux/actions/auth';
import SuccessfulNoitification from '../component/SuccessfulNotification'
import api_url from '../../utils/Const'


const Loginform = (props) => {

  const [reason, setReason] = useState([])
  const [selectedReason, setSelectedReason] = useState([])
  

  useEffect(() => {
    console.log("inside useEffect")
    axios.get(`http://18.219.191.74:7777/findcontact`)
      .then(res => {
        console.log("res =>", res.data)
        setReason(res.data)
      })
  }, [])

  const handleChange = e => setSelectedReason(e.target.value)


  let onSelectReason = () => {
    if (selectedReason == 'Standard') {
      props.history.push('/contact/1')
    }
    else if (selectedReason == 'Mandatory Uploads') {
      props.history.push('/contact/2')
    }
    else {
      props.history.push('/contact/3')
    }
  }
console.log("selected reason =>", selectedReason)
  return (
    <div>
    {/* <SuccessfulNoitification text={text} show ={show} /> */}
    <div className="sel-reason">
      <h1 className="header">Reason for Contacting Us</h1>
      <p className="sel-reason_p">Please select the reason within the list below of why you are contacting us and press
      CONTINUE after you have completed doing this.</p>
      <select className="reason_select" onChange={handleChange}>
        <option value="" disabled selected>Specify your reason for contacting us</option>
        {
          reason.map(
            (reason, index) =>
              <optgroup label={reason.Category_name} class="text" key={index}>
                {
                  reason.Subcategory_name.map(
                    (option, i) =>
                      <option value={option.Tempate_name} key={i}>{option.name}</option>
                  )
                }
              </optgroup>
          )
        }
      </select>
      <button class="button is-success" onClick={onSelectReason}>Continue</button>
    </div>
    </div>
  )
}

export default connect(state => state)(Loginform)

