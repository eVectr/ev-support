import React, { useState } from 'react'
import { Container, Row, Col, Card,Input } from 'reactstrap'


const Document = ({ contacts }) => {
  const document = contacts.map(element => {
    return element.Document
  })

  console.log('contacts   ===>', contacts)
  return (
    <Container>
      <Row>
      <Col md='9'>
          <div className="assign-data">
            <div className="user-docs-detail">
              <div className="docs-details-inner">
               
                <div className="ticket-docs">
                    <label className="des-head">Subject:</label>
                    <span className="des-head">{contacts.length > 0? contacts[0].Subject:''}</span>
                </div>
               <div className="ticket-docs">
                  <label className="des-head">Reason:</label> <span>
                  <span className="des-head">{contacts.length > 0? contacts[0].Reason:''}</span>
                </span>
               </div>
               <div className="test">
               <label className="des-head">Message:</label> 
                  <span>
                  {contacts.length > 0? contacts[0].Message:''}
                  </span>
                </div>
                <div className="icons-links">
                    <span><i class="fa fa-paperclip" aria-hidden="true"></i></span>
                    <span><i class="fa fa-file-image" aria-hidden="true"></i></span>
                    <span><i class="fa fa-link" aria-hidden="true"></i></span>
                </div>
              </div>
              </div>
            </div>
           
          <Col md='9' className="attach-item">
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
      </Col>
        </Row>
      <Row>
        
       

     </Row>
    </Container>
  )
}
export default Document
