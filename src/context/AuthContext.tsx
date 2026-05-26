import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'resumeiq_users';
const SESSION_KEY = 'resumeiq_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): Record<string, { password: string; user: User }> => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    } catch {
      return {};
    }
  };

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      await new Promise((r) => setTimeout(r, 900));
      const users = getUsers();
      const key = email.toLowerCase().trim();

      if (users[key]) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        name: name.trim(),
        email: key,
        createdAt: new Date().toISOString(),
      };

      users[key] = { password, user: newUser };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
      setUser(newUser);
      return { success: true };
    },
    []
  );

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 900));
    const users = getUsers();
    const key = email.toLowerCase().trim();
    const record = users[key];

    if (!record) {
      return { success: false, error: 'No account found with this email.' };
    }
    if (record.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(record.user));
    setUser(record.user);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
