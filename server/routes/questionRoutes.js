import express from 'express';
import { getQuestions, postQuestion } from '../controllers/questionsController.js';

const router = express.Router();

router.get('/', getQuestions);
router.post('/', postQuestion);

export default router;