import { body, validationResult } from 'express-validator';

// --------------------------
// Common validation handler
// --------------------------
export function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }

  next();
}

// --------------------------
// Register validation rules
// --------------------------
export const registerValidation = [
  // Username
  body('username')
    .trim() // 🔥 remove extra spaces
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_ ]+$/) // 🔥 allows space + underscore
    .withMessage('Username can contain letters, numbers, spaces, and underscore'),

  // Email
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address'),

  // Password
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  validate
];

// --------------------------
// Login validation rules
// --------------------------
export const loginValidation = [
  // Email
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address'),

  // Password
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),

  validate
];