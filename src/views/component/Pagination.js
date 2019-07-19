
import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import '../../styles/adminpanel.css'

const PaginationAdmin = ({ paginate, pageNumber, totalPages, isActive }) => {
  let pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }
  return (
    <Pagination className='pagination-pages'>
      <PaginationItem>
        <PaginationLink disabled={pageNumber <= 1} onClick={() => paginate(pageNumber - 1)} className={pageNumber > 1 ? 'pagination-Color' : ''} >prev</PaginationLink>
      </PaginationItem>
      {
        pageNumbers.map((number, index) => {
          return (
            <PaginationItem active={number === pageNumber} disabled={number !== pageNumber} >
              <PaginationLink onClick={() => paginate(number, index)} className={number === pageNumber ? 'pagination-Color' : ''}>{number}</PaginationLink>
            </PaginationItem>
          )
        })
      }
      <PaginationItem>
        <PaginationLink disabled={pageNumber === pageNumbers.length} onClick={() => paginate(pageNumber + 1)} className={pageNumber === pageNumbers.length ? '' : 'pagination-Color'}>Next</PaginationLink>
      </PaginationItem>
    </Pagination>

  )
}
export default PaginationAdmin
