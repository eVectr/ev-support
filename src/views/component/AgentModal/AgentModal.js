import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Modal from 'react-responsive-modal'
import adminModalValidation from '../../../utils/adminModalValidation'
import is from 'is_js'
import AgentUserDetails from './components/AgentUserDetails';

const AgentModal = (props) => {
  console.log(props, 'props')
  const [isOpen, setIsOpen] = useState(false)
  // const options = [
  //   { value: 'Standard', label: 'Standard' },
  //   { value: 'Optional Uploads + Transaction Number', label: 'Optional Uploads + Transaction Number' },
  //   { value: 'Mandatory Uploads', label: 'Mandatory Uploads' }
  // ]
  // const [inputTagValue, setInputTagValue] = useState('')
  const [errors, setErrors] = useState({})
  const [select, setSelect] = useState([])
  const [createAgentSuccess, setcreateAgentSuccess] = useState(false)
  const [agentUserDetails, agentUserDetailsData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    type: ''
  })
  // const tagsHandleChange = tags => agentUserDetailsData({ tags })

  // const onTagsInputChange = inputTagValue => {
  //   setInputTagValue(inputTagValue)
  //   setErrors({
  //     tags: []
  //   })
  // }

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
    console.log("select ee =>", e)
   setSelect(e)
  }
  // const [selectedFirstName, setSelectedFirstName] = useState('')
  // const [selectedLastName, setSelectedLastName] = useState('')
  // const [selectedEmail, setSelectedEmail] = useState('')
  // const [selectedPassword, setSelectedPassword] = useState('')
  // const [selectedType, setSelectedType] = useState([])

  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }

  // let selectedArray = []

  // let onAgentChange = (e) => {
  //   console.log("agent ===>", e)

  //   if (e) {
  //     for (let i = 0; i < e.length; i++) {
  //       selectedArray.push(e[i].value)
  //       setSelectedType(selectedArray)
  //     }
  //   }
  // 
  let agentsucces = () =>{
    setcreateAgentSuccess (true)
  }

  let handleCloseOnSave = () => {
    const errors = adminModalValidation(agentUserDetails)
      if (!is.empty(errors)) {
        setTimeout(() => {
              setErrors(false)
              setErrors('')
              setcreateAgentSuccess (true)
          }, 1000)
         
           setErrors(errors)
        return 
    }
    else {
      props.onAgentCloseModal()
      axios.post(`https://ev2.softuvo.xyz/saveagent`, {
      //axios.post(`http://localhost:7788/saveagent`, {
        FirstName: agentUserDetails.first_name,
        LastName: agentUserDetails.last_name,
        Password: agentUserDetails.password,
        Type: select,
        Email: agentUserDetails.email,
        TicketId: []
      })
        .then(res => {
          props.fetchadmin()
        })

        .then(res => {
          setErrors('')
          console.log("agentUser ==>", res)


        })
    }
  }
  // const handleOnSave = () => {
  //   const errors = adminModalValidation(agentUserDetails)
  //   console.log(errors, 'errors')
  //   if(!is.empty(errors)) {
  //     setErrors(errors)
  //     return
  //   }
  //     axios.post(`http://54.165.185.4:7788/saveagent`, {
  //       FirstName: agentUserDetails.first_name,
  //       LastName: agentUserDetails.last_name,
  //       Password: agentUserDetails.password,
  //       Type: agentUserDetails.tags,
  //       Email: agentUserDetails.email,
  //       TicketId: []
  //     })
  //       .then(res => {
  //         console.log(res, 'res')
  //       })
  // }
  const AgentModalProps = {
    agentUserDetails,
    errors,
    onChangeText,
    handleCloseOnSave,
    onChangeSelect,
    agentsucces
    // inputTagValue,
    // tagsHandleChange,
    // onTagsInputChange
  }


  return (
    <div style={styles} >
      {/* <h2>react-responsive-modal</h2> */}
      <Modal open={props.open || isOpen} onClose={props.onAgentCloseModal} classNames={'sent-modal'} center >
        <div className='sent-modal agent-modal-inner'>
          <h2>Create Agent</h2>
          <AgentUserDetails {...AgentModalProps}
          agentsucces = {agentsucces}/>
        </div>

      </Modal>
    </div>
  )
}

export default AgentModal
