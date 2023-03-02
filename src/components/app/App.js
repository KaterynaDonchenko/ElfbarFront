import {Routes, Route, useNavigate, Location, useLocation} from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import CartWidget from '../cardWidget/CartWidget';
import { MainPage, 
         ProductPageItem, 
         CatalogPage, 
         CartPage, 
         CheckoutPage, 
         CategoryPage, 
         Page404 } from '../../pages';   
   
import '../../assets/scss/style.scss';

const App = () => {

    return (
            <>
                <Header/>
                <CartWidget/>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/catalog' element={<CatalogPage/>}/>
                    <Route path='/product/:productId' element={<ProductPageItem/>}/>
                    <Route path='/cart' element={<CartPage/>}/>
                    <Route path='/checkout' element={<CheckoutPage/>}/>
                    <Route path='/product-category/:category' element={<CategoryPage/>}/>
                    <Route path='*' element={<Page404/>}/>
                </Routes>
                <Footer/>
            </>  
    )
}

export default App;
