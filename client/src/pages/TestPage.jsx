import { useDispatch, useSelector } from "react-redux";
import { getQuestions, reset, setParams, setQuestions, toggleIsMistake } from "../features/question/questionSlice.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TestPage = () => {

  const [isFetch, setIsFetch] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [isTestOver, setIsTestOver] = useState(false)
  const [scores, setScores] = useState([]);
  const [rightAnswers, setRightAnswers] = useState([])

  const {params, questions, isError, isSuccess, isLoading, message} =
  useSelector((state) => state.question)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuestions(params))
    setParams({});
  }, [params, dispatch])

  useEffect(() => {
    if (isLoading) {
      //add spinner
    }

    if (isError) {
      console.error(error);
      setIsFetch(false);
    }

    if (isSuccess) {
      setIsFetch(true);
    }

    if(Object.keys(params).length === 0) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [questions, isFetch, isError, isLoading, isSuccess, dispatch, params, navigate])

  const handleAnswers = (questionIndex, answer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionIndex]: answer._id
    }))
  }

  const handleTest = () => {
    setScores(questions.map((question, questionIndex) => {
      let choice = null;
      question.answers.forEach(answer => {
        console.log(answer._id, selectedAnswers[questionIndex])
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
          setRightAnswers((prevState) => [...prevState, answer.answerBody])
        }
      });
      return choice;
    }))
    console.log(rightAnswers)
    setIsTestOver(true);
  }

  const handleDashboardNav = () => {
    navigate('/dashboard')
  }

  return <>
      <ul>
          {(isFetch && questions.length > 0) ? questions.map((question, questionIndex) => (
            <li key={questionIndex}>
                <h3>{question.title}</h3>
                <form>
                  {question.answers.map((answer) => (
                    <div key={answer._id}>
                      <input 
                        type="radio"
                        id={`q${questionIndex}-a${answer._id}`}
                        name={`question-${questionIndex}`}
                        value={answer._id}
                        checked={selectedAnswers[questionIndex] === answer._id}
                        onChange={() => handleAnswers(questionIndex, answer)}
                      />
                      <label htmlFor={`q${questionIndex}-a${answer._id}`}>{answer.answerBody}</label>
                    </div>
                  ))}
                </form>
                <p><strong>Course: </strong>{question.course}</p>
                <p><strong>Difficulty: </strong>{question.difficulty}</p>
                {isTestOver ? <p><strong>Correct answer: </strong>{rightAnswers[questionIndex]}</p> : null}
            </li>
          )) : null} 
          {isTestOver ? ( <>
            <p>Your Score: <strong>{totalScore}</strong>/{scores.length}</p>
            <button onClick={handleDashboardNav}>End Test</button>
          </>
          )
          
          : (<button onClick={handleTest}>Finish Test</button>)}
      </ul>
    </>
}

export default TestPage;