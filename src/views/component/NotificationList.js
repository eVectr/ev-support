import React, {useState, useEffect} from 'react'
import moment from 'moment'
import {Row, Col} from 'reactstrap'
import ButtonComponent from './Button'
import CheckBox from './CheckBox' 

const NotificationList = (props) =>{
    const { notificationItem ,getCheckboxValue, index, checkedValue} = props
    const{ Type, Date, SentBy, Action, color, style, _id, Checked } = notificationItem
    let [selectedIds, setSelectedIds] = useState([])
  

    let handleButtonClick = (action) =>{
        switch(action) {
            case 'Complete Client Survey':
                window.location="http://18.219.191.74:3000/clientsurvey"
                 break;
            case 'Complete Transaction Survey':
                window.location="http://18.219.191.74:3000/transactionsurvey"
                 break;
            case 'User to User Message':
                 window.location="http://3.83.23.220:7007/messageLogs"
                
                  break;
            case 'eVectr Urgent Messages':
                 window.location="http://3.83.23.220:7007/messageLogs"
                  break;
            case 'Missed Chat Message':
                  window.location="https://reactchat.softuvo.xyz/chat"
                  break;
            default:
              break
          }   
    }

    let buttonColor = (Type) => {
        console.log(Type,'Type')
        switch(Type) {
            
            case 'Complete Client Survey':
            return {backgroundColor:"lightgray"}
                 
            case 'Complete Transaction Survey':
            return {backgroundColor:"black"}
                 
            case 'User to User Message':
            return {backgroundColor:"green"}
                
            case 'eVectr Urgent Messages':
            return {backgroundColor:"red"}
                 
            default:
            return {backgroundColor:"green"}
          }   
    }
   

        return(
            <div>
                <Row>
                    <Col>
                        <div className='notification-list'>
                            <Col className='col-2'>
                                <div>
                                <CheckBox getCheckboxValue={getCheckboxValue} checked={checkedValue} onChange ={(e) => getCheckboxValue(e, notificationItem)}/>
                                </div>
                            </Col>
                            <Col className='col-3'>
                                <div className='message'>
                                    <i className="fas fa-comment-dots"></i>
                                    <span>{Type}</span>
                                </div>
                            </Col>
                            <Col className='col-3'>
                                <div className='date'>
                                    <span>{moment(Date).format('lll')}</span>
                                    {/* <span className="time">{Date}</span> */}
                                </div>  
                            </Col>
                            <Col className='col-2'>  
                                <div>
                                    <span className='notification-name'>{SentBy}</span>  
                                </div> 
                            </Col>  
                           
                            <Col className='col-2 notification-btn' >
                                <ButtonComponent className='list-btn' children={Action} color={color} 
                                style={buttonColor(Type)} onClick ={() => handleButtonClick(Type)}/>
                            </Col>
                              
                        </div>
                    </Col>
                </Row> 
            </div>
        ) 
}
export default NotificationList