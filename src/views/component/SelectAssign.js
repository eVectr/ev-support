import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import Select from 'react-select'
 
let agentAsing = (props) =>{


const options = [
    { value: 'Akash', label: 'Akash' },
    { value: 'Love', label: 'Love' },
    
  ]
  return (
    <div>
      <Select options={options} />
      
    </div>
    
  )
  }
export default agentAsing
