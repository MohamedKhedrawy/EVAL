import asyncHandler from "express-async-handler";
import Question from "../models/questionsModel.js";
import { validationResult } from "express-validator";
import RepeatedQuestion from '../models/shownQuestionsModel.js'

export const getQuestions = asyncHandler( async(req, res) => {
    let { course, difficulty: maxDiff, noOfQ} = req.query;
    const userId = req.user._id;
    
    if(!course) {
        res.status(400);
        throw new Error('Enter the course');
    }

    maxDiff = (maxDiff && maxDiff >= 0 && maxDiff <=3) ? maxDiff : 3;
    noOfQ = (noOfQ && noOfQ > 0) ? noOfQ : 30;

    try {
        // fetch ref user and their repeated questions
        let userEntry;
        try {
            userEntry = await RepeatedQuestion.findOne({userId}).exec();
        } catch (error) {
            res.status(400);
            throw new Error('Failed to fetch user');
        }
        const repeatedQuestions = userEntry ? userEntry.questionsId : [];

        //fetch new questions excluding repeated ones
        let test = []
        try {
            test = await Question.find({
                course, difficulty: { $lte: maxDiff, $gt: 0},
                _id: {$nin: repeatedQuestions}
            }).limit(noOfQ).exec()
        } catch (error) {
            res.status(400);
            throw new Error('Failed to fetch new questions')
        }


        //add 0 difficulty if we dont have enough questions and combine
        if (test.length < noOfQ) {
           let remainingQuestionsDiff = [];
           try {
                remainingQuestionsDiff = await Question.find({
                course, difficulty: 0,
                _id: {$nin: repeatedQuestions}
               }).limit(noOfQ - test.length).exec()
               test.push(...remainingQuestionsDiff);
           } catch (error) {
                res.status(400);
                throw new Error('Failed to add 0 difficulty questions')
           } 
        }

        //add repeated questions if we dont have enough questions and combine
        if (test.length < noOfQ) {
            let remainingQuestionsRep = [];
            try {
                remainingQuestionsRep = await Question.find({
                course, difficulty: {$lte: maxDiff},
                _id: {$in: repeatedQuestions}
                }).limit(noOfQ - test.length).exec()
                test.push(...remainingQuestionsRep);
            } catch (error) {
                res.status(400);
                throw new Error('Failed to add repeated questions');
            } 
        }
        //include the the ids of the new repeated questions
        const testRepeatedQuestions = test.map(q => q._id);

        //update or create the repeated questions list for this user
        if (userEntry) {
            let uniqueRepeatedQuestions = testRepeatedQuestions.filter(newQuestion => 
            !repeatedQuestions.some(oldQuestion => oldQuestion.equals(newQuestion)))
            userEntry.questionsId.push(...uniqueRepeatedQuestions);
            await userEntry.save();
        } else {
                await RepeatedQuestion.create({
                userId,
                questionsId: testRepeatedQuestions
            })
        }

        if ((test) && (test.length > 0)) {
            res.status(200).json(test);
        } else {
            res.status(404);
            throw new Error('No questions found');
        }
    } catch (error) {
        res.status(400);
        throw new Error('Failed to retrieve questions');
    }
})

export const clearRepeated = asyncHandler(async(req, res) => {
    try {
        const userId = req.user._id;
        await RepeatedQuestion.deleteOne({userId});
        res.status(200).json('Repeated questions cleared successfully')
    } catch (error) {
        res.status(400);
        throw new Error('Failed to clear repeated questions');
    }
})

export const getWrongQuestions = asyncHandler(async(req, res) => {
    try {
        const {course} = req.body;
        const wrongQuestions = await Question.find({isMistake: true, course});
        res.status(200).json(wrongQuestions);
    } catch (error) {
        res.status(400);
        throw new Error('Failed to get the wrong questions')
    }
})

export const postQuestion = asyncHandler( async(req, res) => {
    let {title, answers, course, difficulty} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array()});
    }

    if (!title || !answers) {
        res.status(400);
        throw new Error('Add all required fields');
    }

    difficulty = difficulty ? difficulty : 0;

    const newQuestion = await Question.create({
        title,
        answers,
        course,
        difficulty: difficulty,
    })

    if (newQuestion) {
        res.status(201).json(newQuestion)
    } else {
        res.status(400);
        throw new Error('Invalid question data');
    }
})