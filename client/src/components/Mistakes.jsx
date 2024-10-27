import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getWrongQuestions } from "../features/question/questionSlice.js";

const Mistakes = () => {

    const dispatch = useDispatch();

    const {wrongQuestions} = useSelector((state) => state.question)
    const [wrongQuestionCourse, setWrongQuestionCourse] = useState('');

    useEffect(() => {
        dispatch(getWrongQuestions(wrongQuestionCourse))
      }, [dispatch, wrongQuestionCourse])

      const handleWrongQuestionCourse = (e) => {
        setWrongQuestionCourse(e.target.value)
      }

    return <>
        <h2>See Your Mistakes</h2>
      <select name="course" value={wrongQuestionCourse} onChange={handleWrongQuestionCourse}>
          <option value={''}>Select a Course</option>
          <option value={'geo'}>Geo</option>
          <option value={'OOP'}>OOP</option>
          <option value={'Data Communication'}>Data Communication</option>
          <option value={'Information Systems'}>Information Systems</option>
          <option value={'Discrete Maths'}>Discrete Maths</option>
          <option value={'Project Management'}>Project Management</option>
          <option value={'Business Management'}>Business Management</option>
          <option value={'Technical Writing'}>Technical Writing</option>
          <option value={'Probability & Statistics'}>Probability & Statistics</option>
          <option value={'Signals'}>Signals</option>
        </select>
      <ul>
        {wrongQuestions ? wrongQuestions.map(
          (wrongQuestion, wrongQuestionIndex) => (
            <li key={wrongQuestionIndex}>
              <div>
                <h3>{wrongQuestion.title}</h3>
                <p><strong>Difficulty: </strong>{wrongQuestion.difficulty}</p>
                <p><strong>Correct answer: </strong>
                {wrongQuestion.answers.filter(answer => answer.isCorrect)
                .map(answer => answer.answerBody)}</p>
              </div>
            </li>
          )
        ) : null}

      </ul>
    </>
} 

export default Mistakes;