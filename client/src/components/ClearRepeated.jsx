import { useDispatch } from "react-redux"
import { clearRepeated } from "../features/question/questionSlice.js"


const ClearRepeated = () => {

    const dispatch = useDispatch()

    const handleClearRepeated = () => {
        dispatch(clearRepeated())
    }

    return <div className="question-form">
        <h2>Clear Repeated Questions</h2>
        <button onClick={handleClearRepeated} className="button long">Clear Repeated Questions</button>
    </div>
}

export default ClearRepeated;