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
    const [errors, setErrors] = useState({})
    const [ agentUserDetails, agentUserDetailsData] = useState({
        first_name: '',
        last_name: '',
        type :'' ,
        email: '',
        password: ''
    })
    const onChangeText = e => {
      agentUserDetailsData({
          ...agentUserDetails,
          [e.target.name] : e.target.value,
      })
      setErrors({
          [e.target.name] : []
      })
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

  let selectedArray = []

  // let onAgentChange = (e) => {
  //   console.log("agent ===>", e)

  //   if (e) {
  //     for (let i = 0; i < e.length; i++) {
  //       selectedArray.push(e[i].value)
  //       setSelectedType(selectedArray)
  //     }
  //   }
  // 
  let handleCloseOnSave = () => {
    const errors = adminModalValidation(agentUserDetails)
      if (!is.empty(errors)) {
        setTimeout(() => {
              setErrors(false)
              setErrors('')
          }, 1000)
           setErrors(errors)
        return 
      }
      else{
        props.onAgentCloseModal()
        axios.post(`http://localhost:7788/saveagent`, {
        agentUserDetails
      })
     
        .then(res => {
          setErrors('')
          console.log("agentUserDetails ==>", res)
          setErrors()
         
        })
      } 
    }
  const AgentModalProps = {
    agentUserDetails,
    errors,
    onChangeText,
    handleCloseOnSave,
  }
  console.log("ispoen =>", isOpen)
  console.log("props.open =>", props.open)
  return (
    <div style={styles} >
      {/* <h2>react-responsive-modal</h2> */}
      <Modal open={props.open || isOpen} onClose={props.onAgentCloseModal} classNames={'sent-modal'} center >
        <div className='sent-modal agent-modal-inner'>
          <h2>Create Agent</h2>
            <AgentUserDetails {...AgentModalProps}
              />
        </div>
       
      </Modal>
    </div>
  )
}

export default AgentModal
