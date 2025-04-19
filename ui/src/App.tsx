import './App.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { useAuth } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './components/Layout';
import CreateOrganizationPage from './pages/CreateOrganizationPage';
import JoinOrganizationPage from './pages/JoinOrganizationPage';
import Sidebar from './components/Sidebar';
import OrganizationPage from './pages/OrganizationPage';

function App() {
    const { token } = useAuth();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route
                    element={
                        <Layout
                            sidebar={
                                <Sidebar
                                    items={[
                                        {
                                            text: 'Home',
                                            path: '/',
                                        },
                                        {
                                            text: 'Create',
                                            path: '/organization/create',
                                        },
                                        {
                                            text: 'Join',
                                            path: '/organization/join',
                                        },
                                    ]}
                                />
                            }
                        />
                    }
                >
                    <Route index element={<OrganizationPage />} />
                    <Route
                        path="/organization/create"
                        element={<CreateOrganizationPage />}
                    />
                    <Route
                        path="/organization/join"
                        element={<JoinOrganizationPage />}
                    />
                </Route>

                <Route
                    element={
                        <Layout
                            sidebar={
                                <Sidebar
                                    items={[
                                        { text: 'Standups', path: '/standups' },
                                        { text: 'Teams', path: '/teams' },
                                    ]}
                                />
                            }
                        />
                    }
                >
                    {/* <Route index element={<OrganizationPage />} /> */}
                    {/* <Route path="standups" element={<StandupsPage />} /> */}
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute
                                canActivate={token != null}
                                redirectPath="/signin"
                            >
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="team/:teamId" element={<TeamPage />} />
                    {/* <Route path="test" element={<TestPage />} /> */}
                </Route>
                <Route
                    path="/signin"
                    element={
                        <ProtectedRoute
                            canActivate={token == null}
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
                            canActivate={token == null}
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
