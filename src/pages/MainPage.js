import MainScreen from '../components/mainScreen/MainScreen';
import Filtersl from '../components/filters/Filters';
import ProductList from '../components/productList/ProductList';
import TitleH2 from '../components/titleH2/TitleH2';
import InfoAdvantages from '../components/infoAdvantages/InfoAdvantages';

const MainPage = () => {
    return (
        <>
            <MainScreen/>
            <div className="container">
                <Filtersl/>
                <TitleH2 title='Новинки'/>
                <ProductList marker='новинка'/>
                <TitleH2 title='Популярні товари'/>
                <ProductList marker='топ'/>
                <InfoAdvantages/>
            </div>
        </>
    )
}

export default MainPage;