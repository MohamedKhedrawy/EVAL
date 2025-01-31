import { postQuestion } from "../../controllers/questionsController.js";
import { body } from "express-validator";
import { validateRequest } from "../../utils/validate.js";
import { protectRoute } from "../../middleware/authMiddleware.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Run middleware
    await protectRoute(req, res);
    await validateRequest(req, res, [
      body("title")
        .isString()
        .withMessage("Title must be a string")
        .trim()
        .notEmpty()
        .withMessage("Enter the title."),
      body("answers")
        .isArray({ min: 2 })
        .withMessage("Answers must be an array with at least 2 answers.")
        .custom((answers) => {
          for (let answer of answers) {
            if (!answer.answerBody || typeof answer.answerBody !== "string") {
              throw new Error("Each answer must have a valid answerText");
            }
            if (typeof answer.isCorrect !== "boolean") {
              throw new Error("Each answer must have a valid isCorrect boolean");
            }
          }
          return true;
        }),
      body("course").isString().trim().notEmpty().withMessage("Enter the Course"),
      body("difficulty")
        .isInt({ min: 0, max: 3 })
        .withMessage("Difficulty must be an integer between 0 and 3"),
      body("isMistake").optional().isBoolean().withMessage("isMistake must be a boolean"),
    ]);

    // Call the controller
    await postQuestion(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
