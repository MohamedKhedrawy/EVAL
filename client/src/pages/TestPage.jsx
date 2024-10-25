import { useDispatch, useSelector } from "react-redux";
import { getQuestions, reset, setParams, setQuestions } from "../features/question/questionSlice.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TestPage = () => {

  const [isFetch, setIsFetch] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const {params, questions, isError, isSuccess, isLoading, message} =
  useSelector((state) => state.question)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuestions(params))
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

    if(!questions || questions.length < 1) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [questions, isFetch, isError, isLoading, isSuccess, dispatch, params, navigate])

  const handleAnswers = (questionIndex, answerIndex) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionIndex]: answerIndex
    }))
  }

  const handleTest = () => {
    
  }

  return <>
      <ul>
          {(isFetch && questions.length > 0) ? questions.map((question, questionIndex) => (
            <li key={questionIndex}>
                <h3>{question.title}</h3>
                <form>
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex}>
                      <input 
                        type="radio"
                        id={`q${questionIndex}-a${answerIndex}`}
                        name={`question-${questionIndex}`}
                        value={answerIndex}
                        checked={selectedAnswers[questionIndex] === answerIndex}
                        onChange={() => handleAnswers(questionIndex, answerIndex)}
                      />
                      <label htmlFor={`q${questionIndex}-a${answerIndex}`}>{answer.answerBody}</label>
                    </div>
                  ))}
                </form>
                <p><strong>Course: </strong>{question.course}</p>
                <p><strong>Difficulty: </strong>{question.difficulty}</p>
            </li>
          )) : null} 
          <button onClick={handleTest}>Finish Test</button>
      </ul>
    </>
}

export default TestPage;