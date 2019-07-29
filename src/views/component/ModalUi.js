import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Modal from 'react-responsive-modal'

const ModalUi = props => {
   const [isOpen, setIsOpen] = useState(false)

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
console.log("props ==>", props)
  return (
    <div style={styles}>
      {/* <h2>react-responsive-modal</h2> */}
      <button onClick={onOpenModal}>Open modal</button>
      <Modal open={props.open||isOpen} onClose={onCloseModal}>
        <h2>Simple centered modal</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
      </Modal>
    </div>
  )
}
export default ModalUi
