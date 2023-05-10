import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setSearch } from "../components/search/SearchSlice";
import { changeMobileMenuDisplay } from "../components/header/HeaderSlice";
import Cart from "../components/cart/Cart";

const CartPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearch(''));
        dispatch(changeMobileMenuDisplay('none'));
        window.scrollTo(0, 0);
    }, []);

    return (
        <Cart/>
    )
}

export default CartPage;
