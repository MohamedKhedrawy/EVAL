import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { setParams } from "../features/question/questionSlice.js"


const TestParams = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        course: '',
        difficulty: 0,
        noOfQ: 30
      })

      const handleQuestionParams = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value 
        }))
      }

      const onSubmit = (e) => {
        e.preventDefault();
        dispatch(setParams(formData))
        
        navigate('/test')
      }

    return <>
        <form className="question-form" onSubmit={onSubmit}>
          <h2>Choose Test Parameters</h2>
          <div className="parameter">
            <label>Course: </label>
            <select name="course" className="dropdown" value={formData.course} onChange={handleQuestionParams}>
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
          </div>

          <div className="parameter radio-group"><label>Diffficulty: </label>
            <input type="radio" className="" value={'1'} name="difficulty" onChange={handleQuestionParams}/> Easy
            <input type="radio" className="" value={'2'} name="difficulty" onChange={handleQuestionParams}/> Intermediate
            <input type="radio" className="" value={'3'} name="difficulty" onChange={handleQuestionParams}/> Hard
          </div>

          <div className="parameter">
          <label>Number of Questions: </label>
            <input name="noOfQ" className="input" type="number" min={1} max={100} placeholder="Number of Questions" value={formData.noOfQ} onChange={handleQuestionParams}/>
          </div>

          <button type="submit" className="button">Start the Test</button>
      </form>
    </>
}

export default TestParams