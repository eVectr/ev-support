import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Container, Row, Col, Table, checkBox, Button } from 'reactstrap'
import NotificationHead from './NotificationHead'
import '../../styles/notification.css'
import { set } from 'mongoose';

//class Notification extends Component{
const Notification = (props) => {
    const [notification, setNotification] = useState([])
    const [selectedId, setSelectedId] = useState([])
    const [showLoader, setshowLoader] = useState(true)
    useEffect(() => {
         axios.get(`http://localhost:7788/getnotification`)
         //axios.get(`http://54.165.185.4:7788/getnotification`)
           .then(res => {
               console.log('res res res ==>', res.data)
                setNotification(res.data.reverse())
           })
           setshowLoader(false)
       }, [])
       let OnButtonClick = (Id) =>{
        axios.post(`http://localhost:7788/changenotificationstatus`, {Id: Id}) 
        .then(res =>{
             axios.get(`http://localhost:7788/getnotification`)
         //axios.get(`http://54.165.185.4:7788/getnotification`)
           .then(res => {
               console.log('res res res ==>', res.data)
                setNotification(res.data.reverse())
           })
        })
       }
    
    let handleCheckBoxChange = (id) =>{
        setSelectedId([...selectedId, id])
    }
    let deleteNotice = () => {
        for(let i = 0; i< selectedId.length; i++){
            axios.post(`http://localhost:7788/deletenotification`, {Id:selectedId[i]})
          //  axios.post(`http://54.165.185.4:7788/deletenotification`, {Id:inputValue[i]})
            .then(res => {
                setSelectedId([])
                console.log('deleted')
            })
        }
    }
    return (
        <Container fluid>
            <Row className="notify-table">
                <Col>
                    {/* <div className='notification notification-detail'>
                            <div className='notification-header'>
                                <i className="fas fa-cog"></i><span>Notification</span>
                            </div>
                            <div className='notification-table'>
                            <p>helo</p>
                            </div>
                           
                        </div> */}
                    <Table>
                        <thead>
                            <tr style={{ 'background': "#dee2e6" }} className="table-head">
                                <th><i class="fa fa-cog" aria-hidden="true"></i>Notification</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        {showLoader ?
                        <div className='loader-img'>
                            <img src={require('../../images/loader.gif')} />
                        </div> :
                            <tr className="table-head">
                                <th>Select <hr/></th>
                                <th>Notification Type <hr/></th>
                                <th>Data Received <hr/></th>
                                <th>Sent by <hr/></th>
                                <th>Action <hr/></th>

                            </tr>
                             }
                        </thead>
                        <tbody>
                        {notification.map(function (d, idx) {

                            return (
                                <tr key={idx} className={` ${d.Type == 'eVectr Urgent Message' ? d.FontStyle == true ? "normallistText" : "boldlistText activeurgentMessage"  : d.Type == 'Missed Chat Message' ?  d.FontStyle == true ? "normallistText" : "boldlistText" : d.FontStyle == true ? "normallistText" : "boldlistText"   }`}   >{d.name}
                                    <td className="check-table"><div className="alert"><i className={` ${d.Type == 'eVectr Urgent Message' ? "fa fa-exclamation-triangle activeurgentMessage" : d.Type == 'Complete Transaction Survey' ? "fa fa-exclamation-triangle" : d.Type == 'Complete Client Survey' ? "fa fa-exclamation-triangle" : '' }`} aria-hidden="true"></i></div><div className="check-alert"><input type="checkbox"
                                    onClick={() => handleCheckBoxChange(d._id)} className="check-list-notifi"/></div></td>
                                    {/* <td ><i class="fa fa-envelope" aria-hidden="true"></i>{d.Type}</td> */}
                                    
                                    <td className="typeicons"><i className={` ${d.Type == 'eVectr Urgent Message' ? "fa fa-envelope activeurgentMessage" : d.Type == 'Missed Chat Message' ? "fa fa-comment" : d.Type == 'User to User Message' ? "fa fa-envelope" : d.Type == 'Complete Client Survey' ? "fa fa-list-alt clientblue": "fa fa-list-alt"  }`} aria-hidden="true"></i>{d.Type}</td>
                                    <td>{moment(d.Date).format('lll')}</td>
                                    <td>{d.SentBy}</td>
                                    <td><Button className={` ${d.Type == 'eVectr Urgent Message' ? "activeurgentMessage" : d.Type == 'Missed Chat Message' ? "missedchatbtn" : d.Type == 'Complete Client Survey' ? "Surveybtn" : d.Type == 'User to User Message' ? "missedchatbtn": d.Type == 'Complete Transaction Survey' ? "Transactionbtn": "" }`} onClick ={() => OnButtonClick(d._id)}>{d.Action}</Button></td>
                                </tr>)
                        })}
                        </tbody>
                       
                    
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Notification
