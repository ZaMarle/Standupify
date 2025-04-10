import {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react';

class Token {
    raw: string;
    userId: number;
    userEmail: string;
    userRoles: Array<string>;
    aud: string;
    exp: number;
    iss: string;

    constructor(rawToken: string) {
        this.raw = rawToken;

        try {
            const decodedToken = JSON.parse(atob(rawToken.split('.')[1]));
            console.log('Decoded Token:', decodedToken);
            this.userId =
                decodedToken[
                    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
                ];
            this.userEmail =
                decodedToken[
                    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
                ];
            this.userRoles = decodedToken[''];
            this.aud = decodedToken['aud'];
            this.exp = decodedToken['exp'];
            this.iss = decodedToken['iss'];

            console.log(this);
        } catch (error) {
            console.error('Failed to decode token:', error);

            throw new Error('');
        }
    }
}

// Define the shape of the context value
export interface IAuthContext {
    token: Token | undefined;
    signIn: (jwt: string) => void;
    signOut: () => void;
    isLoading: boolean;
}

// Create a context for authentication
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Custom hook to use the AuthContext
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
    const [token, setToken] = useState<Token>();
    const [isLoading, setIsLoading] = useState(true);

    // Load the token from localStorage when the component mounts
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            const t = new Token(jwt);
            setToken(t);
            setIsLoading(false);
        }
    }, []);

    const signIn = (jwt: string) => {
        console.log('Signing in user');

        const t = new Token(jwt);
        console.log(t);
        setToken(t);

        localStorage.setItem('jwt', jwt); // Store token in localStorage
    };

    const signOut = () => {
        setToken(undefined);
        localStorage.removeItem('jwt'); // Remove token from storage
    };

    return (
        <AuthContext.Provider value={{ token, signIn, signOut, isLoading }}>
            {children}
        </AuthContext.Provider>
        // This would make it so token could be not nullable
        // <>
        //     {token ? (
        //         <AuthContext.Provider value={{ token, signIn, signOut }}>
        //             {children}
        //         </AuthContext.Provider>
        //     ) : (
        //         <>signIn or signup workflows only</>
        //     )}
        // </>
    );
};
