import { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class RouteChangeObserver extends Component {
  render () {
    return this.props.children
  }
}
const connectWithReudx = connect(state => state)(RouteChangeObserver)

export default withRouter(connectWithReudx)
