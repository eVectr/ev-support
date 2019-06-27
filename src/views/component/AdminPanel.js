import React, {Component} from 'react'
import AdminModal from './AdminModal'
import '../../styles/adminpanel.css'
class AdminPanel extends Component {
 
    render(){
        return(
            <div className='container '>
                <div className='row'>
                    <div className='admin-panel'>
                        <h3 className='admin-header'>Admin Panel</h3>
                            <div className='search-cases'>
                                <input type="text" className='link-data search'></input>
                                <button type="button" className='search-btn'>Search</button> 
                            </div>
                        </div>
                    </div>
                {/* <div className='card'> */}
                <div className='table'>
                    <div className='admin-cases'>
                        <span>Case Number:12345</span> 
                        <span>Name:Kripal Ramola</span>
                        <span>Email:Kripalramola16@gmail.com</span>
                        <span>Date:24|06|2019</span>
                        
                    </div>
                    <AdminModal></AdminModal>
                {/* </div> */}
                </div>
            </div>
        )
    }
}
export default AdminPanel