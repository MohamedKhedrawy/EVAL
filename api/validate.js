import { validationResult, body } from "express-validator";

// Define validation rules
export const validateRegisterBody = [
  body("name").trim().escape(),
  body("email").normalizeEmail(),
  body("name")
    .isAlpha()
    .withMessage("Name must be in alphabetical letters only.")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters"),
  body("email").isEmail().withMessage("Enter a valid email."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.password) {
      throw new Error("Passwords don't match.");
    }
    return true;
  }),
];

// Validate request based on the rules
export const validateRequest = (validators, data) => {
  const errors = [];
  validators.forEach((validator) => {
    const result = validator.run({ body: data });
    if (!result.isEmpty()) {
      errors.push(...result.array());
    }
  });
  return errors;
};
