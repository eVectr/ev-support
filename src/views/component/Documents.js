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
                <label className="des-head">{contacts.length > 0? contacts[0].Subject:''}</label>
                <div className="icons-links">
                    <span><i class="fa fa-paperclip" aria-hidden="true"></i></span>
                    <span><i class="fa fa-file-image" aria-hidden="true"></i></span>
                    <span><i class="fa fa-link" aria-hidden="true"></i></span>
                </div>
              </div>
              </div>
            </div>
            <div className="test">
                  <p>
                  {contacts.length > 0? contacts[0].Message:''}
                  </p>
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
