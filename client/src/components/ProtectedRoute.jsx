// ==================== components/ProtectedRoute.jsx ====================
import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
// Импорты: Navigate (react-router-dom); useAuth (../context/AuthContext)
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) {
        return null
    } else if (!user) {
        return <Navigate to="/login" replace />
    } else {
        return children
    }
}
export default ProtectedRoute
// Функция ProtectedRoute({ children })
// - через useAuth() достаёт user и loading
// - пока loading — ничего не показывает
// - если !user — return JSX: <Navigate to="/login" replace />
// - иначе — return children
