import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";


export default function ProtectedRoute({ element }) {
    const location = useLocation();

    const { user } = useAuth();

    return user ? (
        element
    ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}
