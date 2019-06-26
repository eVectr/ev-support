import React from 'react'
import ReactLoading from 'react-loading'
import '../../styles/loader.css'


const Loader = (props) => {
    return (
        props.loading ?
            <div className="page-loader">
                <ReactLoading type="spin" color="rgb(27, 95, 200)" height={25} width={25} />
            </div>
            : null
    );
}


export default Loader