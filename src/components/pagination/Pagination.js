import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useEffect, useRef } from 'react';
import { setCurrentPage, setCurrentPageData } from './PaginationSlice';

import './pagination.scss';

const Pagination = ({array}) => {
  const { currentPage } = useSelector(state => state.pagination);
  const dispatch = useDispatch();
  const paginateRef = useRef();

  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;
  
  useEffect(() => {
    dispatch(setCurrentPageData(array.slice(offset, offset + PER_PAGE)));
  }, [array, offset]);

  const pageCount = Math.ceil(array.length / PER_PAGE);
    
  const handlePageClick = (event) => {
    dispatch(setCurrentPage(event.selected));
  };

  useEffect(() => {
    if(currentPage === 0) paginateRef.current.state.selected = 0;
  }, [currentPage]);

    return (
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          breakLinkClassName={"pagination__link-break"}
          previousLabel={""}
          nextLabel={""}
          disabledClassName={"pagination__button-disabled"}
          previousLinkClassName={"pagination__link-previous"}
          nextLinkClassName={"pagination__link-next"}
          containerClassName={"pagination__list"}
          pageClassName={"pagination__item"}
          pageLinkClassName={"pagination__link"}
          activeClassName={"pagination__item_active"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          ref={paginateRef}
        />
      </div>
    )

}

export default Pagination;