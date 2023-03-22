import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeePage from './pages/EmployeePage';
import OrderPage from './pages/OrderPage';
import SignUpPage from './pages/SignUpPage';
import CheckoutPage from './pages/CheckoutPage';
import Layout from './components/Layout';
import MerchantOrderPage from './pages/MerchantOrderPage';
import CustomerPageLoader from './pages/CustomerPageLoader';

type AppProps = {}

function App (props : AppProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<CustomerPageLoader />} />
                    <Route path="employee" element={<EmployeePage />} />
                    <Route index path="customer" element={<CustomerPageLoader />} />
                    <Route path="order" element={<OrderPage />} />
                    <Route path="signup" element={<SignUpPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="merchant/:id" element={<MerchantOrderPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
