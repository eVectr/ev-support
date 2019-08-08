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
  let onAgentChange = (e) =>{
    for(let i = 0; i< e.length ; i++){
      console.log("agent selcet =======>", e[i].value)
    }
   
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
                                <Input type="First name" name="First name" id="exampleEmail" placeholder="First Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail">Last Name</Label> 
                                <Col sm={10}>
                                <Input type="Last name" name="Last name" id="exampleEmail" placeholder="Last Name" />
                                </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="Email" name="Email" id="exampleEmail" placeholder="Email" />
                                </Col>
                        </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword">Password</Label>
                            <Col sm={10}>
                                <Input type="password" name="password" id="examplePassword" placeholder="password" />
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
                            <Button className="sendmessage-btn btn btn-secondary">Save</Button>
                        </Col>
                    </FormGroup>
                
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default AgentModal
