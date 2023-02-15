import { Outlet } from 'react-router-dom';

// Wraps around all of our pages. Put an app bar/navbar and any headers or footers here.

type LayoutProps = {}

function Layout (props : LayoutProps) {
    return (
        <div style={{ border: 2, padding: 2, borderColor: 'black', borderStyle: 'dashed', margin: 5, width: 500, height: 500 }}>
            <Outlet /> 
        </div>
    );
};

export default Layout;