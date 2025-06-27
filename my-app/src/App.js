import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import QuestionCard from './components/QuestionCard';

import { data } from './data';

function App() {
  const [questionScores, setQuestionScores] = useState([]);

  return (
    <div className="survey">
      <h1>Welcome</h1>
      <ul>
        {data.map(question => {
          return (<li key={question.id}>
            <QuestionCard
              questionText={question.questionText} 
              answers={question.answers}/>
          </li>)
        })}
      </ul>
    </div>
  )

  // const handleAnswer = (questionId, answerId, score) => {
  //   if (questionScores.some(question => question.id === questionId)) {
  //     setQuestionScores(questionScores.map(question => {
  //       if (question.id === questionId) {
  //         return {
  //           ...question,
  //           answerId: answerId,
  //           score: score
  //         }
  //       } else {
  //         return question;
  //       }
  //     }))
  //   } else {
  //     setQuestionScores([...questionScores, {
  //       id: questionId,
  //       answerId: answerId,
  //       score: score
  //     }])
  //   }
  // }
}

export default App;
