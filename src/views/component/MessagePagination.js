import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import '../../styles/adminpanel.css'

const MessagePagination = ({ prevPage, nextPage, start, limit, list }) => {
  return (
    <Pagination aria-label="Page navigation example">
    <PaginationItem>
      <PaginationLink first  onClick={prevPage} disabled={!start}/>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink last onClick={nextPage} disabled={list.length <= (start + limit)} />
    </PaginationItem>
  </Pagination>

  )
}
export default MessagePagination;