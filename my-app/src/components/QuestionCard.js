import { use, useState } from 'react';


export default function QuestionCard({ questionId, questionText, questionType, answers}) {
    const [selected, setSelected] = useState([]);

    const selectedAnswers = answers.filter(answer => {
        return selected.includes(answer.id);
    });

    const score = selectedAnswers.reduce((total, answer) => {
        return total + answer.score;
    }, 0);

    // TODO Lift state so total score can be displayed

    if (questionType === 'single') { // radio button, accepts only one answer
        return (
            <div>
                <h2>{questionText}</h2>
                <ul>
                    {answers.map(answer => {
                        return (
                            <li key={answer.id}>
                                <input type="radio" id={answer.id} value={answer.score} checked={selected.includes(answer.id)} onClick={e => {
                                    if (selected.includes(answer.id)) {
                                        // Do nothing, already selected
                                    } else {
                                        setSelected([answer.id]);
                                    }
                                }}/>
                                <label for={answer.id}>{answer.answerText}</label>
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
                                <input type="checkbox" id={answer.id} value={answer.score} checked={selected.includes(answer.id)} onClick={e => {
                                    if (selected.includes(answer.id)) {
                                        setSelected(selected.filter(a => a !== answer.id));
                                    } else {
                                        setSelected([...selected, answer.id]); 
                                    }
                                }} />
                                <label for={answer.id}>{answer.answerText}</label>
                            </li>
                        )
                    })}
                </ul>
                <span>{score}</span>
            </div>
        )
    }
    
    
}