import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    resetOTP: { type: String, default: null },
    resetOTPExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Admin = mongoose.model('Admin', adminSchema);
