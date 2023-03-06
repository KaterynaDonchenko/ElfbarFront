import { increaceCounter, decreaceCounter } from './CounterSlice';
import { useDispatch, useSelector } from 'react-redux';

import './counter.scss'

const Counter = ({counterProduct = false}) => {
    const {counter} = useSelector(state => state.counter);
    const dispatch = useDispatch();

    return (
        <div className="counter">
            <input onClick={() => dispatch(decreaceCounter())} type="button" value='-' className="counter__minus" />
            <input type="number" value={counterProduct ? counterProduct : counter} className="counter__number" />
            <input onClick={() => dispatch(increaceCounter())} type="button" value='+' className="counter__plus" />
        </div>
    )
}

export default Counter;