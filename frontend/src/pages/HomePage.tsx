import { Link } from 'react-router-dom';

type HomePageProps = {}

function HomePage (props : HomePageProps) {
    return (
        <div>
            <p>This is the home page.</p>
            <p>
                <Link to="/about">Go to the About Page!</Link>
            </p>
        </div>
    );
};

export default HomePage;