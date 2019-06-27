import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { showNotificationAction } from '../../redux/actions/notification/notification';
class SuccessfulNotification extends Component{

    componentDidUpdate (prevProps) {
        console.log(prevProps.show, 'prevProps.show ')
        console.log(prevProps.show, 'prevProps.show ')
        setTimeout(() => {
            this.props.dispatch(showNotificationAction({show: false, text:'' }))
        }, 2000);
        // if (prevProps.show !== this.props.show) {
        //      setTimeout(() => { this.props.dispatch(showNotificationAction({show: false, text:'' }))}, 3500)
        // }
    }
    

    render(){
        console.log(this.props, 'SuccessfulNotification')
        let { notificationreducer = {} } = this.props
        let { notification = {} } = notificationreducer
        let { text, show } = notification
        // const{text, show} = this.props     
        return (
          <Fragment>
              {
                  show ?
                    <div className='show-notification-msg'>
                        <div class="notification is-link">{text}</div>
                    </div> : null
              }
          </Fragment>
            
           
        )
    }
}

// export default SuccessfulNotification
export default connect(({dispatch, notificationreducer}) => ({dispatch, notificationreducer}))(SuccessfulNotification)