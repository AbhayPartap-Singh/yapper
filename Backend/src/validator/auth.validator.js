import { body, validationResult } from 'express-validator';

// --------------------------
// Common validation handler
// --------------------------
export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
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
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers'),

  // Email
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  // Password
  body('password')
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
    .isEmail()
    .withMessage('Please provide a valid email address'),

  // Password
  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  validate
];
