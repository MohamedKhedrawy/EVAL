import { useState } from "react";
import { useDispatch } from "react-redux";
import {setParams} from '../features/question/questionSlice.js'
import { useNavigate } from "react-router-dom";

 

 const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [answerFields, setAnswerFields] = useState(1);
    const [formData, setFormData] = useState({
      course: '',
      difficulty: 0,
      noOfQ: 30
    })
    const [postQuestions, setPostQuestions] = useState({
      title: '',
      course: '',
      diificulty: 0
    })
    const [postAnswers, setPostAnswers] = useState(
      [{
        answerBody: '',
        isCorrect: false
      }])

    const handleQuestionParams = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value 
      }))
    }

    const handleQuestionPost = (e) => {
      setPostQuestions((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

    const handleAnswerPost = (e, index) => {
      const updatedAnswers = [...postAnswers];
      updatedAnswers[index].answerBody = e.target.value;
      setPostAnswers(updatedAnswers);
    }

    const handleToggleCorrect = (answerIndex) => {
      const updatedAnswers = [...postAnswers];
      updatedAnswers[answerIndex].isCorrect = !updatedAnswers[answerIndex].isCorrect;
      setPostAnswers(updatedAnswers);
    }

    const removeAnswerField = (index) => {
      const updatedAnswers = postAnswers.filter((_, idx) => idx !== index)
      setPostAnswers(updatedAnswers)
      setAnswerFields((prevState) => prevState - 1)
    }

    const addAnswerField = () => {
      setPostAnswers([...postAnswers, {answerBody: '', isCorrect: false}]);
      setAnswerFields((prevState) => prevState + 1)
    }

    const onSubmit = (e) => {
      e.preventDefault();
      dispatch(setParams(formData))
      
      navigate('/test')
    }

    return <>
      <h1>Dashboard</h1>
      <form className="question-form" onSubmit={onSubmit}>
          <h2>Choose Test Parameters</h2>
          <label>Course: </label>
          <select name="course" value={formData.course} onChange={handleQuestionParams}>
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

          <label>Diffficulty: </label>
          <input type="radio" value={'1'} name="difficulty" onChange={handleQuestionParams}/> Easy
          <input type="radio" value={'2'} name="difficulty" onChange={handleQuestionParams}/> Intermediate
          <input type="radio" value={'3'} name="difficulty" onChange={handleQuestionParams}/> Hard

          <label>Number of Questions</label>
          <input name="noOfQ" type="number" min={1} max={100} placeholder="Number of Questions" value={formData.noOfQ} onChange={handleQuestionParams}/>

          <button type="submit">Start the Test</button>
      </form>

      <form>
          <h2>Post New Question</h2>

          <label>Question: </label>
          <input name="title" type="text" placeholder="Title" value={postQuestions.title} required onChange={handleQuestionPost}/>

          <div>
            <label>Answers: </label>
            {postAnswers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <input 
                type="text"
                name={`Answer ${answerIndex + 1}`}
                value={answer.answerBody}
                placeholder={`Answer ${answerIndex + 1}`}
                onChange={(e) => handleAnswerPost(e, answerIndex)}
                required/>

                <input 
                id={answerIndex}
                name="isCorrect"
                type="checkbox"
                checked={answer.isCorrect}
                onChange={() => handleToggleCorrect(answerIndex)}/>
                <label htmlFor={answerIndex}>Correct Answer</label>

                <button type="button" onClick={() => removeAnswerField(answerIndex)} disabled={(answerFields <= 1)} >Remove</button>
              </div>
            ))}
            <button type="button" onClick={addAnswerField}>Add New Choice</button>
          </div>

          <label>Course: </label>
          <select name="course" value={postQuestions.course} onChange={handleQuestionPost}>
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

          <label>Diffficulty: </label>
          <input type="radio" value={'1'} name="difficulty" onChange={handleQuestionPost}/> Easy
          <input type="radio" value={'2'} name="difficulty" onChange={handleQuestionPost}/> Intermediate
          <input type="radio" value={'3'} name="difficulty" onChange={handleQuestionPost}/> Hard

          <button type="submit">Add Question</button>
      </form>
    </>
 }

 export default Dashboard;