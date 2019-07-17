
import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import '../../styles/adminpanel.css'

const PaginationAdmin = ({ paginate, nextPage, pageArray, pageNumber}) => {
    console.log(pageArray, 'pageArraypageArray')

   
  
  
  return (

    <Pagination className='pagination-pages'>
      
      <PaginationItem>
          <button disabled = {pageNumber <=1}>prev</button>
      </PaginationItem>
        {
          pageArray.map((number, index) => {
            return (
            <PaginationItem active ={number == index} >
                    <button  onClick = {() => paginate(number, index)}>{number}</button>
            </PaginationItem>
            )
          })
        }
      <PaginationItem>
      <button>Next</button>
      </PaginationItem>
      
    </Pagination>

  )
}
export default PaginationAdmin
