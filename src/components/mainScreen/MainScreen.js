import MainSlider from '../sliders/mainSlider/MainSlider';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './mainScreen.scss';

const MainScreen = () => {
    return (
        <div className="main-screen">
            <ErrorBoundary>
                <MainSlider/>
            </ErrorBoundary>
        </div>
    )
}

export default MainScreen;