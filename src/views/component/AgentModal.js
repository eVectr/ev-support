import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Modal from 'react-responsive-modal'
import { Col, Button, Form, FormGroup, Label, Input, FormText  } from 'reactstrap'


const AgentModal = props => {
  const [isOpen, setIsOpen] = useState(false)
const options = [
  { value: 'Standard', label: 'Standard' },
  { value: 'Optional Uploads + Transaction Number', label: 'Optional Uploads + Transaction Number' },
  { value: 'Mandatory Uploads', label: 'Mandatory Uploads' }
]
  const [selectedFirstName, setSelectedFirstName] = useState('')
  const [selectedLastName, setSelectedLastName] = useState('')
  const [selectedEmail, setSelectedEmail] = useState('')
  const [selectedPassword, setSelectedPassword] = useState('')
  const [selectedType, setSelectedType] = useState([])
  const [Errors, setErrors] = useState('')
 
  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }
 
  let onCloseModal = () => {
    if (props.closeModal) {
      props.closeModal()
    } else {
      setIsOpen(false)
    }
  }

  let selectedArray = []

  let onAgentChange = (e) =>{
    console.log("agent ===>", e)

    if(e){
      for(let i = 0; i< e.length ; i++){
        selectedArray.push(e[i].value)
        setSelectedType(selectedArray)
      }
    }
  }
   
  let onSelectFirstName = (e) => {
    console.log('first value ==>', e.target.value)
    setSelectedFirstName(e.target.value)
  }
  let onSelectLastName = (e) => {
    setSelectedLastName(e.target.value)
  }
  let onSelectEmail = (e) => {
    setSelectedEmail(e.target.value)
  }
  let onSelectPassword = (e) => {
    setSelectedPassword(e.target.value)
  }
 
  let handleCloseOnSave = () => {
    // if(selectedFirstName == '' || selectedLastName == '' || selectedEmail == '' || selectedPassword  == '' || selectedType == ''){
    //   setTimeout(() => {
    //     setErrors(false)
    //     setErrors('')
    // }, 2000)
    //   setErrors('Please enter required fields')
    // }
   // else {
      //axios.post(`http://54.165.185.4:7788/saveagent`, {FirstName:selectedFirstName,
      axios.post(`http://localhost:7788/saveagent`, {FirstName:selectedFirstName,
      LastName: selectedLastName,
      Password: selectedPassword,
      Type:selectedType,
      Email:selectedEmail,
      TicketId: []})
      .then(res =>{
        console.log("res ==>", res)
      })
      props.onAgentCloseModal()
   // }
  }


  return (
    <div style={styles} >
      {/* <h2>react-responsive-modal</h2> */}
      <Modal open={props.open || isOpen} onClose={props.onAgentCloseModal}  classNames={'sent-modal'} center >
        <div className='sent-modal agent-modal-inner'>
          <h2>Create Agent</h2>
          <div className='modal-inner'>
             
                    <FormGroup row>
                        <Label for="exampleEmail">First Name</Label> 
                            <Col sm={10}>
                                <Input type="First name" name="First name" id="exampleEmail" placeholder="First Name" onChange={(e) => onSelectFirstName(e)}/>
                                {
                                  setErrors? <p className="error-msg">{Errors != 'success'? Errors: ''}</p>:<p>Success</p>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail">Last Name</Label> 
                                <Col sm={10}>
                                  <Input type="Last name" name="Last name" id="exampleEmail" placeholder="Last Name" onChange={(e) => onSelectLastName(e)}/>
                                  {
                                    setErrors? <p className="error-msg">{Errors != 'success'? Errors: ''}</p>:<p>Success</p>
                                  }
                                </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="Email" name="Email" id="exampleEmail" placeholder="Email" onChange={(e) => onSelectEmail(e)}/>
                                {
                                  setErrors? <p className="error-msg">{Errors != 'success'? Errors: ''}</p>:<p>Success</p>
                                }
                            </Col>
                        </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword">Password</Label>
                            <Col sm={10}>
                                <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={(e) => onSelectPassword(e)}/>
                                {
                                  setErrors? <p className="error-msg">{Errors != 'success'? Errors: ''}</p>:<p>Success</p>
                                }
                            </Col>     
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleSelect">Type</Label>
                        <Col sm={10}>
                        <Select onChange={(e) =>onAgentChange(e)} isMulti options={options} />
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 12 }}>
                            <Button className="sendmessage-btn btn btn-secondary" onClick ={handleCloseOnSave}>Save</Button>
                        </Col>
                    </FormGroup>
                
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default AgentModal
