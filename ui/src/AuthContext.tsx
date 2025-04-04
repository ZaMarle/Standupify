import {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react';

// Define the shape of the context value
interface AuthContextType {
    token: string | null;
    signIn: (jwt: string) => void;
    signOut: () => void;
}

// Create a context for authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode; // This properly types the "children" prop
}

// AuthProvider component that will wrap the entire app
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState(localStorage.getItem('jwt') || null);

    // Load the token from localStorage when the component mounts
    useEffect(() => {
        const storedToken = localStorage.getItem('jwt');
        if (storedToken) {
            console.log(storedToken);

            try {
                const decodedToken = JSON.parse(
                    atob(storedToken.split('.')[1]),
                );
                console.log('Decoded Token:', decodedToken);
            } catch (error) {
                console.error('Failed to decode token:', error);
            }

            setToken(storedToken);
        }
    }, []);

    const signIn = (jwt: string) => {
        console.log('Signing in user');

        setToken(jwt);
        localStorage.setItem('jwt', jwt); // Store token in localStorage
    };

    const signOut = () => {
        setToken(null);
        localStorage.removeItem('jwt'); // Remove token from storage
    };

    return (
        <AuthContext.Provider value={{ token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
