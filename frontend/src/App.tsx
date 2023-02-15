import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Layout from './components/Layout';

type ApplicationProps = {}

function Application (props : ApplicationProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Application;
