import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import CategoryCard from './components/CategoryCard';

import { data } from './data';
import { updatedData } from './updatedData';

function setupInitialStateArray() {
  const stateArray = updatedData.map(category => {
    const questionScores = category.questions.map(question => {
      return (
        {
          id: question.id,
          selectedAnswers: [{id: 'default', score: 0}]
        }
      )
    });

    return (
      {
        id: category.id,
        questionScores: questionScores
      }
    )
  });
  console.log('Initial state:')
  console.log(stateArray);
  return stateArray;
}

function extractQuestionScoreData(categoryScoreData) {

}

function App() {
  const [scores, setScores] = useState(setupInitialStateArray());

  // const categoryScores = [];
  //console.log(scores);

  console.log(scores);

  const categoryScores = scores.map(category => {
    console.log('Updating category scores' + category.id);
    console.log(category);
    console.log(category.questionScores);

    const totalCategoryScore = category.questionScores.reduce((total, current) => {
      const totalQuestionScore = current.selectedAnswers.reduce((aTotal, aCurrent) => {
        return aTotal + aCurrent.score;
      }, 0);

      return total + totalQuestionScore
    },0);

    return (
      {
        id: category.id,
        score: totalCategoryScore
      }
    );
  });

  const totalScore = categoryScores.reduce((total, current) => {
    return total + current.score;
  }, 0);

  const handleScoreUpdate = (categoryId, questionId, questionType, answerId, answerScore) => {
    console.log('Updating score')
    
    const categoryScoreData = scores.find(cat => cat.id === categoryId);
    const questionScoreData = categoryScoreData.questionScores.find(q => q.id === questionId);
    const selectedAnswers = questionScoreData.selectedAnswers;
    const selectedIds = selectedAnswers.map(ans => ans.id);

    let newSelectedAnswers = [];

    if (questionType === 'single') {
      newSelectedAnswers = [{id: answerId, score: answerScore}];
    } else {  // Question type multi
      if (selectedIds.includes(answerId)) {
        newSelectedAnswers = selectedAnswers.filter(ans => ans.id !== answerId);
      } else {
        newSelectedAnswers = [...selectedAnswers, { id: answerId, score: answerScore }];
      }
    }
    console.log('New selectedAnswsers:')
    console.log(newSelectedAnswers);


    // Somehow, the scores category objects are losing the questionScores property

    const newCategoryScoreData = categoryScoreData.questionScores.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          selectedAnswers: newSelectedAnswers
        }
      } else {
        return question;
      }
    });

    console.log('New categoryScoreData:')
    console.log(newCategoryScoreData);

    const newScoreData = scores.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          questionScores: newCategoryScoreData
        }
      } else {
        return cat;
      }
    });

    console.log('Setting new scores')
    setScores(newScoreData);
    console.log('New scores set')

    
  //   setScores(scores.map(category => {
  //     if (category.id === categoryId) {
  //       let updatedQuestions = category.questionScores.map(q => {
  //         if (q.id === questionId) {
  //           if (questionType === 'single') {
  //             return {
  //               ...q,
  //               selectedAnswers: [{answerId, answerScore}]
  //             }
  //           } else { // question type is multi
  //             if (q.selectedAnswers.some(ans => ans.id === answerId)) { // Answer is already checked, -> unchecking
  //               return {
  //                 ...q,
  //                 selectedAnswers: [q.selectedAnswsers.filter(a => a.id !== answerId)]
  //               }
  //             } else {
  //               return {
  //                 ...q,
  //                 selectedAnswers: [...q.selectedAnswers, {answerId, answerScore}]
  //               }
  //             }
  //           }
  //         } else {
  //           return q;
  //         }
  //       });

  //       return (
  //         {
  //           id: categoryId,
  //           questionScores: updatedQuestions
  //         }
  //       )
  //     } else {
  //       return category;
  //     }
  //   }));
  }



  // const handleScoreUpdate = (questionId, questionScore) => {
  //   if (questionScores.some(q => q.id === questionId)) {
  //     setQuestionScores(questionScores.map(qs => {
  //       if (qs.id === questionId) {
  //         return ({
  //           ...qs,
  //           score: questionScore
  //         });
  //       } else {
  //         return qs;
  //       }
  //     }));
  //   } else {
  //     setQuestionScores([...questionScores, 
  //       {
  //         id: questionId,
  //         score: questionScore
  //       }]);
  //   }
  // }
  return (
    <div className="survey">
      <h1>Welcome!</h1>
      <ul>
        {updatedData.map(category => {
          return (
            <li key={category.id}>
              <CategoryCard
                categoryId={category.id} 
                categoryName={category.name}
                categoryAbbreviation={category.abbreviation}
                categoryScore={categoryScores.find(cat => cat.id === category.id).score}
                blurbBullets={category.blurbBullets}
                questions={category.questions}
                categoryScoreData={scores.find(cat => cat.id === category.id)}
                handleScoreUpdate={handleScoreUpdate}
              />
            </li>
          )
        })}
      </ul>
      <b>Total Score: {totalScore}</b>
    </div>
  )
  // return (
  //   <div className="survey">
  //     <h1>Welcome</h1>
  //     <ul>
  //       {data.map(question => {
  //         return (<li key={question.id}>
  //           <QuestionCard
  //             questionId={question.id}
  //             questionText={question.questionText}
  //             questionType={question.type} 
  //             answers={question.answers}
  //             handleScoreUpdate={handleScoreUpdate}/>
  //         </li>)
  //       })}
  //     </ul>
  //     <b>Total: {totalScore}</b>
  //   </div>
  // )

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
