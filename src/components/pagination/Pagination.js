import ReactPaginate from 'react-paginate';

import './pagination.scss';

const Pagination = () => {
    return (
        <div className="pagination">
            <ul className="pagination__list">
                <li className="pagination__item">
                    <a className="pagination__link" href=""></a>
                </li>
                <li className="pagination__item pagination__item_active">
                    <span className="pagination__link pagination__link">1</span>
                </li>
                <li className="pagination__item">
                    <a className="pagination__link" href="">2</a>
                </li>
                <li className="pagination__item">
                    <a className="pagination__link" href=""></a>
                </li>
            </ul>
        </div>
    )
}

export default Pagination;