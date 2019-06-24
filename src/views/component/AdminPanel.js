import React, {Component} from 'react'
import '../../styles/adminpanel.css'
class AdminPanel extends Component {
    render(){
        return(
            <div className='container '>
               
                <div className='row'>
                <div className='admin-panel'>
                    <h3 className='header'>Admin Panel</h3>
                        <div>
                            <input type="text" className='link-data search'></input>
                            <button type="button" className='link-btn'>Search</button> 
                        </div>
                    </div>
                </div>
                <div className='card'>
                </div>
            </div>
        )
    }
}
export default AdminPanel