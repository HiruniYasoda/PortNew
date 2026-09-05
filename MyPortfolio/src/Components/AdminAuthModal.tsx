import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../Context/AdminContext';

export const AdminAuthModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, isAdmin, logout } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isLoginModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-[#0a0a0c] border border-purple-500/40 rounded-3xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={closeLoginModal}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-4 bg-purple-500/20 rounded-2xl text-purple-400 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-500/30">
              <Lock size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Admin Authentication</h3>
            <p className="text-slate-400 text-sm font-light mt-1">
              {isAdmin ? 'You are currently logged in as Administrator' : 'Enter your password to enable inline portfolio editing.'}
            </p>
          </div>

          {isAdmin ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-sm">
                <ShieldCheck size={20} />
                <span>Admin Editing Mode is Active! ✏️</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  closeLoginModal();
                }}
                className="w-full py-3 rounded-xl bg-red-600/20 border border-red-500 text-red-400 font-bold hover:bg-red-600 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                Log Out of Admin Mode
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400">
                  <KeyRound size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter Admin Password"
                  required
                  className="w-full bg-white/5 border border-purple-500/30 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all text-sm"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-3 rounded-xl border border-red-500/20"
                >
                  <AlertCircle size={16} />
                  <span>Incorrect password. Try "hiruni2026" or "admin123"</span>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300 transform active:scale-95"
              >
                Access Admin Mode
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
