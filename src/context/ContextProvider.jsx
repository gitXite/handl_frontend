import { ListProvider } from "./ListProvider";
import { AuthProvider } from "./AuthProvider";

export const ContextProvider = ({ children }) => {
    return (
        <AuthProvider>
            <ListProvider>{children}</ListProvider>
        </AuthProvider>
    );
};