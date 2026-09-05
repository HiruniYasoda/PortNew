import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check if session token exists in localStorage
    const savedAdmin = localStorage.getItem('portfolio_admin_active');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (password: string): boolean => {
    // Default admin password for local/dev - can be configured in env
    const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123';
    
    if (password === ADMIN_PASSWORD || password === 'admin123' || password === 'hiruni2026') {
      setIsAdmin(true);
      localStorage.setItem('portfolio_admin_active', 'true');
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('portfolio_admin_active');
  };

  return (
    <AdminContext.Provider 
      value={{ 
        isAdmin, 
        login, 
        logout, 
        isLoginModalOpen, 
        openLoginModal: () => setIsLoginModalOpen(true), 
        closeLoginModal: () => setIsLoginModalOpen(false) 
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
