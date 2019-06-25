import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { showNotificationAction } from '../../redux/actions/notification/notification';
class SuccessfulNotification extends Component{

    componentDidUpdate (prevProps) {
        console.log(prevProps.show, 'prevProps.show ')
        console.log(prevProps.show, 'prevProps.show ')

        console.log(prevProps.show !== this.props.show, 'prevProps.show !== this.props.show')
        if (prevProps.show !== this.props.show) {
            setTimeout(() => { this.props.dispatch(showNotificationAction({show: false, text:'' }))}, 3500)
        }
    }

    render(){
        console.log(this.props, 'SuccessfulNotification')
        let { notificationreducer = {} } = this.props
        let { notification = {} } = notificationreducer
        let { text, show = false } = notification
                
        return (
          <Fragment>
              {
                  show ?
                  <div class="notification is-link">{text}</div> : null
              }
          </Fragment>
            
           
        )
    }
}

// export default SuccessfulNotification
export default connect(({dispatch, notificationreducer}) => ({dispatch, notificationreducer}))(SuccessfulNotification)