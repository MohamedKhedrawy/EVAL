import { useSelector } from "react-redux";

const MistakesPage = () => {
  const { wrongQuestions } = useSelector((state) => state.question);

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
        </div>
      </div>
    </>
  );
};

export default MistakesPage;
