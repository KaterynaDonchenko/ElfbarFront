import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import { changeMobileMenuDisplay } from "../components/header/HeaderSlice";
import Cart from "../components/cart/Cart";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

const CartPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(changeMobileMenuDisplay('none'));
        window.scrollTo(0, 0);
    }, []);

    return (
        <ErrorBoundary>
            <Cart/>
        </ErrorBoundary>
    )
}

export default CartPage;
