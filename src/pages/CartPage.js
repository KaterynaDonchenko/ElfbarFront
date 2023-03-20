import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import Cart from "../components/cart/Cart";

const CartPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
    }, []);

    return (
        <Cart/>
    )
}

export default CartPage;
