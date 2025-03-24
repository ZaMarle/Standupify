import './App.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { useAuth } from './AuthContext ';
import ProtectedRoute from './components/ProtectedRoute';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import TeamsPage from './pages/TeamsPage';
import TeamPage from './pages/TeamPage';

function App() {
    const { isSignedIn } = useAuth();
    console.log(isSignedIn);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<NavBar />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="teams"
                        element={
                            <ProtectedRoute
                                canActivate={isSignedIn}
                                redirectPath="/signin"
                            >
                                <TeamsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="teams/:teamId" element={<TeamPage />} />
                    {/* <Route path="test" element={<TestPage />} /> */}
                </Route>
                <Route
                    path="/signin"
                    element={
                        <ProtectedRoute
                            canActivate={!isSignedIn}
                            redirectPath="/"
                        >
                            <SignInPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <ProtectedRoute
                            canActivate={!isSignedIn}
                            redirectPath="/"
                        >
                            <SignUpPage />
                        </ProtectedRoute>
                    }
                />
            </Route>,
        ),
    );

    return <RouterProvider router={router} />;
}

export default App;
