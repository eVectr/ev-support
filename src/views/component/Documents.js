import React, { useState, Fragment } from 'react'
import { Container, Row, Col, Card,Input } from 'reactstrap'



const Document = ({ contacts }) => {

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
          {contacts.length > 0? <Fragment>
            {contacts[0].Image.length ? (
          contacts[0].Image.map(img => {
            let getimg = img.split('/')[1]
            let url = 'http://localhost:7788/'
           // let url = 'http://3.83.23.220:7788/'
            let imgurl = url.concat(getimg)
            return (
              <Col md='3' className='image-section-data'>
                <Card>
                  <ul>
                    <li>
                      <img src={imgurl}  />
                    </li>
                  </ul>
                </Card>
              </Col>
            )
          })
        ) : (
          <div className='no-images-icon'>
            <img src = {'http://localhost:7777/2019-07-19T07:41:58.967Zimg4.jpeg'}/>
          </div>
        )}
          </Fragment>: ''}
         
        </Col>

     </Row>
    </Container>
  )
}
export default Document
