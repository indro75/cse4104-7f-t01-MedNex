const UserModel = require('../models/userModel');
const {
  hashPassword,
  comparePassword,
  generateToken,
  sanitizeUser
} = require('../utils/security');
const {
  validateRegisterInput,
  validateLoginInput,
  validateProfileUpdate
} = require('../utils/validators');
const config = require('../config/env');

const DEMO_PATIENT = {
  name: 'Tanvir Hasan',
  email: 'demo.patient@mednex.org',
  password: 'DemoPatient@123',
  phone: '01711000000',
  age: 34,
  gender: 'Male',
  blood_group: 'B+',
  city: 'Khulna',
  emergency_contact: '01811000000',
  allergies: ['Penicillin', 'Dust'],
  chronic_conditions: ['Mild Asthma']
};

/**
 * Register a new user account
 * @route POST /api/auth/register
 */
async function register(req, res, next) {
  try {
    const { isValid, errors } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
        disclaimer: config.medicalDisclaimer
      });
    }

    const {
      name,
      email,
      password,
      phone,
      age,
      gender,
      blood_group,
      city,
      emergency_contact,
      allergies,
      chronic_conditions
    } = req.body;

    const existingUser = await UserModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists. Please log in.',
        disclaimer: config.medicalDisclaimer
      });
    }

    const password_hash = await hashPassword(password);

    const newUser = await UserModel.createUser({
      name,
      email,
      password_hash,
      phone,
      age,
      gender,
      blood_group,
      city: city || 'Khulna',
      emergency_contact,
      allergies: allergies || [],
      chronic_conditions: chronic_conditions || []
    });

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: sanitizeUser(newUser),
      disclaimer: config.medicalDisclaimer
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Authenticate returning user and return JWT
 * @route POST /api/auth/login
 */
async function login(req, res, next) {
  try {
    const { isValid, errors } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
        disclaimer: config.medicalDisclaimer
      });
    }

    const { email, password } = req.body;

    const user = await UserModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
        disclaimer: config.medicalDisclaimer
      });
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
        disclaimer: config.medicalDisclaimer
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: sanitizeUser(user),
      disclaimer: config.medicalDisclaimer
    });
  } catch (err) {
    next(err);
  }
}

/**
 * 1-Click Demo Patient authentication
 * @route POST /api/auth/demo-login
 */
async function demoLogin(req, res, next) {
  try {
    let demoUser = await UserModel.findUserByEmail(DEMO_PATIENT.email);

    if (!demoUser) {
      const password_hash = await hashPassword(DEMO_PATIENT.password);
      demoUser = await UserModel.createUser({
        ...DEMO_PATIENT,
        password_hash
      });
    }

    const token = generateToken({
      id: demoUser.id,
      email: demoUser.email,
      name: demoUser.name
    });

    return res.status(200).json({
      success: true,
      message: 'Logged in as Demo Patient.',
      token,
      user: sanitizeUser(demoUser),
      isDemo: true,
      disclaimer: config.medicalDisclaimer
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Get current authenticated user profile
 * @route GET /api/auth/profile
 */
async function getProfile(req, res) {
  return res.status(200).json({
    success: true,
    user: req.user,
    disclaimer: config.medicalDisclaimer
  });
}

/**
 * Update authenticated user profile
 * @route PUT /api/auth/profile
 */
async function updateProfile(req, res, next) {
  try {
    const { isValid, errors } = validateProfileUpdate(req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
        disclaimer: config.medicalDisclaimer
      });
    }

    const updatedUser = await UserModel.updateUserProfile(req.user.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
        disclaimer: config.medicalDisclaimer
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: sanitizeUser(updatedUser),
      disclaimer: config.medicalDisclaimer
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Logout current session
 * @route POST /api/auth/logout
 */
async function logout(req, res) {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully. Please clear your session token.',
    disclaimer: config.medicalDisclaimer
  });
}

module.exports = {
  register,
  login,
  demoLogin,
  getProfile,
  updateProfile,
  logout
};
