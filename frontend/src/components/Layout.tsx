import { Outlet } from 'react-router-dom';

// Wraps around all of our pages. Put an app bar/navbar and any headers or footers here.

type LayoutProps = {}

function Layout (props : LayoutProps) {
    return (
        <div style={{ border: 2, padding: 2, margin: 5}}>
            <Outlet /> 
        </div>
    );
};

export default Layout;