import { useDispatch, useSelector } from "react-redux";
import { getQuestions, reset, setParams, setQuestions } from "../features/question/questionSlice.js";
import { useEffect, useState } from "react";

const TestPage = () => {

  const [isFetch, setIsFetch] = useState(false);

  const {params, questions, isError, isSuccess, isLoading, message} =
  useSelector((state) => state.question)

  const dispatch = useDispatch();

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
      const titles = questions.map(q => q.title)
      const answers = questions.map(q => q.answers)
      const course = questions.map(q => q.course);
      const difficulty = questions.map (q => q.difficulty)
    }

    dispatch(reset())
  }, [questions, isFetch, isError, isLoading, isSuccess, dispatch])

  const startTest = async() => {
    await dispatch(getQuestions(params));
    // dispatch(setQuestions(test));
  }

  return <>
      <button onClick={startTest}>Start Test</button>
      {/* <ul>
          {isFetch ? questions.map((item, index) => (
            <li key={index}>{item}</li>
          )) : null} 
      </ul> */}
    </>
}

export default TestPage;