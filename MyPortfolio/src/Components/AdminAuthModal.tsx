import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, KeyRound, AlertCircle, ShieldCheck, Mail, ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { useAdmin } from '../Context/AdminContext';

type ModalStep = 'login' | 'setup' | 'forgot' | 'otp' | 'reset';

export const AdminAuthModal: React.FC = () => {
  const {
    isLoginModalOpen,
    closeLoginModal,
    isAdmin,
    logout,
    loginWithCredentials,
    setupAdminAccount,
    requestOTP,
    verifyOTP,
    resetPasswordWithOTP,
    isSetupCompleted,
  } = useAdmin();

  const [step, setStep] = useState<ModalStep>('login');
  const [email, setEmail] = useState('hirunisethmini@gmail.com');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [otpPreviewText, setOtpPreviewText] = useState('');

  if (!isLoginModalOpen) return null;

  // 1. Handle Login Submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const res = await loginWithCredentials(email, password);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.message || 'Invalid credentials');
    }
  };

  // 2. Handle First Time Setup Submit
  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const res = await setupAdminAccount(email, password);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.message || 'Setup failed');
    }
  };

  // 3. Handle Request OTP (Forgot Password)
  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const res = await requestOTP(email);
    setLoading(false);
    if (res.success) {
      setSuccessMsg(res.message || 'OTP Code sent to your email!');
      if (res.otpPreview) setOtpPreviewText(res.otpPreview);
      setStep('otp');
    } else {
      setErrorMsg(res.message || 'Failed to generate OTP code');
    }
  };

  // 4. Handle Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const res = await verifyOTP(email, otpCode);
    setLoading(false);
    if (res.success) {
      setSuccessMsg('OTP Code Verified! Enter your new password below.');
      setStep('reset');
    } else {
      setErrorMsg(res.message || 'Invalid OTP code');
    }
  };

  // 5. Handle Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const res = await resetPasswordWithOTP(email, otpCode, newPassword);
    setLoading(false);
    if (res.success) {
      setSuccessMsg('Password updated successfully! Log in with your new password.');
      setPassword('');
      setStep('login');
    } else {
      setErrorMsg(res.message || 'Could not reset password');
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

          {/* Back Button for multi-step */}
          {step !== 'login' && !isAdmin && (
            <button
              onClick={() => {
                setErrorMsg('');
                setSuccessMsg('');
                setStep('login');
              }}
              className="absolute top-5 left-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1 text-xs"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          {/* Modal Header */}
          <div className="flex flex-col items-center text-center mb-6 pt-2">
            <div className="p-4 bg-purple-500/20 rounded-2xl text-purple-400 mb-3 shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-500/30">
              <Lock size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {isAdmin
                ? 'Admin Dashboard'
                : step === 'setup' || !isSetupCompleted
                ? 'First-Time Admin Setup'
                : step === 'login'
                ? 'Admin Sign In'
                : step === 'forgot'
                ? 'Reset Password'
                : step === 'otp'
                ? 'Enter 6-Digit OTP'
                : 'Set New Password'}
            </h3>
            <p className="text-slate-400 text-xs font-light mt-1 max-w-xs">
              {isAdmin
                ? 'You are currently logged in as Administrator.'
                : step === 'setup'
                ? 'Register your email and password to secure your admin portal.'
                : step === 'login'
                ? 'Sign in with your email and password.'
                : step === 'forgot'
                ? 'We will send a 6-digit code to your admin email.'
                : step === 'otp'
                ? `Check your inbox at ${email} for the 6-digit code.`
                : 'Choose a strong new password for your account.'}
            </p>
          </div>

          {/* Status Messages */}
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

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex flex-col gap-1 text-green-400 text-xs bg-green-500/10 p-3 rounded-xl border border-green-500/30"
            >
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 size={16} />
                <span>{successMsg}</span>
              </div>
              {otpPreviewText && (
                <div className="mt-1 p-2 bg-purple-950/60 border border-purple-500/40 rounded-lg text-purple-300 font-mono text-center text-sm font-bold tracking-widest">
                  OTP Code: {otpPreviewText}
                </div>
              )}
            </motion.div>
          )}

          {/* LOGGED IN VIEW */}
          {isAdmin ? (
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-sm">
                <ShieldCheck size={20} />
                <div className="flex flex-col">
                  <span className="font-bold">Admin Mode Active! ✏️</span>
                  <span className="text-xs text-slate-300 font-light">{email}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  closeLoginModal();
                }}
                className="w-full py-3.5 rounded-2xl bg-red-600/20 border border-red-500 text-red-400 font-bold hover:bg-red-600 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] text-sm"
              >
                Log Out of Admin Portal
              </button>
            </div>
          ) : step === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-purple-300 mb-1 block">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hirunisethmini@gmail.com"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-purple-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-purple-300 block">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg('');
                      setSuccessMsg('');
                      setStep('forgot');
                    }}
                    className="text-xs text-purple-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400">
                    <KeyRound size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-purple-400 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="animate-spin" size={18} /> : 'Sign In to Admin Portal'}
              </button>
            </form>
          ) : step === 'forgot' ? (
            /* FORGOT PASSWORD FORM */
            <form onSubmit={handleRequestOTP} className="flex flex-col gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-purple-300 mb-1 block">
                  Admin Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hirunisethmini@gmail.com"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="animate-spin" size={18} /> : 'Send 6-Digit OTP Code'}
              </button>
            </form>
          ) : step === 'otp' ? (
            /* ENTER OTP FORM */
            <form onSubmit={handleVerifyOTP} className="flex flex-col gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-purple-300 mb-1 block">
                  6-Digit OTP Verification Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.trim())}
                  placeholder="e.g. 849201"
                  className="w-full bg-white/5 border border-purple-500/40 rounded-xl py-3 px-4 text-white text-center text-xl font-mono tracking-[0.4em] focus:outline-none focus:border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otpCode.length !== 6}
                className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="animate-spin" size={18} /> : 'Verify Code'}
              </button>
            </form>
          ) : (
            /* RESET PASSWORD FORM */
            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-purple-300 mb-1 block">
                  New Secure Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400">
                    <KeyRound size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter at least 6 characters"
                    className="w-full bg-white/5 border border-purple-500/30 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="animate-spin" size={18} /> : 'Save New Password'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
