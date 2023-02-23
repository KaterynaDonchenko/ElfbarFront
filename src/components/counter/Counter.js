import { increaseCounter, decreaseCounter } from '../productCard/ProductCartSlice';
import { useDispatch } from 'react-redux';

import './counter.scss'

const Counter = ({counter, id}) => {
    const dispatch = useDispatch();

    return (
        <div className="counter">
            <input onClick={() => dispatch(decreaseCounter(id))} type="button" value='-' className="counter__minus" />
            <input type="number" value={counter} className="counter__number" />
            <input onClick={() => dispatch(increaseCounter(id))} type="button" value='+' className="counter__plus" />
        </div>
    )
}

export default Counter;