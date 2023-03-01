import { Link, useParams } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { fetchProductPrev, fetchProductNext } from './BreadCrumbsMenuSlice';
import { useDispatch, useSelector } from 'react-redux';

import './breadCrumbsMenu.scss';

const BreadCrumbsMenu = () => {
    const lableRef = useRef();
    const prevProductRef = useRef();
    const nextProductRef = useRef();
    const { catalogId } = useParams();
    const dispatch = useDispatch();
    const { productPrev, productNext} = useSelector(state => state.productsPrevAndNext);

    useEffect(() => {
        dispatch(fetchProductPrev(+catalogId - 1));
        dispatch(fetchProductNext(+catalogId + 1));
    }, [catalogId]);

    return (
        <div className="breadcrumbs-menu">
            <div className="breadcrumbs-menu__left">
                <Link to={`/catalog/${productPrev._id}`} 
                      className="breadcrumbs-menu__arrow-left"
                      onMouseEnter={() => prevProductRef.current.style.display = 'block'}>
                </Link>
                <ProductDropdown productRef={prevProductRef} product={productPrev}/>
            </div>
            <div className="breadcrumbs-menu__center">
                <div className="breadcrumbs-menu__lable" ref={el => lableRef.current = el}>До каталогу</div>
                <Link to='/catalog' 
                      className="breadcrumbs-menu__btn"
                      onMouseEnter={() => lableRef.current.classList.add('breadcrumbs-menu__lable_active')}
                      onMouseLeave={() => lableRef.current.classList.remove('breadcrumbs-menu__lable_active')}></Link>
            </div>
            <div className="breadcrumbs-menu__right">
                <Link to={`/catalog/${productNext._id}`} 
                      className="breadcrumbs-menu__arrow-right"
                      onMouseEnter={() => nextProductRef.current.style.display = 'block'}>
                </Link>
                <ProductDropdown productRef={nextProductRef} product={productNext}/>
            </div>
        </div>
    )
}

const ProductDropdown = ({productRef, product}) => {

    const {_id, title, img, price} = product;
    return (
        <div className="breadcrumbs-menu__dropdown" 
                ref={el => productRef.current = el} 
                onMouseLeave={() => productRef.current.style.display = 'none'}>
            <div className="breadcrumbs-menu__wrapper">
                <Link to={`/catalog/${_id}`} className="breadcrumbs-menu__dropdown-link">
                    <img src={`http://localhost:3001/${img}`} alt={title} />
                </Link>
                <div className="breadcrumbs-menu__dropdown-content">
                    <Link to={`/catalog/${_id}`} className="breadcrumbs-menu__dropdown-link">
                        <div className="breadcrumbs-menu__dropdown-title">{title}</div>
                    </Link>
                    <div className="breadcrumbs-menu__dropdown-price">{price} грн</div>
                </div>
            </div>
        </div>
    )
}

export default BreadCrumbsMenu;