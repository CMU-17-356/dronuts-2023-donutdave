import { Link } from 'react-router-dom';
import Button,  { ButtonProps } from '@mui/material/Button';

type HomePageProps = {}

function HomePage (props : HomePageProps) {
    return (
        <div>
            <p>This is the home page.</p>
            <p>
            <Link to="/employee"> <Button >Employee Page</Button></Link>
            <Link to="/customer"> <Button >Customer Page</Button></Link>
            <Link to="/signup"> <Button >Sign Up</Button></Link>
            </p>

        </div>
    );
};

export default HomePage;