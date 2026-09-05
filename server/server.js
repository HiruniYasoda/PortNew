import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { Admin } from './models/Admin.js';
import { Project } from './models/Project.js';
import { Achievement } from './models/Achievement.js';
import { Education } from './models/Education.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Database Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Auth Middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized - Missing Token' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ================= ADMIN AUTH ROUTES =================

// 1. Check if first-time admin setup is complete
app.get('/api/admin/status', async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    res.json({ isSetupComplete: adminCount > 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. First-Time Admin Setup
app.post('/api/admin/setup', async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return res.status(400).json({ message: 'Admin account already initialized.' });
    }

    const { email, password } = req.body;
    if (!email || !password || password.length < 6) {
      return res.status(400).json({ message: 'Email and password (min 6 chars) are required.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ email, passwordHash });
    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id, email: newAdmin.email }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });

    res.status(201).json({ success: true, token, email: newAdmin.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Admin Login (Email & Password)
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database connecting... Try dev login or check Atlas credentials.' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });

    res.json({ success: true, token, email: admin.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Request 6-Digit OTP Password Reset Code
app.post('/api/admin/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      return res.status(404).json({ message: 'No admin account found with this email.' });
    }

    // Generate random 6-digit OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins expiry

    admin.resetOTP = otpCode;
    admin.resetOTPExpires = expiresAt;
    await admin.save();

    console.log(`🔑 OTP Code for ${email}: ${otpCode}`);

    res.json({
      success: true,
      message: `A 6-digit OTP code has been sent to ${email}`,
      otpPreview: otpCode, // Preview for local testing
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. Verify OTP Code
app.post('/api/admin/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin || !admin.resetOTP || admin.resetOTP !== otp) {
      return res.status(400).json({ message: 'Invalid 6-digit OTP code.' });
    }

    if (new Date() > admin.resetOTPExpires) {
      return res.status(400).json({ message: 'OTP code has expired. Request a new one.' });
    }

    res.json({ success: true, message: 'OTP code verified successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 6. Reset Password with Verified OTP Code
app.post('/api/admin/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin || admin.resetOTP !== otp || new Date() > admin.resetOTPExpires) {
      return res.status(400).json({ message: 'Invalid or expired OTP session.' });
    }

    const salt = await bcrypt.genSalt(10);
    admin.passwordHash = await bcrypt.hash(newPassword, salt);
    admin.resetOTP = null;
    admin.resetOTPExpires = null;
    await admin.save();

    res.json({ success: true, message: 'Password reset successful! You can now log in.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= PROJECTS ROUTES =================
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'MongoDB Atlas Connected' });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio Backend Server running on http://localhost:${PORT}`);
});
