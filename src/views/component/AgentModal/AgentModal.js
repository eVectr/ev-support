import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Select from 'react-select'
import Modal from 'react-responsive-modal'
import adminModalValidation from '../../../utils/adminModalValidation'
import is from 'is_js'
import AgentUserDetails from './components/AgentUserDetails';

const AgentModal = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState({})
  const [select, setSelect] = useState([])
  const [createAgentSuccess, setcreateAgentSuccess] = useState(false)
  const [agentUserDetails, agentUserDetailsData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    type: ''
  })

  const onChangeText = e => {
    agentUserDetailsData({
      ...agentUserDetails,
      [e.target.name]: e.target.value
    })
    setErrors({
      [e.target.name]: []
    })
  }
  const onChangeSelect = e => {
    try{
      for(let i = 0; i< e.length; i++){
        setSelect([...select, e[i].value])
      }
     //setSelect(e)
    }catch(err){
      return
    }
  }

  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }
  let agentsucces = () =>{
    return new Promise((resolve, reject)=>{
      resolve(setcreateAgentSuccess(!createAgentSuccess))
    })
  }

  let handleCloseOnSave = () => {
     const errors = adminModalValidation(agentUserDetails)
      if (!is.empty(errors)) {
        setTimeout(() => {
              setErrors(false)
              setErrors('')
              setcreateAgentSuccess(false)
          }, 1000)
         
           setErrors(errors)
        return 
    }
    else { 
      agentsucces().then(res => {
        setTimeout(() => {
          setcreateAgentSuccess(false)
          props.onAgentCloseModal()
         
      }, 1000)
      agentUserDetailsData('')
      })
      if(props.selectedItem._id == undefined){
       
          axios.post(`https://ev2.softuvo.xyz/saveagent`, {
          //axios.post(`http://localhost:7788/saveagent`, {
            FirstName: agentUserDetails.FirstName,
            LastName: agentUserDetails.LastName,
            Password: agentUserDetails.Password,
            Type: select,
            Email: agentUserDetails.Email,
            TicketId: []
          })
            .then(res => {
              axios.post(`https://ev2.softuvo.xyz/updateagentonassign`, { Type:select, AssignTo: [{label:res.data.FirstName, value: res.data._id }] })
             // axios.post(`http://localhost:7788/updateagentonassign`, { Type:select, AssignTo: [{label:res.data.FirstName, value: res.data._id }] })
             
              props.fetchadmin()
              // agentUserDetailsData('')
              props.emptyItem()
            })
            .then(res => {
              setSelect([])
              setErrors('')
              console.log("agentUser ==>", res)
              props.savePageChange()
            })
      }
      else{
       
        axios.post(`https://ev2.softuvo.xyz/updateAgent`, {
         // axios.post(`http://localhost:7788/updateAgent`, {
            Id: props.selectedItem._id,
            FirstName: agentUserDetails.FirstName,
            LastName: agentUserDetails.LastName,
            Password: agentUserDetails.Password,
            Type: select,
            Email: agentUserDetails.Email,
            TicketId: []
          })
            .then(res => {
              setSelect([])
              props.fetchadmin()
              // agentUserDetailsData('')
              props.emptyItem()
            })
            .then(res => {
              setErrors('')
              console.log("agentUser ==>", res)
            })
      }
    }
  }

  const AgentModalProps = {
    agentUserDetails,
    errors,
    onChangeText,
    handleCloseOnSave,
    onChangeSelect,
    agentsucces,
    createAgentSuccess,
    agentUserDetailsData,
  }
  console.log("selected  ==>", select)
  return (
    <div style={styles} >
      {/* <h2>react-responsive-modal</h2> */}
      <Modal open={props.open || isOpen} onClose={props.onAgentCloseModal} classNames={'sent-modal'} center >
        <div className='sent-modal agent-modal-inner'>
          <h2>Create Agent</h2>
          <AgentUserDetails selectedItem={props.selectedItem} {...AgentModalProps}
          />
        </div>

      </Modal>
    </div>
  )
}

export default connect(
  state => ({
    subAdminDetailsReducer: state.subAdminDetailsReducer
  })
)(AgentModal)
