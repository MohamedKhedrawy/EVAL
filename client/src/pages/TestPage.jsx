import { useDispatch, useSelector } from "react-redux";
import {
  getQuestions,
  reset,
  setParams,
  setQuestions,
  toggleIsMistake,
} from "../features/question/questionSlice.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";

const TestPage = () => {
  const [isFetch, setIsFetch] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [isTestOver, setIsTestOver] = useState(false);
  const [scores, setScores] = useState([]);
  const [rightAnswers, setRightAnswers] = useState([]);

  const { params, questions, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.question);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuestions(params));
    setParams({});
  }, [params, dispatch]);

  useEffect(() => {
    if (isLoading) {
      return <Spinner />
    }

    if (isError) {
    }

    if (isSuccess) {
      console.log(isLoading);
    }

    if (Object.keys(params).length === 0) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [isError, isLoading, isSuccess, dispatch, params, navigate]);

  const handleAnswers = (questionIndex, answer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionIndex]: answer._id,
    }));
  };

  const handleTest = () => {
    setScores(
      questions.map((question, questionIndex) => {
        let choice = null;
        question.answers.forEach((answer) => {
          console.log(answer._id, selectedAnswers[questionIndex]);
          if (answer._id === selectedAnswers[questionIndex]) {
            if (answer.isCorrect) {
              setTotalScore((prevState) => prevState + 1);
              choice = true;
            } else {
              dispatch(toggleIsMistake(question._id));
              console.log(question, question._id, question.isMistake);
              choice = false;
            }
          }

          if (answer.isCorrect) {
            setRightAnswers((prevState) => [...prevState, answer.answerBody]);
          }
        });
        return choice;
      })
    );
    console.log(rightAnswers);
    setIsTestOver(true);
  };

  const handleDashboardNav = () => {
    navigate("/dashboard");
  };

  const activeOption = (questionIndex, answerIndex) => {
    // Select all radio inputs for the current question
    const answerDivs = document.querySelectorAll(`.test`);

    // Remove 'checked' class from all answer-option divs
    answerDivs.forEach((input) => {
      const answerDiv = document.querySelector(`#${input.value}`);
      if (answerDiv) {
        answerDiv.classList.remove("checked");
      }
    });

    // Add 'checked' class to the selected answer-option div
    const selectedAnswerDiv = document.querySelector(`#${answerIndex}`);
    if (selectedAnswerDiv) {
      selectedAnswerDiv.classList.add("checked");
    }
  };

  const handleErrorReturn = () => {
    navigate('/dashboard')
  }

  return (
    <>
      {isError ? (
        <div className="homepage">
          <h1 className="title error">EVAL</h1>
          <div className="error-prompt">
            <p>Failed fetching questions.</p>
            <p>Please try again.</p>
            <button className="button red" onClick={handleErrorReturn}>back</button>
          </div>
        </div>
      ) : (isLoading || questions.length < 1) ? (
        <Spinner />
      ) : (
        <div className="test-page-container">
          <div className="test-window">
            <ol>
              {(!isLoading && questions.length > 0)
                ? questions.map((question, questionIndex) => (
                    <li key={questionIndex}>
                      <h3 className="question-text">{question.title}</h3>
                      <div className="answer-options">
                        {question.answers.map((answer) => (
                          <label htmlFor={`q${questionIndex}-a${answer._id}`}>
                            <div
                              key={answer._id}
                              id={answer._id}
                              className="answer-option"
                            >
                              <input
                                type="radio"
                                className="test"
                                id={`q${questionIndex}-a${answer._id}`}
                                name={`question-${questionIndex}`}
                                value={answer._id}
                                checked={
                                  selectedAnswers[questionIndex] === answer._id
                                }
                                onChange={() => {
                                  handleAnswers(questionIndex, answer);
                                  activeOption(questionIndex, answer._id);
                                }}
                              />
                              <span>{answer.answerBody}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                      <p>
                        <strong>Course: </strong>
                        {question.course}
                      </p>
                      <p>
                        <strong>Difficulty: </strong>
                        {question.difficulty}
                      </p>
                      {isTestOver ? (
                        <p>
                          <strong>Correct answer: </strong>
                          {rightAnswers[questionIndex]}
                        </p>
                      ) : null}
                    </li>
                  ))
                : null}
            </ol>
            {isTestOver ? (
              <>
                <p>
                  Your Score: <strong>{totalScore}</strong>/{scores.length}
                </p>
                <button
                  onClick={handleDashboardNav}
                  className="end-test-button"
                >
                  Go Back
                </button>
              </>
            ) : (
              <button onClick={handleTest} className="end-test-button">
                Finish Test
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TestPage;
