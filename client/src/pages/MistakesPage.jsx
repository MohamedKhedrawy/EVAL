import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MistakesPage = () => {

  const navigate = useNavigate();
  
  const { wrongQuestions } = useSelector((state) => state.question);

  const handleDashboardNav = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="test-page-container">
        <div className="test-window">
          <ol>
            {wrongQuestions
              ? wrongQuestions.map((wrongQuestion, wrongQuestionIndex) => (
                  <li key={wrongQuestionIndex}>
                    <div>
                      <h3 className="question-text">{wrongQuestion.title}</h3>
                      <p>
                        <strong>Difficulty: </strong>
                        {wrongQuestion.difficulty}
                      </p>
                      <p>
                        <strong>Correct answer: </strong>
                        {wrongQuestion.answers
                          .filter((answer) => answer.isCorrect)
                          .map((answer) => answer.answerBody)}
                      </p>
                    </div>
                  </li>
                ))
              : null}
          </ol>
          <button
                  onClick={handleDashboardNav}
                  className="end-test-button"
                >
                  Go Back
                </button>
        </div>
      </div>
    </>
  );
};

export default MistakesPage;
