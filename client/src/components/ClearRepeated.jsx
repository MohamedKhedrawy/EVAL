import { useDispatch } from "react-redux"
import { clearRepeated } from "../features/question/questionSlice.js"


const ClearRepeated = () => {

    const dispatch = useDispatch()

    const handleClearRepeated = () => {
        dispatch(clearRepeated())
    }

    return <>
        <h2>Clear Repeated Questions</h2>
        <button onClick={handleClearRepeated}>Clear Repeated Questions</button>
    </>
}

export default ClearRepeated;