import asyncHandler from "express-async-handler";
import Question from "../models/questionsModel.js";
import { validationResult } from "express-validator";
import RepeatedQuestion from '../models/shownQuestionsModel.js'

export const getQuestions = asyncHandler( async(req, res) => {
    let {userId, course, maxDiff, noOfQ} = req.body;

    if(!course) {
        res.status(400);
        throw new Error('Enter the course');
    }

    maxDiff = maxDiff ? maxDiff : 3;
    noOfQ = noOfQ ? noOfQ : 30;

    try {
        //fetch new questions excluding repeated ones
        const userEntry = await RepeatedQuestion.findOne({userId}).exec();
        const repeatedQuestions = userEntry ? userEntry.questionsId : [];

        let test = await Question.find({
            course, difficulty: { $lte: maxDiff, $gt: 0},
            _id: {$nin: repeatedQuestions}
        }).limit(noOfQ).exec()

        //add 0 difficulty if we dont have enough questions and combine
        if (test.length < noOfQ) {
           const remainingQuestionsDiff = await Question.find({
            course, difficulty: 0,
            _id: {$nin: repeatedQuestions}
           }).limit(noOfQ - test.length).exec()
           test = [...test, ...remainingQuestionsDiff];
        }

        //add repeated questions if we dont have enough questions and combine
        if (test.length < noOfQ) {
            const remainingQuestionsRep = await Question.find({
             course, difficulty: {$lte: maxDiff},
             _id: {$in: repeatedQuestions}
            }).limit(noOfQ - test.length).exec()
            test = [...test, ...remainingQuestionsRep];
        }

        //include the the ids of the new repeated questions
        const repeatedQuestionsIds = repeatedQuestions.map(q => q.id);

        //update or create the repeated questions list for this user
        if (userEntry) {
            userEntry.repeatedQuestions.push(...repeatedQuestionsIds);
            await userEntry.save();
        } else {
            await RepeatedQuestion.create({
                userId
            })
        }

        if (test) {
            res.status(200).json(test)
        }
    } catch (error) {
        res.status(400);
        throw new Error('error')
    }
})

export const getWrongQuestions = asyncHandler(async(req, res) => {
    try {
        const wrongQuestions = await Question.find({isMistake: true});
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

    course = course ? course : 'any';
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