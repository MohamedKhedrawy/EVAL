import mongoose from "mongoose";

const repeatedQuestionsSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    questionsId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true}]
})

export default mongoose.model('RepeatedQuestion', repeatedQuestionsSchema);