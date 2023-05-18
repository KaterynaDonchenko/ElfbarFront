import { Link, useParams } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { fetchProductPrev, fetchProductNext } from './BreadCrumbsMenuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import './breadCrumbsMenu.scss';

const BreadCrumbsMenu = () => {
    const lableRef = useRef();
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { productPrev, productNext} = useSelector(state => state.productsPrevAndNext);
    const [prevProduct, setPrevProduct] = useState(false);
    const [nextProduct, setNextProduct] = useState(false);

    useEffect(() => {
        dispatch(fetchProductPrev(+productId - 1));
        dispatch(fetchProductNext(+productId + 1));
    }, [productId]);

    return (
        <div className="breadcrumbs-menu">
            <div className="breadcrumbs-menu__left">
                <Link to={`/product/${productPrev._id}`} 
                      className="breadcrumbs-menu__arrow-left"
                      onMouseEnter={() => setPrevProduct(true)}>
                </Link>
                <CSSTransition in={prevProduct}
                               timeout={400} 
                               unmountOnExit 
                               mountOnEnter
                               classNames="prev-product">
                    <ProductDropdown product={productPrev} setProduct={setPrevProduct}/>
                </CSSTransition>
            </div>
            <div className="breadcrumbs-menu__center">
                <div className="breadcrumbs-menu__lable" ref={el => lableRef.current = el}>До каталогу</div>
                <Link to={`/catalog/filter?orderby=all&page=1`} 
                      className="breadcrumbs-menu__btn"
                      onMouseEnter={() => lableRef.current.classList.add('breadcrumbs-menu__lable_active')}
                      onMouseLeave={() => lableRef.current.classList.remove('breadcrumbs-menu__lable_active')}></Link>
            </div>
            <div className="breadcrumbs-menu__right">
                <Link to={`/product/${productNext._id}`} 
                      className="breadcrumbs-menu__arrow-right"
                      onMouseEnter={() => setNextProduct(true)}>
                </Link>
                <CSSTransition in={nextProduct}
                               timeout={500} 
                               unmountOnExit 
                               mountOnEnter
                               classNames="next-product">
                    <ProductDropdown product={productNext} setProduct={setNextProduct}/>
                </CSSTransition>
            </div>
        </div>
    )
}

const ProductDropdown = ({product, setProduct}) => {

    const {_id, title, img, price} = product;
    return (
        <div className="breadcrumbs-menu__dropdown" 
                onMouseLeave={() => setProduct(false)}>
            <div className="breadcrumbs-menu__wrapper">
                <Link to={`/product/${_id}`} className="breadcrumbs-menu__dropdown-link">
                    <img src={`http://localhost:3001/${img}`} alt={title} />
                </Link>
                <div className="breadcrumbs-menu__dropdown-content">
                    <Link to={`/product/${_id}`} className="breadcrumbs-menu__dropdown-link">
                        <div className="breadcrumbs-menu__dropdown-title">{title}</div>
                    </Link>
                    <div className="breadcrumbs-menu__dropdown-price">{price} грн</div>
                </div>
            </div>
        </div>
    )
}

export default BreadCrumbsMenu;