import { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading, login } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      login();
    }
  }, [user, loading, login]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
<<<<<<< HEAD
        <div className="flex flex-col items-center gap-4 text-textMuted">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
=======
        <div className="flex flex-col items-center gap-4 text-on-surface-variant">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-lg animate-spin" />
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          <p className="text-sm font-medium">Checking your session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRole && !user.roles.includes(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
