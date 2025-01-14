import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useEffect } from 'react';
import { setCurrentPage, setCurrentPageData } from './PaginationSlice';

import './pagination.scss';

const Pagination = ({array}) => {
  const { currentPage } = useSelector(state => state.pagination);
  const dispatch = useDispatch();

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;

  useEffect(() => {
    sessionStorage.setItem('currentPage', JSON.stringify(currentPage));
  }, [currentPage]);
  
  useEffect(() => {
    dispatch(setCurrentPageData(array.slice(offset, offset + PER_PAGE)));
  }, [array, offset, dispatch]);

  const pageCount = Math.ceil(array.length / PER_PAGE);
    
  const handlePageClick = (event) => {
    dispatch(setCurrentPage(event.selected));
    window.scrollTo(0, 250);
  };

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
          forcePage={currentPage}
        />
      </div>
    )

}

export default Pagination;