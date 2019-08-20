import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Container, Row, Col, Table, checkBox, Button } from 'reactstrap'
import NoticePagination from './NoticePagination'
import '../../styles/notification.css'
const Notification = (props) => {
    const [notification, setNotification] = useState([])
    const [selectedId, setSelectedId] = useState([])
    const [allSelectedId, setAllSelectedId] = useState([])
    const [ checkValue , setValueData ] = useState(false)
    const [totalItemsCount, setTotalItemsCount] = useState()
    const [activePage, setactivePage] = useState(1)
    const [limit, setLimit] = useState(0)
    const [showLoader, setshowLoader] = useState(true)
    const [isNoNotification, setisNoNotification] = useState(false)
    const onChangeText = e => {
        setValueData(e.target.checked)
    }
    useEffect(() => {
        setshowLoader(true)
          //axios.get(`http://localhost:7788/getnotification`)
          axios.get(`http://54.165.185.4:7788/getnotification`)
          .then(res => {
              if(res.data.length < 1){
                  setisNoNotification(true)
              }else{
                  for (let i = 0; i < res.data.length; i++) {
                      if (res.data[i].SentTo.includes(JSON.parse(localStorage.user)._id)) {
                          setNotification(prev => {
                              const updated = prev.concat(res.data[i])
                              return updated
                          })
                          setshowLoader(false)
                      }
                  }
                  setTotalItemsCount(res.data.length)
              }
          })
    }, [])

    let OnButtonClick = (Id, index, Type, NotificationId, CaseNo) => {
        
     
        // axios.post(`http://localhost:7788/changenotificationstatus`, { Id: Id })
        axios.post(`https://ev2.softuvo.xyz/changenotificationstatus`, { Id: Id })
            .then(res => {
                setNotification(prevState => prevState.map(
                    item => item._id === Id ? { ...item, FontStyle: true } : item
                ))
                switch(Type) {
                    case 'Complete Client Survey':
                            window.open('https://ev2.softuvo.xyz/clientsurvey')
                        //window.location="http://18.219.191.74:3000/clientsurvey"
                         break;
                    case 'Complete Transaction Survey':
                            window.open('https://ev2.softuvo.xyz/transactionsurvey')
                       // window.location="http://18.219.191.74:3000/transactionsurvey"
                         break;
                    case 'User to User Message':
                        let url = (NotificationId.concat('&',CaseNo)).concat('?','true') 
                        props.history.push('/messageLogs/' + url)
                 
                           // window.open('http://54.165.185.4:7007/messageLogs')
                       //  window.location="http://54.165.185.4:7007/messageLogs"
                        
                          break;
                    case 'eVectr Urgent Message':
                            let adminurl = (NotificationId.concat('&',CaseNo)).concat('?','true') 
                            props.history.push('/messageLogs/' + adminurl)
                          break;
                    case 'Missed Chat Message':
                            window.open('https://reactchat.softuvo.xyz/chat/' + NotificationId)
                          break;
                    default:
                      break
                  }
            })    
    }
    let test = []
    let handleCheckBoxChange = (Id) => {
        setNotification(prevState => prevState.map(
            item => {
                console.log(item, 'item')
                return (
                    item._id === Id ? { ...item, isChecked: !item.isChecked } : item
                )
            }
        ))
        setSelectedId([...selectedId, Id])
    }
    let onCheckall = () => {
        let allselectedarray = []
        let i = (activePage * 5) - 5
        let l = (activePage * 5)
        let usersListPagination = notification.slice((activePage * 5) - 5, (activePage * 5))
        for (i; i < usersListPagination.length; i++) {
            notification[i].isChecked = !notification[i].isChecked
            setNotification(prevState => prevState.map((item, index) =>
                index === i ? { ...item, isChecked: true } : item
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
        if (selectedId.length > 0) {
            for (let i = 0; i < selectedId.length; i++) {
                // axios.post(`http://localhost:7788/deletenotification`, { Id: selectedId[i] })
             axios.post(`https://ev2.softuvo.xyz/deletenotification`, { Id: selectedId[i] })
                    .then(res => {
                        setSelectedId([])
                        setValueData(false)
                        axios.get(`https://ev2.softuvo.xyz/getnotification`)
                            .then(res => {
                                const { data } = res
                                setNotification(data)
                            })
                    })
            }
        }
        else {
            for (let i = 0; i < allSelectedId.length; i++) {
                //axios.post(`http://localhost:7788/deletenotification`, { Id: allSelectedId[i] })
                    axios.post(`https://ev2.softuvo.xyz/deletenotification`, {Id:selectedId[i]})
                    .then(res => {
                        console.log(res, 'res')
                        setAllSelectedId([])
                        axios.get(`https://ev2.softuvo.xyz/getnotification`)
                            .then(res => {
                                console.log(res, 'resres')
                                const { data } = res
                                setNotification(data)
                                setValueData(false)
                            })
                    })
            }
        }
       
    }
 
    return (
        <Container fluid>
           <Row className="notify-table">
           <Fragment>{isNoNotification ?
                <div className="no-msg-list"><h3>No Notification</h3></div> :
            <Col>
                <Fragment>
                    {showLoader?
                        <div className='loader-img'>
                            <img src={require('../../images/loader.gif')} />
                        </div> :
                        <div className="notification-list">
                            <Col className='col-12'>    
                                <Table>
                                    <thead>
                                        <tr className="table-head heading-noti">
                                            <th><i class="fa fa-cog" aria-hidden="true"></i>Notification</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        <tr className="table-head">
                                            <th className="select-list"><input type="checkbox" checked={checkValue} onChange={onChangeText} class="select-list-check" onClick={onCheckall} />Select <hr /></th>
                                            <th>Notification Type <hr /></th>
                                            <th>Data Received <hr /></th>
                                            <th>Sent by <hr /></th>
                                            <th>Action <hr /></th>
                                        </tr>
                                    </thead>
                                
                                    <tbody>
                                    {usersListPagination.map(function (d, idx) {
                                        return (
                                            <tr key={idx} className={` ${d.Type == 'eVectr Urgent Message' ? d.FontStyle == true ? "normallistText activeurgentMessage" : "boldlistText activeurgentMessage" : d.Type == 'Missed Chat Message' ? d.FontStyle == true ? "normallistText" : "boldlistText" : d.FontStyle == true ? "normallistText" : "boldlistText"}`}   >{d.name}
                                                <td className="check-table">
                                                    <div className="alert">
                                                        <i className={` ${d.Type == 'eVectr Urgent Message' ? "fa fa-exclamation-triangle activeurgentMessage" : d.Type == 'Complete Transaction Survey' ? "fa fa-exclamation-triangle" : d.Type == 'Complete Client Survey' ? "fa fa-exclamation-triangle" : ''}`} aria-hidden="true"></i></div><div className="check-alert">
                                                            <input type="checkbox" checked={d.isChecked}
                                                        onClick={() => handleCheckBoxChange(d._id)} className="check-list-notifi" />
                                                        </div>
                                                    </td>
                                                    <td className="typeicons">
                                                        <i className={` ${d.Type == 'eVectr Urgent Message' ? "fa fa-envelope activeurgentMessage" : d.Type == 'Missed Chat Message' ? "fa fa-comment" : d.Type == 'User to User Message' ? "fa fa-envelope" : d.Type == 'Complete Client Survey' ? "fa fa-list-alt clientblue" : "fa fa-list-alt"}`} aria-hidden="true"></i>{d.Type}
                                                    </td>
                                                    <td>
                                                        {moment(d.Date).format('lll')}
                                                    </td>
                                                    <td>
                                                        {d.SentBy}
                                                    </td>
                                                    <td>
                                                        <Button className={` ${d.Type == 'eVectr Urgent Message' ? "activeurgentMessage" : d.Type == 'Missed Chat Message' ? "missedchatbtn" : d.Type == 'Complete Client Survey' ? "Surveybtn" : d.Type == 'User to User Message' ? "missedchatbtn" : d.Type == 'Complete Transaction Survey' ? "Transactionbtn" : ""}`} onClick={() => OnButtonClick(d._id, idx, d.Type, d.NotificationId, d.CaseNo)}
                                                       >{d.Action}</Button>
                                                    </td>
                                            </tr>     
                                            )
                                        })}
                                    </tbody>
                                </Table>
                             </Col>
                                <div className="delete-select">
                                    <button onClick={deleteNotice}>Delete Selected</button>
                                </div>
                                <div>
                                   <NoticePagination totalItemsCount={notification.length} handlePageChange={handlePageChange}
                                    activePage={activePage}></NoticePagination>
                                </div>   
                            </div>  
                      }</Fragment>     
             </Col>
             }</Fragment> 
            </Row>    
        </Container>
    )
}
export default Notification
