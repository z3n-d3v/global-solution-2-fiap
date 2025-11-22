import { UserProvider } from "./UserContext";

export const GlobalProvaiders = ({ children }) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
}