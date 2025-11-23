import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";

export const GlobalProviders = ({ children }) => {
    return (
        <UserProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </UserProvider>
    );
}