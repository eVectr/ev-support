
import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import '../../styles/adminpanel.css'

const PaginationAdmin = ({ paginate, nextPage, pageArray, pageNumber }) => {
  console.log(pageArray.length, 'pageArray')
  console.log(pageNumber, 'pageNumber')


  return (

    <Pagination className='pagination-pages'>

      <PaginationItem>
        <PaginationLink disabled={pageNumber <= 1}  onClick={() => paginate ( pageNumber - 1 ) }>prev</PaginationLink>
      </PaginationItem>
      {
        pageArray.map((number, index) => {
          return (
            <PaginationItem active={number === pageNumber} disabled={number !== pageNumber}>
              <PaginationLink onClick={() => paginate(number, index)}>{number}</PaginationLink>
            </PaginationItem>
          )
        })
      }
      <PaginationItem>
        <PaginationLink disabled={pageNumber === pageArray.length} onClick={() => paginate ( pageNumber + 1 ) }>Next</PaginationLink>
      </PaginationItem>

    </Pagination>

  )
}
export default PaginationAdmin
