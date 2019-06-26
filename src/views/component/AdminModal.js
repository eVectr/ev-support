import React from "react";
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
      <div style={styles}>
        <button className ="button is-success" onClick={this.onOpenModal}>View</button>
        <Modal open={open} onClose={this.onCloseModal}>
        <form>
        <div className="pading">
          <div className="field">
            <div class="control has-icons-left has-icons-right">
              <span>
              <label className="label left_align">Name</label> 
              <p>Test</p>
              </span>
              
            </div>
          </div>
          </div>

          <div className="field">
            <label className="label left_align">Reply</label>
            <div className="control">
              <textarea className="textarea" name="message" placeholder="Enter Message (Mandatory)" />
              <button className="button is-success">Send</button>
            </div>
            </div>
        </form>
        
        </Modal>
      </div>
    );
  }
}

export default AdminModal

