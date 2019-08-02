import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../../styles/Footer.css'

const Footer = (props) => {
    return (
        <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>CopyRight@zestgeek.com</strong> 
          </p>
        </div>
      </footer>
      )
}
const FooterWithRouter = withRouter(Footer)
export default connect(state => state)(FooterWithRouter)
