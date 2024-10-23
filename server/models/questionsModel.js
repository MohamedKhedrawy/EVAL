import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    answers: {
        type: [
            {
                answerBody: {type: String, required: true},
                isCorrect: {type: Boolean, required: true}
            }
        ],
        required: true
    },
    course: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    isMistake: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Question', questionsSchema);