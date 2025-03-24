import { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context value
interface AuthContextType {
    isSignedIn: boolean;
    signIn: () => void;
    signOut: () => void;
}

// Provide a default value for the context
const defaultAuthContext: AuthContextType = {
    isSignedIn: true,
    signIn: () => {},
    signOut: () => {},
};

// Create a context for authentication
const AuthContext = createContext(defaultAuthContext);

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

interface AuthProviderProps {
    children: ReactNode; // This properly types the "children" prop
}

// AuthProvider component that will wrap the entire app
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isSignedIn, setIsSignedIn] = useState(true);

    const signIn = () => setIsSignedIn(true);
    const signOut = () => setIsSignedIn(false);

    return (
        <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
