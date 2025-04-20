import { useDispatch, useSelector } from "react-redux"
import { clearRepeated } from "../features/question/questionSlice.js"
import { useEffect, useState } from "react"


const ClearRepeated = () => {

    const dispatch = useDispatch()

    const {message, isSuccess, isError} = useSelector((state) => state.question)

    const [isCleared, setIsCleared] = useState(false);
    const [isScope, setIsScope] = useState(false);

    useEffect(() => {
        setIsCleared(false);
        setIsScope(true);
        
    }, [])

    useEffect(() => {
        if (isSuccess) {
            console.log(message);
            setIsCleared(true);
        }

        // if (isError) {
        //     console.log(message);
        //     setIsCleared(true);
        // }
    }, [isSuccess, message, isError]) 

    const handleClearRepeated = () => {
        dispatch(clearRepeated());
    }

    return <div className="question-form clear">
        <h2>Clear Repeated Questions</h2>
        <button onClick={handleClearRepeated} className="button long">Clear Repeated Questions</button>
        {(isCleared && isSuccess) ? (<p className="repeated-msg">The Past Has Been Erased</p>) 
        : (isCleared && isError) ? (<p className="repeated-msg">Mission Failed</p>) : null}
    </div> 
}

export default ClearRepeated;