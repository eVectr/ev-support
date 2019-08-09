import React, {useState, useEffect} from 'react'
import Pagination from "react-js-pagination"
 
let NoticePagination= (props) => {
  
    return (
      <div>
        <Pagination
          activePage={props.activePage}
          itemsCountPerPage={10}
          totalItemsCount={props.totalItemsCount}
          pageRangeDisplayed={5}
          onChange={props.handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    )
  
}
 
export default  NoticePagination