import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setParams } from "../features/question/questionSlice.js";

const TestParams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    course: "",
    difficulty: 0,
    noOfQ: 30,
    time: 30,
  });

  const handleQuestionParams = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.course === "") {
      setError(true);
      setErrorMsg("Please select a course");
      return;
    }
    dispatch(setParams(formData));

    navigate("/test");
  };

  return (
    <>
      <form className="question-form params" onSubmit={onSubmit}>
        <h2>Choose Test Parameters</h2>
        <div className="parameter">
          <label>Course: </label>
          <select
            name="course"
            className="dropdown"
            value={formData.course}
            onChange={handleQuestionParams}
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

        <div className="parameter radio-group">
          <label className="diff-label">Diffficulty: </label>
          <div>
            <input
              type="radio"
              className="diff-option"
              value={"1"}
              name="difficulty"
              onChange={handleQuestionParams}
            />{" "}
            Easy
          </div>

          <div>
            <input
              type="radio"
              className="diff-option"
              value={"2"}
              name="difficulty"
              onChange={handleQuestionParams}
            />{" "}
            Intermediate
          </div>

          <div>
            <input
              type="radio"
              className="diff-option"
              value={"3"}
              name="difficulty"
              onChange={handleQuestionParams}
            />{" "}
            Hard
          </div>
        </div>

        <div className="parameter flex">
          <div>
            <label>Questions: </label>
            <input
              name="noOfQ"
              className="input"
              type="number"
              min={1}
              max={100}
              placeholder=""
              value={formData.noOfQ}
              onChange={handleQuestionParams}
            />
          </div>
          <div>
            <label>Time(Minutes): </label>
            <input
              name="time"
              className="input"
              type="number"
              min={1}
              max={1000}
              placeholder=""
              value={formData.time}
              onChange={handleQuestionParams}
            />
          </div>
        </div>

        <p
          className={
            error ? "error-message visible test" : "error-message hidden test"
          }
        >
          {errorMsg}
        </p>

        <button type="submit" className="button test">
          Start the Test
        </button>
      </form>
    </>
  );
};

export default TestParams;
