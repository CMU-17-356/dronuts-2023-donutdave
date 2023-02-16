import { Link } from 'react-router-dom';

type HomePageProps = {}

function HomePage (props : HomePageProps) {
    return (
        <div>
            <p>This is the home page.</p>
            <p>
                <Link to="/order">Go to the Employee Page!</Link>
            </p>

        </div>
    );
};

export default HomePage;