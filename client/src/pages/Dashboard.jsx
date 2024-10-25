import { useState } from "react";
import { useDispatch } from "react-redux";
import {setParams} from '../features/question/questionSlice.js'
import { useNavigate } from "react-router-dom";

 

 const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      course: '',
      difficulty: 0,
      noOfQ: 30
    })

    const onChange = (e) => {
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
      <h1>Dashboard</h1>
      <form className="question-form" onSubmit={onSubmit}>
          <select name="course" value={formData.course} onChange={onChange}>
              <option value={''}>Select a Course</option>
              <option value={'geo'}>Geo</option>
              <option value={'maths'}>maths 1</option>
              <option value={'english'}>english 1</option>
              <option value={'history'}>history 1</option>
              <option value={'dsa'}>dsa</option>
              <option value={'ffd'}>ffd 1</option>
              <option value={'dsds'}>dsds 1</option>
              <option value={'dfvd'}>dfvd 1</option>
              <option value={'swds'}>swds 1</option>
          </select>

          <input type="radio" value={'1'} name="difficulty" onChange={onChange}/> Easy
          <input type="radio" value={'2'} name="difficulty" onChange={onChange}/> Intermediate
          <input type="radio" value={'3'} name="difficulty" onChange={onChange}/> Hard

          <input name="noOfQ" type="number" min={1} max={100} placeholder="Number of Questions" value={formData.noOfQ} onChange={onChange}/>

          <button type="submit">Start the Test</button>
      </form>
    </>
 }

 export default Dashboard;