import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getWrongQuestions } from "../features/question/questionSlice.js";
import { useNavigate } from "react-router-dom";

const Mistakes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wrongQuestions } = useSelector((state) => state.question);
  const [wrongQuestionCourse, setWrongQuestionCourse] = useState("");
  const [isCourseSelected, setIsCourseSelected] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    dispatch(getWrongQuestions(wrongQuestionCourse));
  }, [dispatch, wrongQuestionCourse]);

  useEffect(() => {
    if (wrongQuestionCourse !== "") {
      setIsCourseSelected(true);
    }
  }, [wrongQuestionCourse])

  const handleWrongQuestionCourse = (e) => {
    setWrongQuestionCourse(e.target.value);
  };

  const handleMistakes = () => {
    if (!isCourseSelected) {
      setError(true);
      setErrorMsg('Please select a course.');
      return;
    } else {
      setError(false);
    }
    navigate('/mistakes');
  }

  return (
    <>
      <div className="question-form">
        <h2>See Your Mistakes</h2>
        <div className="parameter">
          <select
            name="course"
            className="dropdown"
            value={wrongQuestionCourse}
            onChange={handleWrongQuestionCourse}
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
        </div>
        {error ? <p className="error-message">{errorMsg}</p> : null}
      </div>
      {isCourseSelected ? (
        <button className="button mistakes" onClick={handleMistakes}>
          View mistakes
        </button>
      ) : null}
    </>
  );
};

export default Mistakes;
