import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  loginWithPassword: (pass: string) => boolean;
  loginWithCredentials: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Restore saved admin login state on refresh
    const savedAdmin = localStorage.getItem('portfolio_admin_active');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const loginWithPassword = (pass: string): boolean => {
    const HARDCODED_PASS = 'Hiruni@2003';
    if (pass === HARDCODED_PASS || pass.trim().toLowerCase() === HARDCODED_PASS.toLowerCase()) {
      setIsAdmin(true);
      localStorage.setItem('portfolio_admin_active', 'true');
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const loginWithCredentials = async (_email: string, pass: string) => {
    const success = loginWithPassword(pass);
    if (success) {
      return { success: true };
    }
    return { success: false, message: 'Invalid password. Password is Hiruni@2003' };
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('portfolio_admin_active');
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        loginWithPassword,
        loginWithCredentials,
        logout,
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
