import asyncHandler from "express-async-handler";
import Question from "../models/questionsModel.js";

export const getQuestions = asyncHandler( async(req, res) => {
    let {course, maxDiff, noOfQ} = req.body;

    if(!course) {
        res.status(400);
        throw new Error('Enter the course');
    }

    maxDiff = maxDiff ? maxDiff : 0;
    noOfQ = noOfQ ? noOfQ : 30;

    try {
        const test = await Question.find({
            course, difficulty: { $lte: maxDiff}
        }).limit(5).exec()

        if (test) {
            res.status(200).json(test)
        }
    } catch (error) {
        res.status(400);
        throw new Error('error')
    }
})

export const postQuestion = asyncHandler( async(req, res) => {
    let {title, answers, course, difficulty} = req.body;

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