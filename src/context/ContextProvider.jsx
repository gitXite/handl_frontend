import { ListProvider } from "./ListContext";
import { AuthProvider } from "./AuthContext";

export const ContextProvider = ({ children }) => {
    return (
        <AuthProvider>
            <ListProvider>{children}</ListProvider>
        </AuthProvider>
    );
};