import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ensureDemoProfile, getDemoProfile } from '../lib/demoStore';
import { Loader2 } from 'lucide-react';

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    if (user) {
      const checkRole = () => {
        const profile = getDemoProfile(user.id) || ensureDemoProfile(user);
        setIsAdmin(profile.role === 'admin');
        setCheckingRole(false);
      };
      checkRole();
    } else if (!authLoading) {
      setCheckingRole(false);
    }
  }, [user, authLoading]);

  if (authLoading || checkingRole) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-surface">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (isAdmin === false) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
