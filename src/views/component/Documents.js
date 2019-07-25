import React, { useState } from 'react'
import { Container, Row, Col, Card } from 'reactstrap'

const Document = ({ contacts }) => {
  const document = contacts.map(element => {
    return element.Document
  })
  console.log(document.length, 'documents')
  console.log(contacts, 'contactsssssss')
  return (
    <Container>
      <h1 className='header-text'>Documents</h1>
      <Row className='document-uploaded'>
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
