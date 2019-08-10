import React, {Component} from 'react'
import { Container, Row, Col } from 'reactstrap'
import NotificationHead from './NotificationHead'
import '../../styles/notification.css'

class Notification extends Component{
    render(){
        return(
            <Container fluid>
                <Row>
                    <Col>
                        <div className='notification'>
                            <div className='notification-header'>
                                <i className="fas fa-cog"></i><span>Notification</span>
                            </div>
                            <div className='notification-table'>
                            <p>helo</p>
                            </div>
                           
                        </div>
                    </Col>
                </Row>
            </Container>
        ) 
    }
}
export default Notification
