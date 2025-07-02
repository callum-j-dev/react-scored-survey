import { useState } from 'react';
import QuestionCard from './QuestionCard';

export default function CategoryCard({ categoryId, categoryName, categoryAbbreviation, categoryScore, blurbBullets, questions, categoryScoreData, handleScoreUpdate}) {

    return (
        <div>
            <div className="title-bar">
                <h2>{categoryName}</h2>
                <h3>Your {categoryAbbreviation} Score: <b className="score-box">{categoryScore}</b></h3>
            </div>
            <div className="category-container">
                <ul className="blurb">
                    {blurbBullets.map(bullet => {
                        return (
                            <li>
                                <p>{bullet}</p>
                            </li>
                        )
                    })}
                </ul>
                <ul className="question-container">
                    {questions.map(question => {
                        const questionScoreData = categoryScoreData.questionScores.find(q => q.id === question.id);

                        return (
                            <li key={question.id}>
                                <QuestionCard 
                                    categoryId={categoryId}
                                    questionId={question.id}
                                    questionText ={question.questionText}
                                    questionType={question.type}
                                    questionScoreData={questionScoreData}
                                    answers={question.answers}
                                    handleScoreUpdate={handleScoreUpdate}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
            
        </div>
    )

}