import React, { Fragment, useState } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import AgentModal from '../AgentModal';
import Select from 'react-select';

const AgentUserDetails = ({
    agentUserDetails,
    onChangeText,
    errors,
    handleCloseOnSave,
    onChangeSelect,
    closeModal,
    tagsHandleChange,
    createAgentSuccess,
    agentsucces
    }) => {

    const options = [
        { value: 'Standard', label: 'Standard' },
        { value: 'Optional Uploads + Transaction Number', label: 'Optional Uploads + Transaction Number' },
        { value: 'Mandatory Uploads', label: 'Mandatory Uploads' }
    ]
    


    return (
        <Fragment>
            {createAgentSuccess ?
                <div>
                    <div className='modal-inner'>
                        <h3 className="succes-msg"><i class="far fa-check-circle"></i></h3>
                        <p className="succes-text">Send Message Successfully</p>
                    </div>
                </div> :
                <div className='modal-inner'>
                    <FormGroup row>
                        <Label for="exampleEmail">First Name</Label>
                        <Col sm={10}>
                            <Input type="First name" name="first_name" id="exampleEmail" placeholder="First Name" value={agentUserDetails.first_name} onChange={onChangeText} />
                            <p className="error-msg">{(errors.first_name && errors.first_name[0] || '')}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail">Last Name</Label>
                        <Col sm={10}>
                            <Input type="Last name" name="last_name" id="exampleEmail" placeholder="Last Name" value={agentUserDetails.last_name} onChange={onChangeText} />
                            <p className="error-msg">{(errors.last_name && errors.last_name[0] || '')}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="Email" name="email" id="exampleEmail" placeholder="Email" value={agentUserDetails.email} onChange={onChangeText} />
                            <p className="error-msg">{(errors.email && errors.email[0] || '')}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword">Password</Label>
                        <Col sm={10}>
                            <Input type="password" name="password" id="examplePassword" placeholder="password" value={agentUserDetails.password} onChange={onChangeText} />
                            <p className="error-msg">{(errors.password && errors.password[0] || '')}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleSelect">Type</Label>
                        <Col sm={10}>
                            <Select 
                                isMulti options={options}
                                 value={agentUserDetails.tags}
                                 onChange={onChangeSelect}
                            />
                            <p className="error-msg">{(errors.tags && errors.tags[0] || '')}</p>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 12 }}>
                            <Button className="sendmessage-btn btn btn-secondary" onClick={handleCloseOnSave} agentsucces= {agentsucces} >Save</Button>
                        </Col>
                    </FormGroup>
                </div>}
        </Fragment>
    )
}
export default AgentUserDetails
