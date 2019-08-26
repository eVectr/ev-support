import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
// const obj = [
//   {
//     link: 'https://www.google.com/'
//   },
//   {
//     link: 'https://www.google.com/'
//   },
//   {
//     link: 'https://www.google.com/'
//   },
//   {
//     link: 'https://www.google.com/'
//   },
//   {
//     link: 'https://www.google.com/'
//   },
//   {
//     link: 'https://www.google.com/'
//   },
//   {
//     link: 'https://www.google.com/'
//   }
// ]
const Link = ({ contacts }) => {
  let links = []
  links = contacts.map(element => {
    console.log(element, 'element')
    // let { Link } = element
    return element.Link
  })
 
  return (
    <Container>
      <h1 className='header-text'>Links</h1>
      <Col>
        {
          links[0].length > 0
            ? <ul>
              {
                links[0].map((link, index) => {
                  console.log(link, index)
                  return <li className='links-data'><a key={index} href={link} target='_blank'>{index + 1}:{link}</a></li>
                })
              }
            </ul> : <div className='no-images-icon'><img src={require('../../images/dummy.jpg')}></img></div>
        }

      </Col>
    </Container>
  )
}

export default Link
