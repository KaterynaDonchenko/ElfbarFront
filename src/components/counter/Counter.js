import { useDispatch, useSelector } from 'react-redux';

import { increaceCounter, decreaceCounter } from './CounterSlice';
import { increaseCounterInTheProduct, decreaseCounterInTheProduct } from '../cartWidget/CartWidgetSlice';

import './counter.scss'

const Counter = ({counterProduct = false, _id}) => {
    const {counter} = useSelector(state => state.counter);
    const dispatch = useDispatch();

    return (
        <div className="counter">
            <input onClick={() => {
                counterProduct ? dispatch(decreaseCounterInTheProduct(_id)) : dispatch(decreaceCounter())
                }} 
                type="button" 
                value='-' 
                className="counter__minus"/>
                <div className="counter__number">{counterProduct ? counterProduct : counter}</div>
            <input onClick={() => {
                 counterProduct ? dispatch(increaseCounterInTheProduct(_id)) : dispatch(increaceCounter());
                }} 
                type="button" 
                value='+' 
                className="counter__plus"/>
        </div>
    )
}

export default Counter;