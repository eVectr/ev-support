import React, { useState } from 'react'
import { Container, Row, Col, Card } from 'reactstrap'
const Images = ({ contacts }) => {
  return (
    <Container>
      <Row>
        <h1 className='header-text'>Images</h1>
      </Row>
      <Row>
        {contacts[0].Image.length ? (
          contacts[0].Image.map(img => {
            let getimg = img.split('/')[1]
            console.log(getimg, '<======getImage')
            let url = 'http://localhost:7777/'
            let imgurl = url.concat(getimg)
            console.log(imgurl, '<====imageurl')

            return (
              <Col md='3' className='image-section-data'>
                <Card>
                  <ul>
                    <li>
                      <img src={imgurl} />
                    </li>
                  </ul>
                </Card>
              </Col>
            )
          })
        ) : (
          <div className='no-images-icon'>
            <img src = {require('../../images/NO Image Available.jpg')}/>
          </div>
        )}
      </Row>
    </Container>
  )
}

export default Images
