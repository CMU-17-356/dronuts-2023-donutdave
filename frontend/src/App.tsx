import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeePage from './pages/EmployeePage';
import CustomerPage from './pages/CustomerPage';
import OrderPage from './pages/OrderPage';
import SignUpPage from './pages/SignUpPage';
import CheckoutPage from './pages/CheckoutPage';
import Layout from './components/Layout';
import MerchantOrderPage from './pages/MerchantOrderPage';

type AppProps = {}

function App (props : AppProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<CustomerPage />} />
                    <Route path="employee" element={<EmployeePage />} />
                    <Route index path="customer" element={<CustomerPage />} />
                    <Route path="order" element={<OrderPage />} />
                    <Route path="signup" element={<SignUpPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="merchant" element={<MerchantOrderPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
