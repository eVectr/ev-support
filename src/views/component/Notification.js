import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Container, Row, Col, Table, checkBox, Button } from 'reactstrap'
import NoticePagination from './NoticePagination'
import '../../styles/notification.css'
import { set } from 'mongoose'

//class Notification extends Component{
const Notification = (props) => {
    const [notification, setNotification] = useState([])
    const [selectedId, setSelectedId] = useState([])
    const [allSelectedId, setAllSelectedId] = useState([])
    const [showLoader, setshowLoader] = useState(true)
    const [totalItemsCount, setTotalItemsCount] = useState()
    const [activePage, setactivePage] = useState(1)
    const [limit, setLimit] = useState(0)
    useEffect(() => {
        axios.get(`http://localhost:7788/getnotification`)
            //axios.get(`http://54.165.185.4:7788/getnotification`)
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                   
                    if (res.data[i].SentTo.includes(JSON.parse(localStorage.user)._id)) {
                        setNotification(prev => {
                            const updated = prev.concat(res.data[i])
                            return updated
                        })
                    }
                }
                //setTotalItemsCount(res.data.length)
            })
        setshowLoader(false)
    }, [])

    let OnButtonClick = (Id, index) => {
        axios.post(`http://localhost:7788/changenotificationstatus`, { Id: Id })
            .then(res => {
                setNotification(prevState => prevState.map(
                    item => item._id === Id ? {...item, FontStyle: true} : item
                ))
            })
    }

    let test = []

    let handleCheckBoxChange = (Id) => {
        setNotification(prevState => prevState.map(
            item => {
                return(
                    item._id === Id ? {...item, isChecked: !item.isChecked} : item
                )
            }
        ))
         setSelectedId([...selectedId, Id])
    }

    let allselectedarray = []
    let onCheckall = () =>{
        let i = (activePage * 5) - 5
        let l = (activePage * 5)
        for(i ; i<l ; i++ ){
            notification[i].isChecked = !notification[i].isChecked 
           // setNotification(notification)
            setNotification(prevState => prevState.map((item,index)=> 
                index === i ? {...item, isChecked: true} : item
            ))
            allselectedarray.push(notification[i]._id)
            setAllSelectedId(allselectedarray)
        }
    }

    let handlePageChange = (pageNumber) => {
        setactivePage(pageNumber)
    }

    let usersListPagination = notification.slice((activePage * 5) - 5, (activePage * 5))
    let deleteNotice = () => {
        if(selectedId.length > 0){
            for (let i = 0; i < selectedId.length; i++) {
                axios.post(`http://localhost:7788/deletenotification`, { Id: selectedId[i] })
                    //  axios.post(`http://54.165.185.4:7788/deletenotification`, {Id:inputValue[i]})
                    .then(res => {
                       setSelectedId([])
                    })
            }
        }
        else{
            for (let i = 0; i < allSelectedId.length; i++) {
                axios.post(`http://localhost:7788/deletenotification`, { Id: allSelectedId[i] })
                    //  axios.post(`http://54.165.185.4:7788/deletenotification`, {Id:inputValue[i]})
                    .then(res => {
                       setAllSelectedId([])
                    })
            }
        }
       
    }
   
    console.log("selected Id =>", selectedId)
    return (
        <Container fluid>
            <Row className="notify-table">
                <Col>

                    <div className="notification-list">
                        <Col className='col-12'>
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
                                            <th className="select-list"><input type="checkbox" class="select-list-check" onClick={onCheckall}/>Select <hr /></th>
                                            <th>Notification Type <hr /></th>
                                            <th>Data Received <hr /></th>
                                            <th>Sent by <hr /></th>
                                            <th>Action <hr /></th>

                                        </tr>
                                    }
                                </thead>
                                <tbody>
                                    {usersListPagination.map(function (d, idx) {
                                      
                                        return (
                                            <tr key={idx} className={` ${d.Type == 'eVectr Urgent Message' ? d.FontStyle == true ? "normallistText" : "boldlistText activeurgentMessage" : d.Type == 'Missed Chat Message' ? d.FontStyle == true ? "normallistText" : "boldlistText" : d.FontStyle == true ? "normallistText" : "boldlistText"}`}   >{d.name}
                                                <td className="check-table"><div className="alert"><i className={` ${d.Type == 'eVectr Urgent Message' ? "fa fa-exclamation-triangle activeurgentMessage" : d.Type == 'Complete Transaction Survey' ? "fa fa-exclamation-triangle" : d.Type == 'Complete Client Survey' ? "fa fa-exclamation-triangle" : ''}`} aria-hidden="true"></i></div><div className="check-alert">
                                                    <input type="checkbox" checked ={d.isChecked}
                                                    onClick={() => handleCheckBoxChange(d._id)} className="check-list-notifi" /></div></td>
                                                {/* <td ><i class="fa fa-envelope" aria-hidden="true"></i>{d.Type}</td> */}

                                                <td className="typeicons"><i className={` ${d.Type == 'eVectr Urgent Message' ? "fa fa-envelope activeurgentMessage" : d.Type == 'Missed Chat Message' ? "fa fa-comment" : d.Type == 'User to User Message' ? "fa fa-envelope" : d.Type == 'Complete Client Survey' ? "fa fa-list-alt clientblue" : "fa fa-list-alt"}`} aria-hidden="true"></i>{d.Type}</td>
                                                <td>{moment(d.Date).format('lll')}</td>
                                                <td>{d.SentBy}</td>
                                                <td><Button className={` ${d.Type == 'eVectr Urgent Message' ? "activeurgentMessage" : d.Type == 'Missed Chat Message' ? "missedchatbtn" : d.Type == 'Complete Client Survey' ? "Surveybtn" : d.Type == 'User to User Message' ? "missedchatbtn" : d.Type == 'Complete Transaction Survey' ? "Transactionbtn" : ""}`} onClick={() => OnButtonClick(d._id, idx)}>{d.Action}</Button></td>
                                            </tr>)
                                    })}
                                </tbody>

                            </Table>
                        </Col>
                        <div className="delete-select">
                            <button onClick={deleteNotice}>Delete Selected</button>
                        </div>
                        <NoticePagination totalItemsCount={notification.length} handlePageChange={handlePageChange}
                            activePage={activePage}></NoticePagination>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Notification
