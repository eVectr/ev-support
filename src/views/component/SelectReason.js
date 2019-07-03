import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux' 
import axios from 'axios'
import '../../styles/login.css'
import SuccessfulNoitification from '../component/SuccessfulNotification'
import api_url from '../../utils/Const'
import { SelectedReason } from '../../redux/actions/notification/notification';


const Loginform = (props) => {

  const [reason, setReason] = useState([])
  const [selectedReason, setSelectedReason] = useState([])
  const [template, setSelectedTemplate] = useState([])
  

  useEffect(() => {
    // localStorage.getItem('user', JSON.parse())
    // if () {
    //   prop
    // }
    axios.get(`http://18.219.191.74:7777/findcontact`)
      .then(res => {
        console.log("res =>", res.data)
        setReason(res.data)
      })
  }, [])

  const handleChange = e => {
    console.log("e.target.value  =>", e.target.value)
    setSelectedTemplate(JSON.parse(e.target.value).template)
    setSelectedReason(JSON.parse(e.target.value).name)
    props.dispatch(SelectedReason(JSON.parse(e.target.value)))
    console.log(props,"props")
  }
  let onSelectReason = () => {
    if (template == 'Standard') {
      props.history.push('/contact/1')
    }
    else if (template == 'Mandatory Uploads') {
      props.history.push('/contact/2')
    }
    else if (template == 'Optional Uploads + Transaction Number') {
      props.history.push('/contact/3')
    }
    else {
      props.history.push('/contact')
    }
  }
  console.log("selected template => ", selectedReason)
  return (
    <div className='select-reason'>
    <div className="sel-reason">
    <div className='selected-reason-data'></div>
      <h1 className="header select-header">Reason for Contacting Us</h1>
      <p className="sel-reason_p">Please select the reason within the list below of why you are contacting us and press
      CONTINUE after you have completed doing this.</p>
      <div className='select-data'> 
      <select className="reason_select" onChange={handleChange}>
        <option value="" disabled selected>Specify your reason for contacting us</option>
        {
          reason.map(
            (reason, index) =>
              <optgroup label={reason.Category_name} class="text" key={index}>
                {
                  reason.Subcategory_name.map((option, i) =>{
                    let val = {'template': option.Tempate_name, 'name':option.name}
                    return(
                      <option value={JSON.stringify(val)} key={i}>{option.name}</option>
                    )
                  })
                }
              </optgroup>
          )
        }
      </select>
      </div>
      <div className='select-data'>
        <button class="button is-success" onClick={onSelectReason}>Continue</button>
      </div>
    </div>
    </div>
  )
}

export default connect(state => state)(Loginform)

