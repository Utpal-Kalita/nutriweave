import React, { createContext, useContext, useEffect, useState } from 'react';
import { createDemoSession, DemoSession, DemoUser, getDemoSession, setDemoSession } from '../lib/demoStore';

interface AuthContextType {
  user: DemoUser | null;
  session: DemoSession | null;
  loading: boolean;
  signIn: (identity: string, password?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [session, setSession] = useState<DemoSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSession = getDemoSession();
    setSession(savedSession);
    setUser(savedSession?.user ?? null);
    setLoading(false);
  }, []);

  const signIn = async (identity: string) => {
    const nextSession = createDemoSession(identity);
    setSession(nextSession);
    setUser(nextSession.user);
  };

  const signOut = async () => {
    setDemoSession(null);
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
