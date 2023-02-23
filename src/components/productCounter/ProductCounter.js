import { increaceCounter, decreaceCounter } from './ProductCounterSlice';
import { useDispatch, useSelector } from 'react-redux';

import './counter.scss'

const ProductCounter = () => {
    const {counter} = useSelector(state => state.productCounter)
    const dispatch = useDispatch();

    return (
        <div className="counter">
            <input onClick={() => dispatch(decreaceCounter())} type="button" value='-' className="counter__minus" />
            <input type="number" value={counter} className="counter__number" />
            <input onClick={() => dispatch(increaceCounter())} type="button" value='+' className="counter__plus" />
        </div>
    )
}

export default ProductCounter;