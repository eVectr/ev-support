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
      </Col>
        </Row>
      <Row>
         <Col md='9' className="attach-item">
          {contacts.length > 0? <Fragment>
            {contacts[0].Image.length ? (
            contacts[0].Image.map(img => {
            let getimg = img.split('/')[1]
           // let url = 'http://localhost:7788/'
            let url = 'http://3.83.23.220:7788/'
            let imgurl = url.concat(getimg)
            return (
              <Col md='12' className='inner-image-section-data'>
               
                  <ul>
                    <li>
                      <img src={imgurl}  />
                      <a href={imgurl} download>Download</a>
                    </li>
                  </ul>
                
              </Col>
            )
          })
        ) : (
        ''
        )}

          {contacts[0].Document.length ? (
            contacts[0].Document.map(img => {
            let getimg = img.split('/')[1]
           // let url = 'http://localhost:7788/'
            let url = 'http://3.83.23.220:7788/'
            let imgurl = url.concat(getimg)
            console.log("document liks   ===>", imgurl)
            return (
              <Col md='3' className='image-section-data'>
                
                  <ul>
                    <li>
                    <img src={require('../../images/doc.png')} className='document-img' />
                      <a href={imgurl} download="download.png">Download</a>
                    </li>
                  </ul>
                
              </Col>
            )
          })
        ) : (
        ''
        )}
         {contacts[0].Link.length ? (
            contacts[0].Link.map(url => {
              console.log("url ==>", url)
              return (
              <Col md='6' className='links-data'>
                  <ul>
                    <li>
                    <a href = {url}>{url}</a>
                    </li>
                  </ul>
              </Col>
            )
          })
        ) : (
        ''
        )}
        
          </Fragment>: ''}
         
        </Col>

     </Row>
    </Container>
  )
}
export default Document
