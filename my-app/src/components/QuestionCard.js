import { useState } from 'react';


export default function QuestionCard({ questionText, answers}) {

    return (
        <div>
            <h2>{questionText}</h2>
            <ul>
                {answers.map(answer => {
                    return (<li key={answer.id}>{answer.answerText}</li>)
                })}
            </ul>
        </div>
    )
}