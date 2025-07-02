export default function QuestionCard({ categoryId, questionId, questionText, questionType, questionScoreData, answers, handleScoreUpdate}) {
    
    const selectedAnswers = questionScoreData.selectedAnswers;
    console.log('Selected Answers:')
    console.log(selectedAnswers);
    const selected = selectedAnswers.map(ans => ans.id)

    const score = selectedAnswers.reduce((total, answer) => {
        console.log('Total ' + total);
        console.log('Current ' + answer.score);
        return total + answer.score;
    }, 0);

    // TODO Lift state so total score can be displayed
    // Question score will get passed in as a prop, updated by parent state via the handleScoreUpdate function
    

    if (questionType === 'single') { // radio button, accepts only one answer
        return (
            <div className="question-card">
                <h2>{questionText}</h2>
                <ul>
                    {answers.map(answer => {
                        return (
                            <li key={answer.id}>
                                <input className="answer" type="radio" id={answer.id} name={answer.id} value={answer.score} checked={selected.includes(answer.id)} onChange={e => {
                                    if (selected.includes(answer.id)) {
                                        // Do nothing, already selected
                                    } else {
                                        handleScoreUpdate(categoryId, questionId, questionType, answer.id, answer.score);
                                    }
                                }}/>
                                <label htmlFor={answer.id}>{answer.answerText}</label>
                                {answer.hasTextField &&
                                    <input type="text" id={answer.id + "text"} name={answer.id + "text"} disabled={!selected.includes(answer.id)}></input>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    } else if (questionType === 'text') {
        const answer = answers[0];
        
        return (
            <div className="question-card">
                <p>{questionText}: <input type="text" id={answer.id + "text"} name={answer.id + "text"} /></p>
            </div>
        )
    } else {    // accepts multiple answers
        return (
            <div className="question-card">
                <h2>{questionText}</h2>
                <ul>
                    {answers.map(answer => {
                        return (
                            <li key={answer.id}>
                                <input className="answer" type="checkbox" id={answer.id} name={answer.id} value={answer.score} checked={selected.includes(answer.id)} onChange={e => {
                                    handleScoreUpdate(categoryId, questionId, questionType, answer.id, answer.score)
                                }} />
                                <label htmlFor={answer.id}>{answer.answerText}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
    
    
}