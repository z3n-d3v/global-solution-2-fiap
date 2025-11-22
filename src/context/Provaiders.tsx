import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";

export const GlobalProvaiders = ({ children }) => {
    return (
        <UserProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </UserProvider>
    );
}