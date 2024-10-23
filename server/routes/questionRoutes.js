import express from 'express';
import { clearRepeated, getQuestions, getWrongQuestions, postQuestion } from '../controllers/questionsController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', protectRoute, getQuestions);
router.post('/', [
    body('title')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .notEmpty()
    .withMessage('Enter the title.'),

    body('answers')
    .isArray({min: 2})
    .withMessage('Answers must be an array with at least 2 answers.')
    .custom(answers => {
        for (let answer of answers) {
          if (!answer.answerText || typeof answer.answerText !== 'string') {
            throw new Error('Each answer must have a valid answerText');
          }
          if (typeof answer.isCorrect !== 'boolean') {
            throw new Error('Each answer must have a valid isCorrect boolean');
          }
        }
        return true;
      }),

      body('course')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('Enter the Course'),

    body('difficulty')
    .isInt({ min: 0, max: 3 })
    .withMessage('Difficulty must be an integer between 0 and 3'),

    // Optional: isMistake should be a boolean if provided
    body('isMistake')
    .optional()
    .isBoolean()
    .withMessage('isMistake must be a boolean')
], protectRoute, postQuestion);
router.get('/wrong', protectRoute, getWrongQuestions);
router.post('/clear', protectRoute, clearRepeated);


export default router;