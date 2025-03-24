import { AuthProvider } from "./AuthContext";

export const ContextProvider = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};