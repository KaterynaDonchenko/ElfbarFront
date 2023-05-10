import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import Checkout from "../components/checkout/Checkout";

const CheckoutPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <Checkout/>
    )
}

export default CheckoutPage;