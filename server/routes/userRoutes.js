import express from 'express';
import { registerUser, loginUser, getMyInfo } from '../controllers/usersController.js';
import {body} from 'express-validator'
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', [
    //sanitization
    body('name').trim().escape(),
    body('email').normalizeEmail(),

    //validation
    body('name').isLength({min: 2}).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Enter a valid email.'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters.'),
    body('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Passwords don't match.")
        }
        return true;
    })
], registerUser);

router.post('/login', loginUser);
// router.post('/logout', logoutUser);
router.get('/myinfo', protectRoute, getMyInfo);

export default router