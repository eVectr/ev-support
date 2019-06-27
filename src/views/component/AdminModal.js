import React, { Fragment } from "react";
import Modal from "react-responsive-modal";
import '../../styles/adminpanel.css'

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class AdminModal extends React.Component {
  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <Fragment>
      <button className ="button is-success send-btn" onClick={this.onOpenModal}>View</button>
      <div style={styles}>
       
        <Modal open={open} onClose={this.onCloseModal}>
          <form className='modal-form'>
            <div className="pading">
              <div className="field">
                <div class="control has-icons-left has-icons-right">
                  <span className='uploaded-name'>
                  <label className="label left_align name">Name:</label> 
                  <p>Test</p>
                  </span>
                </div>

                <div class="control has-icons-left has-icons-right">
                  <span className='uploaded-name'>
                  <label className="label left_align name">Email:</label> 
                  <p>Test@gmail.com</p>
                  </span>
                </div>

                <div class="control has-icons-left has-icons-right">
                  <span className='uploaded-name'>
                  <label className="label left_align name">Transaction Number:</label> 
                  <p>123456789</p>
                  </span>
                </div>

                <div class="control has-icons-left has-icons-right">
                  <span className='uploaded-name'>
                  <label className="label left_align name">Subject:</label> 
                  <p>xyz</p>
                  </span>
                </div>

                <div class="control has-icons-left has-icons-right">
                  <span className='uploaded-name upload-msg '>
                  <label className="label left_align name">Message:</label> 
                  <p className='show-msg '>Text Generator is a copy and paste font generator and font changer that creates cool fonts.</p>
                  </span>
                </div>
            
             
                <div className='uploaded-document'>
                  <div class="control has-icons-left has-icons-right">
                    <span className='uploaded-name'>
                    <label className="label left_align name">Uploaded Document:</label> 
                      <p>Untitled document </p>
                    </span>
                  </div>

                  <div class="control has-icons-left has-icons-right">
                    <span className='uploaded-image'>
                    <label className="label left_align name">Uploaded Image:</label> 
                        <img src = {require('../../images/nature.jpeg')} className="uploaded-image-data"/>
                    </span>
                  </div>

                  <div class="control has-icons-left has-icons-right">
                    <span className='uploaded-name'>
                    <label className="label left_align name">Uploaded Link</label> 
                      <p>https://en.wikipedia.org/wiki/Link</p>
                    </span>
                  </div>
                </div>

              </div>
              <div className="field">
                <label className="label left_align reply-msg">Reply</label>
                <div className="control">
                  <textarea className="textarea reply-msg" name="message" placeholder="Enter Message (Mandatory)" />
                  <button className="button is-success send-btn">Send</button>
                </div>
              </div>
          </div>
        </form>
      </Modal>
      </div>
      </Fragment>
    );
  }
}

export default AdminModal

