  import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Modal from 'react-responsive-modal'
import {Button} from 'reactstrap'
import Select from 'react-select'
const ModalUi = props => {
   const [isOpen, setIsOpen] = useState(false)
   const options = [
    { value: 'Love', label: 'Love' },
    { value: 'Manoj', label: 'Manoj' },
    { value: 'Ajay', label: 'Ajay' },
    { value: 'Kripal', label: 'Kripal' },
    { value: 'Rajat', label: 'Rajat' },
    { value: 'Trivedi', label: 'Tridevi' },
    { value: 'Joshua', label: 'Joshua' }
   ]

  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }

  let onOpenModal = () => {
    if(props.openModal){
      props.openModal()
    }else{
      setIsOpen(true)
    }
    
  }

  let onCloseModal = () => {
    if(props.closeModal){
      props.closeModal()
    }else{
      setIsOpen(false)
    }
   
  }
  // const MyComponent = () => (
  //   <Select options={options} />
  //  )
console.log("props ==>", props)
  return (
    <div style={styles} >
      {/* <h2>react-responsive-modal</h2> */}
      <Modal open={props.open||isOpen} onClose={onCloseModal} classNames={"sent-modal"} center>
      <div className="sent-modal">
       <h2>New Message</h2>
        <div className="modal-inner">
          <label>To:</label> <Select options={options} />
          <textarea placeholder="write a message"></textarea>
          <Button className="message-btn">Send</Button>
        </div>
        </div>
      </Modal>
    </div>
   
  )
}
export default ModalUi
