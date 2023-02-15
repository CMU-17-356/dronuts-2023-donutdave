import { Link } from 'react-router-dom';

type AboutPageProps = {}

function AboutPage (props : AboutPageProps) {
    return (
        <div>
            <p>This is the about page.</p>
            <p>
                <Link to="/">Go to the Home Page!</Link>
            </p>
        </div>
    );
};

export default AboutPage;