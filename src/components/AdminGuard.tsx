import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { ReactNode } from 'react';

interface AdminGuardProps {
  children: ReactNode;
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.roles?.includes('COORDINATOR')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
