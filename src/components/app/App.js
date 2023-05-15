import {Routes, Route} from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import CartWidget from '../cartWidget/CartWidget';
import { MainPage, 
         ProductPageItem, 
         CatalogPage, 
         CartPage, 
         CheckoutPage, 
         CategoryPage,
         QuestionPage,
         SearchPage,
         OrderReceivedPage,
         PolicyPage, 
         Page404 } from '../../pages';   
   
import '../../assets/scss/style.scss';

const App = () => {

    return (
            <>
                <Header/>
                <CartWidget/>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/catalog/filter' element={<CatalogPage/>}/>
                    <Route path='/question' element={<QuestionPage/>}/>
                    <Route path='/product/:productId' element={<ProductPageItem/>}/>
                    <Route path='/cart' element={<CartPage/>}/>
                    <Route path='/checkout' element={<CheckoutPage/>}/>
                    <Route path='/checkout/order-received' element={<OrderReceivedPage/>}/>
                    <Route path='/product-category/:category' element={<CategoryPage/>}/>
                    <Route path='/search' element={<SearchPage/>}/>
                    <Route path='/policy' element={<PolicyPage/>}/> 
                    <Route path='*' element={<Page404/>}/>
                </Routes>
                <Footer/>
            </>  
    )
}

export default App;
