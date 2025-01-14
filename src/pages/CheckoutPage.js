import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import Checkout from "../components/checkout/Checkout";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

const CheckoutPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
        window.scrollTo(0, 0);
        document.body.style.overflow = '';
    }, [dispatch]);
    
    return (
        <ErrorBoundary>
            <Checkout/>
        </ErrorBoundary>
    )
}

export default CheckoutPage;