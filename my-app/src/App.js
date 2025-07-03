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

function setupInitialInputs() {
    const inputsArray = [];
    updatedData.forEach(category => {
      category.questions.forEach(question => {
        inputsArray.push({id: question.id, questionData: []});
      })
    });

    return inputsArray;
  }

  function setupInitialTextFields() {
    let textFields = [];

    updatedData.forEach(category => {
      category.questions.forEach(question => {
        question.answers.forEach(answer => {
          if (answer.hasTextField) {
            textFields.push({answerId: answer.id, textId: answer.id + "-text", value:""})
          }
        })
      })
    });

    return textFields;
  }

function App() {
  const [scores, setScores] = useState(setupInitialStateArray());
  const [inputs, setInputs] = useState(setupInitialInputs());
  const [textFields, setTextFields] = useState(setupInitialTextFields())
  
  console.log("fresh render inputs");
  console.log(inputs);
  console.log("fresh render text fields");
  console.log(textFields);

  const categoryScores = scores.map(category => {
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

  const handleScoreUpdate = (categoryId, questionId, questionType, answerId, answerScore, answerHasText) => {
    const categoryScoreData = scores.find(cat => cat.id === categoryId);
    const questionScoreData = categoryScoreData.questionScores.find(q => q.id === questionId);
    const selectedAnswers = questionScoreData.selectedAnswers;
    const questionInputs = inputs.find(input => input.id === questionId).questionData;
    const selectedIds = selectedAnswers.map(ans => ans.id);

    console.log('Current text fields');
    console.log(textFields)

    let newSelectedAnswers = [];
    let newQuestionInputs = [];

    if (questionType === 'single') {
      newSelectedAnswers = [{id: answerId, score: answerScore}];

      if (answerHasText) {
        const existingTextField = textFields.find(textField => textField.answerId === answerId).value;
        
        newQuestionInputs = [{id: answerId, value: answerScore}, {id: answerId + "-text", value: existingTextField}];

      } else {
        newQuestionInputs = [{id: answerId, value: answerScore}];
      }
      
    } else {  // Question type multi
      if (selectedIds.includes(answerId)) {
        newSelectedAnswers = selectedAnswers.filter(ans => ans.id !== answerId);
        newQuestionInputs = questionInputs.filter(ans => ans.id !== answerId);
      } else {
        newSelectedAnswers = [...selectedAnswers, { id: answerId, score: answerScore }];
        newQuestionInputs = [...questionInputs, { id: answerId, value: answerScore }];
      }
    }

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

    const newInputs = inputs.map(input => {
      if (input.id === questionId) {
        return {
          ...input,
          questionData: newQuestionInputs
        };
      } else {
        return input;
      }
    })

    console.log('Current inputs');
    console.log(inputs);

    setScores(newScoreData);
    setInputs(newInputs);
  }

  const handleText = (questionId, answerId, textId, inputText) => {
    console.log(inputs);
    console.log(questionId);

    const questionInputs = inputs.find(input => input.id === questionId).questionData;
    let newQuestionInputs = [];

    // console.log('question inputs')
    // console.log(questionInputs);
    console.log('Current text fields');
    console.log(textFields);

    if (questionInputs.some(input => input.id === textId)) {
      newQuestionInputs = questionInputs.map(inp => {
        if (inp.id === textId) {
          return {id: textId, value: inputText};
        } else {
          return inp;
        }
      })
    } else {
      newQuestionInputs = [...questionInputs, {id: textId, value: inputText}];
    }

    const newInputs = inputs.map(input => {
      if (input.id === questionId) {
        return {
          ...input,
          questionData: newQuestionInputs
        };
      } else {
        return input;
      }
    });

    const newTextFields = textFields.map(textField => {
      console.log('Text field Id') ;
      console.log(textField.answerId);
      console.log('Answer id')
      console.log(answerId);

      if (textField.answerId === answerId) {
        return {
          ...textField,
          value: inputText
        };
      } else {
        return textField;
      }
    });

    setInputs(newInputs);
    setTextFields(newTextFields);
    
    // if (inputs.some(input => input.id === textId)) {
    //   setInputs(inputs.map(input => {
    //     if (input.id === textId) {
    //       return {id: textId, value: {inputText}};
    //     } else {
    //       return input;
    //     }
    //   }))
    // } else {
    //   setInputs([...inputs, {id: textId, value: inputText}]);
    // }

  }

  const inputToString = () => {
    console.log(inputs);
    let outStr = "";
    //inputs.forEach(input => outStr += (input.id + ": " + input.value + "\n"));
    inputs.forEach(question => {
      question.questionData.forEach(qd => {
        outStr += (qd.id + ": " + qd.value + "\n");
      });
    });

    return outStr;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputToString());
  }

  return (
    <div className="survey">
      <form onSubmit={handleSubmit}>
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
                  handleText={handleText}
                />
              </li>
            )
          })}
        </ul>
        <h3>Total Score: <b className='score-box'>{totalScore}</b></h3>
        <br></br>
        <br></br>
        <input type="submit" />
      </form>
      
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
