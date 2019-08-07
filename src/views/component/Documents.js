import React, { useState } from 'react'
import { Container, Row, Col, Card,Input } from 'reactstrap'
const item = [
  {
    StatusValue: 'Ticket created'
  },
  {
    StatusValue: 'Ticket status changed to active'
  },
  {
    StatusValue: 'Ticket status changed to closed'
  },
]

const Document = ({ contacts }) => {
  const document = contacts.map(element => {
    return element.Document
  })

  console.log('contacts   ===>', contacts)
  return (
    <Container>
      <Row>
      <Col md='12'>
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
              <div className="docs-details-inner right-side">
                <label>Assignee</label>
                <div className="">
                  <span><img src={require('../../images/head-659652_960_720.png')} /></span>
                  <span>Vijaya</span>
                </div>
              </div>
              
              </div>
            </div>
      </Col>
      <Col md='12'>
        <div className="test">
              <p>
              {contacts.length > 0? contacts[0].Message:''}
              </p>
          </div>
      </Col>
        </Row>
      <Row>
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
        <Col md='3' className="logs-section">
          <div className="list-view">
            <h6>Message Logs</h6>
              {item.map(function(d, idx){
              return (<li key={idx}>
                <span class="email">Status:</span>
                <span>{d.StatusValue}</span>
                </li>)
            })}
          </div>
          <div className="other-view">
            <li>{contacts.length > 0? contacts[0].Reason:''}</li>
          </div>
        </Col>

     </Row>
    </Container>
  )
}
export default Document
