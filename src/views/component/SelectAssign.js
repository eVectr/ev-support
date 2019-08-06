import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Select from 'react-select'
 
let agentAsing = (props) =>{


const options = [
    { value: 'Akash', label: 'Akash' },
    { value: 'Love', label: 'Love' },
    
  ]
  return (
    <Select options={options} />
  )
  }
export default agentAsing
