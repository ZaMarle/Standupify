import { useAuth } from '../components/AuthContext';
import HomeContentPage from './HomeContentPage';
import HomeLandingPage from './HomeLandingPage';

function HomePage() {
    const { token, isLoading } = useAuth();

    if (isLoading) {
        return <div></div>;
    }
    return <>{!token ? <HomeLandingPage /> : <HomeContentPage />}</>;
}

export default HomePage;
