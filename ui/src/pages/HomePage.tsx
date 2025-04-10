import { useAuth } from '../components/AuthContext';
import HomeContentPage from './HomeContentPage';
import HomeLandingPage from './HomeLandingPage';

function HomePage() {
    const { token } = useAuth();

    return <>{!token ? <HomeLandingPage /> : <HomeContentPage />}</>;
}

export default HomePage;
