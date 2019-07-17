import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import '../../styles/adminticket.css'

const AdminTicket = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div className='heading'>
            <h1>contact log</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className='admin-chats-data'>
          <div className='comments'>
            <p>Comments</p>
          </div>
        </Col>
      </Row>
      <Row className='admin-data'>

        <Row>
          <Col>
            <div className='admin-panel-chat'>
              <img src={require('../../images/head-659652_960_720.png')} />
              <div className='user-info'>
                <span className='name'>user</span>
                <span className='time'>10pm</span>
                <span className='time'>Today</span>
              </div>
            </div>
            <Row className='msg'>
              <p>This message from user side!!!!</p>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className='admin-panel-chat admin'>
              <img src={require('../../images/head-659652_960_720.png')} />
              <div className='user-info'>
                <span className='name'>Admin</span>
                <span className='time'>10pm</span>
                <span className='time'>Today</span>
              </div>
            </div>
            <Row className='msg admin-msg'>
              <p>This message from admin side!!!!!</p>
            </Row>
          </Col>

          {/* <Row>
            <Col>
              <div className='load-msg-btn'>
                <button>Load More</button>
              </div>
            </Col>
          </Row> */}

        </Row>
        <Row>
          <Col>
            <div>
              <textarea className='textarea reply-msg' name='message' placeholder='Enter Message'
              />
            </div>
            <div className='load-msg-btn btn1'>
              <button className='reply-btn'>Add Reply</button>
            </div>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}
export default AdminTicket
