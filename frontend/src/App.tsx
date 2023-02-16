import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import CustomerPage from './pages/CustomerPage';
import DonutPage from './pages/DonutPage';
import OrderPage from './pages/OrderPage';
import Layout from './components/Layout';

type AppProps = {}

function App (props : AppProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="employee" element={<EmployeePage />} />
                    <Route path="customer" element={<CustomerPage />} />
                    <Route path="donut" element={<DonutPage />} />
                    <Route path="order" element={<OrderPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
