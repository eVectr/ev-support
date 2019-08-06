import React, { useState } from 'react'
import { Container, Row, Col, Card,Input } from 'reactstrap'

const Document = ({ contacts }) => {
  const document = contacts.map(element => {
    return element.Document
  })
  console.log(document, 'documents')
  console.log(contacts[0], 'contactsssssss')
  return (
    <Container>
      <Row className='document-uploaded'>
        <Row className="assign-data">
        <div className="user-docs-detail">
          <div className="docs-details-inner">
            <label className="des-head">{contacts.length > 0? contacts[0].Subject:''}</label>
            <div className="icons-links">
                <span><i class="fa fa-paperclip" aria-hidden="true"></i></span>
                <span><i class="fa fa-file-image" aria-hidden="true"></i></span>
                <span><i class="fa fa-link" aria-hidden="true"></i></span>
            </div>
          </div>
          <div className="docs-details-inner right-side">
            <label>Assignee</label>
            <div className="">
              <span><img src={require('../../images/head-659652_960_720.png')} /></span>
              <span>Vijaya</span>
            </div>
          </div>
          
          </div>
        </Row>
         <Row>
         <div className="test">
            <p>
            {contacts.length > 0? contacts[0].Message:''}
            </p>
          </div>
         </Row>
         
         
        
        <Col md='3'>
          {
            document.map(element => {
              return (
                <Card>
                  <img src={require('../../images/doc.png')} className='document-img' />
                  <li>
                    <a href='#' target= '_blank'>{element}</a>
                  </li>
                  
                </Card>
                
              )
            })
          }
        </Col>
      </Row>
    </Container>
  )
}
export default Document
