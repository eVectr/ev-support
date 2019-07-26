import React, { useEffect, useState } from 'react'
import '../../styles/MessageLogs.css'
import classnames from 'classnames';
import { Container, Row, Col,Form, FormGroup, Label, Input, FormText, Button,TabContent, TabPane, Nav, NavItem, NavLink,Card,CardTitle,CardText} from 'reactstrap'
const MessageLogs = (props) => {
const [activeTab, setActiveTab] = useState('1')
let setactive = (parameter) =>{
    if(parameter == 1){
        setActiveTab('1')
    }else if(parameter == 2){
        setActiveTab('2')
    }
}
return (
    <Container>
      <Row>
        <Col md='9' className="message-main">
        <h1 className='heading'>Message Logs</h1>
          <div className="message-inner">
                <Form>
                    <Row form>
                        <FormGroup className="mb-4 mr-sm-3 mb-sm-0">
                            <Input type="text" name="text" id="exampleEmail" placeholder="1232" />
                        </FormGroup>
                        <FormGroup className="mb-4 mr-sm-3 mb-sm-0">
                            <Input type="text" name="text" id="examplePassword" placeholder="Hello" />
                        </FormGroup>
                        <Button className="message-btn">Send SMS</Button>
                    </Row>
                </Form>
          </div>
        </Col>
      </Row>
      <Row>
      <Nav tabs>
         <NavItem>
            <NavLink 
               onClick={() => setactive('1')}
               className={`${activeTab == '1'?'nav-link active':'nav-link notactive'}`}>   
                 Admin Message
             </NavLink>
        </NavItem>
            <NavItem>
                <NavLink
                   onClick={() => setactive('2')}
                   className={`${activeTab == '1'?'nav-link notactive':'nav-link active'}`}
                   >
                    User Message
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
        {activeTab == '1'?
         <TabPane tabId="1">
         <Row>
         <Col sm="12">
         
           <Card body className="innercard">
           <div class="user-info">
               <span class="name">Admin</span>
               <span class="time">2019-07-25</span>
               <p>Helo</p>
               <span class="name">Admin</span>
               <span class="time">2019-07-24</span>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
               <span class="name">Admin</span>
               <span class="time">2019-07-22</span>
               <p>Lorem Ipsum is simply dummy text of the printing</p>
               <span class="name">Admin</span>
               <span class="time">2019-07-15</span>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
               <span class="name">Admin</span>
               <span class="time">2019-07-10</span>
               <p>Lorem Ipsum </p>
            </div>
            
           </Card>
         </Col>
        
       </Row>
       </TabPane>:
       <TabPane tabId="2" className="user">
       <Row>
         <Col sm="12">
           <Card body>
             <div class="user-info">
               <div><span class="name">AKASH VERMA</span>
                    <span className="reply-message"><i class="fas fa-reply"></i></span>
                    <span class="time">2019-07-25</span>
                    <p>Helo</p>
               </div>
               <span class="name">Rahul</span>
               <span className="reply-message"><i class="fas fa-reply"></i></span>
               <span class="time">2019-07-24</span>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
               <span class="name">John</span>
               <span className="reply-message"><i class="fas fa-reply"></i></span>
               <span class="time">2019-07-22</span>
               <p>Lorem Ipsum is simply dummy text of the printing</p>
               <span class="name">Sia</span>
               <span className="reply-message"><i class="fas fa-reply"></i></span>
               <span class="time">2019-07-15</span>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
               <span class="name">Sam</span>
               <span className="reply-message"><i class="fas fa-reply"></i></span>
               <span class="time">2019-07-10</span>
               <p>Lorem Ipsum </p>
            </div>
            
           </Card>
         </Col>
       </Row>
     </TabPane>
        }
    </TabContent>
  </Row>
</Container>
  )
}

export default MessageLogs
