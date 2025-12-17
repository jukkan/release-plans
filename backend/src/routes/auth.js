import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import config from '../config/index.js';

const router = express.Router();

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
 * TODO: Add request validation
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // TODO: Add validation middleware
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/logout
 * Logout user (client-side token removal)
 */
router.post('/logout', (req, res) => {
  // Token is removed on client side
  res.json({ message: 'Logged out successfully' });
});

/**
 * GET /api/auth/me
 * Get current user information
 * TODO: Add auth middleware
 */
router.get('/me', async (req, res, next) => {
  try {
    // TODO: Extract user from JWT token using auth middleware
    // This endpoint requires authentication to be implemented
    res.status(501).json({ 
      error: 'Not Implemented',
      message: 'Authentication middleware not yet implemented' 
    });
  } catch (error) {
    next(error);
  }
});

export default router;
