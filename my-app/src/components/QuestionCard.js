export default function QuestionCard({ categoryId, questionId, questionText, questionType, questionScoreData, answers, handleScoreUpdate}) {
    
    const selectedAnswers = questionScoreData.selectedAnswers;
    const selected = selectedAnswers.map(ans => ans.id)

    const score = selectedAnswers.reduce((total, answer) => {
        return total + answer.score;
    }, 0);

    // TODO Lift state so total score can be displayed
    // Question score will get passed in as a prop, updated by parent state via the handleScoreUpdate function
    

    if (questionType === 'single') { // radio button, accepts only one answer
        return (
            <div>
                <h2>{questionText}</h2>
                <ul>
                    {answers.map(answer => {
                        return (
                            <li key={answer.id}>
                                <input type="radio" id={answer.id} value={answer.score} checked={selected.includes(answer.id)} onChange={e => {
                                    if (selected.includes(answer.id)) {
                                        // Do nothing, already selected
                                    } else {
                                        handleScoreUpdate(categoryId, questionId, questionType, answer.id, answer.score);
                                    }
                                }}/>
                                <label htmlFor={answer.id}>{answer.answerText}</label>
                            </li>
                        )
                    })}
                </ul>
                <span>{score}</span>
            </div>
        )
    } else {    // accepts multiple answers
        return (
            <div>
                <h2>{questionText}</h2>
                <ul>
                    {answers.map(answer => {
                        return (
                            <li key={answer.id}>
                                <input type="checkbox" id={answer.id} value={answer.score} checked={selected.includes(answer.id)} onChange={e => {
                                    handleScoreUpdate(categoryId, questionId, questionType, answer.id, answer.score)
                                }} />
                                <label htmlFor={answer.id}>{answer.answerText}</label>
                            </li>
                        )
                    })}
                </ul>
                <span>{score}</span>
            </div>
        )
    }
    
    
}