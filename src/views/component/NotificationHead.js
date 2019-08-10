import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Row, Col } from 'reactstrap';
import NotificationList from './NotificationList'
import NoticePagination from './NoticePagination'


let NotificationHead = () => {
    const [limit, setLimit] = useState(5)
    const [start, setStart] = useState(0)
    const [inputValue, setInputValue] = useState([])
    const [random, setRandom] = useState()
    const [notificationList1, setNotificationList1] = useState([])
    const [totalItemsCount, settotalItemsCount] = useState()
    const [activePage, setactivePage] = useState(1)
    useEffect(() => {
       // axios.get(`http://localhost:7788/getnotification`)
        axios.get(`http://54.165.185.4:7788/getnotification`)
          .then(res => {
            //  console.log('res res res ==>', res.data.reverse())
            setNotificationList1(res.data.reverse())
            settotalItemsCount(res.data.length)
          })
      }, [random])
   
   
    let usersListPagination = notificationList1.slice(activePage, activePage + 5)
    let totalPages = Math.ceil((notificationList1.length)/limit)
    console.log("total page ===>", totalPages)
    
    let paginate = (number) => {
        console.log(number, 'number')
        let lastIndexOf = number * limit - limit
        setStart(lastIndexOf)

    }

    let  handlePageChange = (pageNumber) => {
        setactivePage(pageNumber)
      }

    let totalRecord = notificationList1.length

    let deleteElement = () => {
        for(let i = 0; i< inputValue.length; i++){
            //axios.post(`http://localhost:7788/deletenotification`, {Id:inputValue[i]})
            axios.post(`http://54.165.185.4:7788/deletenotification`, {Id:inputValue[i]})
            .then(res => {
                setRandom(Math.random())
                setInputValue([])
                console.log('deleted')
                window.location.reload()
            })
        }
    }

    let checkboxHandeler = (e, id) =>{
        setInputValue([...inputValue, id])
    }
    console.log(activePage, 'active Pages')
    return(
        <div>
            <Row>
                <Col>
                    <div className='notification-head'>
                        <Col className='col-2'>
                            <div>
                                {/* <b className='notification-select'><input type="checkbox"/><span>Select</span></b> */}
                                <b>Select</b>
                                <span className= 'notification-select'></span>
                            </div>
                        </Col> 
                        <Col className='col-3'>
                            <div>
                                <b>Notification Type</b>
                                <span className= 'notification-type heading'></span>
                            </div>
                        </Col>
                        <Col className='col-3'>
                            <div>
                                <b>Data Received</b>
                                <span className='data-recevied heading'></span>
                            </div>
                        </Col>
                        <Col className='col-2'>
                            <div>
                                <b>Sent By</b>
                                <span className='sent heading'></span>
                            </div>
                        </Col>
                        <Col className='col-2'>
                            <div>
                                <b>Action</b>
                                <span className='action heading'></span>
                            </div>
                        </Col> 
                    </div>
                    {
                        usersListPagination.map((notificationItem, index)=>{
                            return(
                                <NotificationList  key ={index} notificationItem={notificationItem} getCheckboxValue={(e) => checkboxHandeler(e, notificationItem._id, index)}/>
                            )
                        })
                    }   
                </Col>
            </Row> 
            <Row className = 'delete-select'>
                <Col>
                    <button className='delete-select-btn' onClick={ deleteElement}>Delete Selected</button>
                </Col>
            </Row> 
            <Row>
                <Col>
                    <NoticePagination totalItemsCount={totalItemsCount} activePage={activePage} handlePageChange={handlePageChange}></NoticePagination>
                </Col>
            </Row>
        </div>
    ) 
}
export default NotificationHead
