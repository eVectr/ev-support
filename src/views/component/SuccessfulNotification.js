import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { showNotificationAction } from '../../redux/actions/notification/notification'
class SuccessfulNotification extends Component {
  componentDidUpdate (prevProps) {
    setTimeout(() => {
      this.props.dispatch(showNotificationAction({ show: false, text: '' }))
    }, 5000)
  }
  render () {
    let { notificationreducer = {} } = this.props
    let { notification = {} } = notificationreducer
    let { text, show } = notification
    return (
      <Fragment>
        {
          show
            ? <div className='show-notification-msg'>
              <div class='notification is-link'>{text}</div>
            </div> : null
        }
      </Fragment>
    )
  }
}
export default connect(({ dispatch, notificationreducer }) => ({ dispatch, notificationreducer }))(SuccessfulNotification)
