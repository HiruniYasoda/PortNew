import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../Context/AdminContext';

export const AdminAuthModal: React.FC = () => {
  const {
    isLoginModalOpen,
    closeLoginModal,
    isAdmin,
    logout,
    loginWithPassword,
  } = useAdmin();

  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLoginModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginWithPassword(password);
    if (!success) {
      setErrorMsg('Invalid password. Please try again.');
    } else {
      setPassword('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-[#0a0a0d] border border-purple-500/40 rounded-3xl p-8 shadow-[0_0_60px_rgba(168,85,247,0.35)] overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={closeLoginModal}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="flex flex-col items-center text-center mb-6 pt-2">
            <div className="p-4 bg-purple-500/20 rounded-2xl text-purple-400 mb-3 shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-500/30">
              <Lock size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {isAdmin ? 'Admin Portal Active' : 'Admin Access'}
            </h3>
            <p className="text-slate-400 text-xs font-light mt-1 max-w-xs">
              {isAdmin
                ? 'You have full editing privileges enabled.'
                : 'Enter your admin password to unlock edit controls.'}
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-3 rounded-xl border border-red-500/30"
            >
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {/* LOGGED IN VIEW */}
          {isAdmin ? (
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-sm">
                <ShieldCheck size={24} />
                <div className="flex flex-col">
                  <span className="font-bold">Admin Mode Unlocked ✏️</span>
                  <span className="text-xs text-slate-300 font-light">You can now edit projects & sections directly.</span>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  closeLoginModal();
                }}
                className="w-full py-3.5 rounded-2xl bg-red-600/20 border border-red-500 text-red-400 font-bold hover:bg-red-600 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] text-sm"
              >
                Exit Admin Mode
              </button>
            </div>
          ) : (
            /* SIMPLE PASSWORD FORM */
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-purple-300 mb-1.5 block">
                  Enter Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400">
                    <KeyRound size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full bg-white/5 border border-purple-500/30 rounded-xl py-3.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-purple-400 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all flex items-center justify-center gap-2"
              >
                Unlock Admin Portal
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

