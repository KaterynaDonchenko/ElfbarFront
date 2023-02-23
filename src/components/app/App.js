import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CartWidget from '../cardWidget/CartWidget';
import { MainPage, ProductPageItem, CatalogPage, CartPage, CheckoutPage, CategoryPage } from '../../pages';
import '../../assets/scss/style.scss';




const App = () => {
    return (
        <Router>
            <Header/>
            <CartWidget/>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/catalog' element={<CatalogPage/>}/>
                <Route path='/catalog/:catalogId' element={<ProductPageItem/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/checkout' element={<CheckoutPage/>}/>
                <Route path='/product-category/:category' element={<CategoryPage/>}/>
            </Routes>
            <Footer/>  
        </Router>
    )
}

export default App;
