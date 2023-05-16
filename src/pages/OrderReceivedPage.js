import OrderReceived from "../components/orderReceived/OrderReceived"
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary"; 

const OrderReceivedPage = () => {
    return (
        <ErrorBoundary>
            <OrderReceived/>
        </ErrorBoundary>
    )
}

export default OrderReceivedPage;