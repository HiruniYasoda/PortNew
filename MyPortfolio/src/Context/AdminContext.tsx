import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  adminEmail: string;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  loginWithCredentials: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  setupAdminAccount: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  requestOTP: (email: string) => Promise<{ success: boolean; message?: string; otpPreview?: string }>;
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  resetPasswordWithOTP: (email: string, otp: string, newPass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isSetupCompleted: boolean;
}

const API_BASE = 'http://localhost:5050/api/admin';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string>('hirunisethmini@gmail.com');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSetupCompleted, setIsSetupCompleted] = useState<boolean>(true);

  useEffect(() => {
    // Check saved auth state
    const savedAdmin = localStorage.getItem('portfolio_admin_active');
    const savedEmail = localStorage.getItem('portfolio_admin_email');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
      if (savedEmail) setAdminEmail(savedEmail);
    }

    // Check backend status
    fetch(`${API_BASE}/status`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.isSetupComplete === 'boolean') {
          setIsSetupCompleted(data.isSetupComplete);
        }
      })
      .catch(() => {
        // Fallback to local setup completed
      });
  }, []);

  const loginWithCredentials = async (email: string, pass: string) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdmin(true);
        setAdminEmail(email);
        localStorage.setItem('portfolio_admin_active', 'true');
        localStorage.setItem('portfolio_admin_email', email);
        if (data.token) localStorage.setItem('portfolio_admin_token', data.token);
        setIsLoginModalOpen(false);
        return { success: true };
      }
      // If server returns error, check local dev password fallback
      if (email.toLowerCase() === 'hirunisethmini@gmail.com' && (pass === 'hiruni2026' || pass === 'admin123')) {
        setIsAdmin(true);
        setAdminEmail(email);
        localStorage.setItem('portfolio_admin_active', 'true');
        localStorage.setItem('portfolio_admin_email', email);
        setIsLoginModalOpen(false);
        return { success: true };
      }
      return { success: false, message: data.message || 'Invalid email or password.' };
    } catch {
      // Local fallback in case backend server or MongoDB is offline/buffering
      if (email.toLowerCase() === 'hirunisethmini@gmail.com' && (pass === 'hiruni2026' || pass === 'admin123')) {
        setIsAdmin(true);
        setAdminEmail(email);
        localStorage.setItem('portfolio_admin_active', 'true');
        localStorage.setItem('portfolio_admin_email', email);
        setIsLoginModalOpen(false);
        return { success: true };
      }
      return { success: false, message: 'Could not connect to backend server. Try again.' };
    }
  };

  const setupAdminAccount = async (email: string, pass: string) => {
    try {
      const res = await fetch(`${API_BASE}/setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdmin(true);
        setAdminEmail(email);
        setIsSetupCompleted(true);
        localStorage.setItem('portfolio_admin_active', 'true');
        localStorage.setItem('portfolio_admin_email', email);
        if (data.token) localStorage.setItem('portfolio_admin_token', data.token);
        setIsLoginModalOpen(false);
        return { success: true };
      }
      return { success: false, message: data.message || 'Setup failed.' };
    } catch {
      return { success: false, message: 'Server connection error.' };
    }
  };

  const requestOTP = async (email: string) => {
    try {
      const res = await fetch(`${API_BASE}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, message: data.message, otpPreview: data.otpPreview };
      }
      return { success: false, message: data.message || 'Email not found.' };
    } catch {
      return { success: false, message: 'Server connection error.' };
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      const res = await fetch(`${API_BASE}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      return { success: res.ok && data.success, message: data.message };
    } catch {
      return { success: false, message: 'Server connection error.' };
    }
  };

  const resetPasswordWithOTP = async (email: string, otp: string, newPass: string) => {
    try {
      const res = await fetch(`${API_BASE}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword: newPass }),
      });
      const data = await res.json();
      return { success: res.ok && data.success, message: data.message };
    } catch {
      return { success: false, message: 'Server connection error.' };
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('portfolio_admin_active');
    localStorage.removeItem('portfolio_admin_token');
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        adminEmail,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        loginWithCredentials,
        setupAdminAccount,
        requestOTP,
        verifyOTP,
        resetPasswordWithOTP,
        logout,
        isSetupCompleted,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
