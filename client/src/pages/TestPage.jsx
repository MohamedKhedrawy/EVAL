import { useDispatch, useSelector } from "react-redux";
import { getQuestions, reset } from "../features/question/questionSlice.js";
import { useEffect, useState } from "react";

const TestPage = () => {

  const [isFetch, setIsFetch] = useState(false);

  const {params, questions, isError, isSuccess, isLoading, message} =
  useSelector((state) => state.question)

  const dispatch = useDispatch();
  
  const questionparams = {course: 'geo'};

  useEffect(() => {
    if (isLoading) {
      //add spinner
    }

    if (isError) {
      console.error(error);
      // isFetch = false;
    }

    if (isSuccess) {
      setIsFetch(true);
      console.log(questions)
    }

    dispatch(reset())
  }, [questions, isFetch, isError, isLoading, isSuccess, dispatch])

  const startTest = async() => {
    return await dispatch(getQuestions(questionparams));
  }

  return <>
      <button onClick={startTest}>Start Test</button>
      <ul>
          {isFetch ? questions.map((item, index) => (
            <li key={index}>{item}</li>
          )) : null} 
      </ul>
    </>
}

export default TestPage;