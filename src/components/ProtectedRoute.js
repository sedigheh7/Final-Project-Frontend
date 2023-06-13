import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ children }) => {
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0();      
    if (loading) return null;
    if (!isAuthenticated) {
        loginWithRedirect();
        return null;
    }
    return children;
};

export default ProtectedRoute;