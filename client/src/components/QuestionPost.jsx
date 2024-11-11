import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { postQuestion } from "../features/question/questionSlice";

const QuestionPost = () => {
  const backPos = useRef(null)
  const dispatch = useDispatch();

  const [postQuestions, setPostQuestions] = useState({
    title: "",
    course: "",
    difficulty: 0,
  });

  const [postAnswers, setPostAnswers] = useState([
    {
      answerBody: "",
      isCorrect: false,
    },
  ]);

  const [answerFields, setAnswerFields] = useState(1);
  const [isPosted, setIsPosted] = useState(false);

  useEffect(() => {
    if (isPosted) {
      setPostQuestions({
        title: "",
        course: "",
        difficulty: "",
      });
      setPostAnswers([
        {
          answerBody: "",
          isCorrect: false,
        },
      ]);
      setAnswerFields(1);
    }
  }, [isPosted]);

  const handleQuestionPost = (e) => {
    setPostQuestions((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAnswerPost = (e, index) => {
    const updatedAnswers = [...postAnswers];
    updatedAnswers[index].answerBody = e.target.value;
    setPostAnswers(updatedAnswers);
  };

  const handleToggleCorrect = (answerIndex) => {
    const updatedAnswers = [...postAnswers];
    updatedAnswers[answerIndex].isCorrect =
      !updatedAnswers[answerIndex].isCorrect;
    setPostAnswers(updatedAnswers);
  };

  const removeAnswerField = (index) => {
    const updatedAnswers = postAnswers.filter((_, idx) => idx !== index);
    setPostAnswers(updatedAnswers);
    setAnswerFields((prevState) => prevState - 1);
  };

  const addAnswerField = () => {
    setPostAnswers([...postAnswers, { answerBody: "", isCorrect: false }]);
    setAnswerFields((prevState) => prevState + 1);
  };

  const handlePost = (e) => {
    e.preventDefault();
    const questionData = {
      title: postQuestions.title,
      answers: postAnswers,
      course: postQuestions.course,
      difficulty: postQuestions.difficulty,
    };
    dispatch(postQuestion(questionData));
    setIsPosted(true);
  };

  const translateY = () => {
    const backButton = document.querySelector('.button back');
    backButton.style.transform = 'translateY(20px)';
  }

  return (
    <>
      <form onSubmit={handlePost} className="question-form">
        <h2>Post New Question</h2>
        <div className="parameter post">
          <label>Question: </label>
          <input
            name="title"
            className="input post-title"
            type="text"
            placeholder="Title"
            value={postQuestions.title}
            required
            onChange={handleQuestionPost}
          />
          <div>
            <label>Answers: </label>
            {postAnswers.map((answer, answerIndex) => (
              <div key={answerIndex} className="answerdiv">
                <input
                  className="input post"
                  type="text"
                  name={`Answer ${answerIndex + 1}`}
                  value={answer.answerBody}
                  placeholder={`Answer ${answerIndex + 1}`}
                  onChange={(e) => handleAnswerPost(e, answerIndex)}
                  required
                />

                <div className="checkbox-group answer">
                  <input
                    id={answerIndex}
                    name="isCorrect"
                    type="checkbox"
                    checked={answer.isCorrect}
                    onChange={() => handleToggleCorrect(answerIndex)}
                  />
                  <label htmlFor={answerIndex}>Correct Answer</label>
                  <button
                    type="button"
                    className="button small"
                    onClick={() => removeAnswerField(answerIndex)}
                    disabled={answerFields <= 1}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="button add"
              onClick={() => {addAnswerField(); translateY();}}
            >
              Add New Choice
            </button>
          </div>
          <label>Course: </label>
          <select
            name="course"
            className="dropdown postDropdown"
            value={postQuestions.course}
            onChange={handleQuestionPost}
          >
            <option value={""}>Select a Course</option>
            <option value={"geo"}>Geo</option>
            <option value={"OOP"}>OOP</option>
            <option value={"Data Communication"}>Data Communication</option>
            <option value={"Information Systems"}>Information Systems</option>
            <option value={"Discrete Maths"}>Discrete Maths</option>
            <option value={"Project Management"}>Project Management</option>
            <option value={"Business Management"}>Business Management</option>
            <option value={"Technical Writing"}>Technical Writing</option>
            <option value={"Probability & Statistics"}>
              Probability & Statistics
            </option>
            <option value={"Signals"}>Signals</option>
          </select>
          <label>Diffficulty: </label>
          <input
            type="radio"
            value={0}
            name="difficulty"
            onChange={handleQuestionPost}
            checked={postQuestions.difficulty == 0}
          />{" "}
          Undefined {" "}
          <input
            type="radio"
            value={1}
            name="difficulty"
            onChange={handleQuestionPost}
            checked={postQuestions.difficulty == 1}
          />{" "}
          Easy {" "}
          <input
            type="radio"
            value={2}
            name="difficulty"
            onChange={handleQuestionPost}
            checked={postQuestions.difficulty == 2}
          />{" "}
          Intermediate{" "}
          <input
            type="radio"
            value={3}
            name="difficulty"
            onChange={handleQuestionPost}
            checked={postQuestions.difficulty == 3}
          />{" "}
          Hard {" "}
          <button type="submit" className="button add">
            Add Question
          </button>
        </div>
      </form>
    </>
  );
};

export default QuestionPost;
