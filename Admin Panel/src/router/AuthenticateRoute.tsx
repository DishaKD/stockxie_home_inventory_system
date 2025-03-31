// src/routes/AuthenticateRoute.tsx
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { IRootState } from '../store'; // Import from your updated root reducer

interface AuthenticateRouteProps {
    element: JSX.Element;
}

const AuthenticateRoute: React.FC<AuthenticateRouteProps> = ({ element }) => {
    const location = useLocation();
    const { isAuthenticated } = useSelector((state: IRootState) => state.auth); // Now properly typed

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return element;
};

export default AuthenticateRoute;
