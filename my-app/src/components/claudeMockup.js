import React, { useState } from 'react';

const SurveyApp = () => {
  // Sample survey data - you can customize this
  const surveyData = {
    title: "Personality Assessment Survey",
    description: "Answer the following questions to discover your personality type.",
    questions: [
      {
        id: 1,
        question: "How do you prefer to spend your free time?",
        type: "single",
        options: [
          { text: "Reading a book at home", score: 1 },
          { text: "Going out with friends", score: 3 },
          { text: "Trying a new hobby", score: 2 },
          { text: "Exercising outdoors", score: 4 }
        ]
      },
      {
        id: 2,
        question: "What motivates you at work? (Select all that apply)",
        type: "multiple",
        options: [
          { text: "Recognition from colleagues", score: 2 },
          { text: "Challenging projects", score: 3 },
          { text: "Work-life balance", score: 1 },
          { text: "Learning new skills", score: 2 },
          { text: "Leading a team", score: 3 }
        ]
      },
      {
        id: 3,
        question: "When making decisions, you tend to:",
        type: "single",
        options: [
          { text: "Think it through carefully", score: 2 },
          { text: "Go with your gut feeling", score: 4 },
          { text: "Ask others for advice", score: 1 },
          { text: "Research all options", score: 3 }
        ]
      },
      {
        id: 4,
        question: "Which activities help you recharge? (Select all that apply)",
        type: "multiple",
        options: [
          { text: "Spending time alone", score: 1 },
          { text: "Socializing with friends", score: 3 },
          { text: "Being in nature", score: 2 },
          { text: "Listening to music", score: 1 },
          { text: "Physical exercise", score: 2 }
        ]
      },
      {
        id: 5,
        question: "Your ideal work environment is:",
        type: "single",
        options: [
          { text: "Quiet and organized", score: 1 },
          { text: "Collaborative and dynamic", score: 3 },
          { text: "Flexible and creative", score: 2 },
          { text: "Fast-paced and challenging", score: 4 }
        ]
      }
    ]
  };

  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId, optionIndex, score, questionType) => {
    setAnswers(prev => {
      if (questionType === 'multiple') {
        // For multiple choice, toggle the selection using option index
        const currentAnswers = prev[questionId] || [];
        const existingIndex = currentAnswers.findIndex(item => item.optionIndex === optionIndex);
        
        if (existingIndex !== -1) {
          // Remove option if already selected
          const newAnswers = currentAnswers.filter(item => item.optionIndex !== optionIndex);
          return {
            ...prev,
            [questionId]: newAnswers.length > 0 ? newAnswers : undefined
          };
        } else {
          // Add option if not selected
          return {
            ...prev,
            [questionId]: [...currentAnswers, { optionIndex, score }]
          };
        }
      } else {
        // For single choice, replace the answer
        return {
          ...prev,
          [questionId]: score
        };
      }
    });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === surveyData.questions.length) {
      setShowResults(true);
    }
  };

  const calculateTotalScore = () => {
    return Object.values(answers).reduce((total, answer) => {
      if (Array.isArray(answer)) {
        // For multiple choice questions, sum all selected scores
        return total + answer.reduce((sum, item) => sum + item.score, 0);
      } else {
        // For single choice questions, add the score directly
        return total + (answer || 0);
      }
    }, 0);
  };

  const getPersonalityType = (score) => {
    if (score <= 12) return { type: "Thoughtful Introvert", description: "You prefer quiet reflection and careful consideration in your approach to life." };
    if (score <= 18) return { type: "Balanced Adapter", description: "You have a good balance of introspective and outgoing qualities." };
    if (score <= 24) return { type: "Social Collaborator", description: "You thrive in social situations and enjoy working with others." };
    return { type: "Dynamic Leader", description: "You're energetic, decisive, and naturally take charge in most situations." };
  };

  const resetSurvey = () => {
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const totalScore = calculateTotalScore();
    const personality = getPersonalityType(totalScore);
    
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Survey Results</h1>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">{personality.type}</h2>
            <p className="text-gray-700 mb-4">{personality.description}</p>
            <div className="text-lg font-medium text-gray-800">
              Total Score: <span className="text-blue-600">{totalScore}</span> out of {surveyData.questions.reduce((max, q) => {
                const maxQuestionScore = q.options.reduce((sum, opt) => sum + opt.score, 0);
                return max + maxQuestionScore;
              }, 0)}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Score Breakdown:</h3>
            <div className="space-y-2">
              {surveyData.questions.map((question, index) => {
                const answer = answers[question.id];
                let displayScore;
                
                if (Array.isArray(answer)) {
                  // Multiple choice question
                  displayScore = answer.reduce((sum, item) => sum + item.score, 0);
                } else {
                  // Single choice question
                  displayScore = answer || 0;
                }
                
                return (
                  <div key={question.id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Question {index + 1} {question.type === 'multiple' ? '(multiple)' : ''}</span>
                    <span className="font-medium text-gray-800">{displayScore} points</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <button
            onClick={resetSurvey}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Take Survey Again
          </button>
        </div>
      </div>
    );
  }

  const isQuestionAnswered = (questionId) => {
    const answer = answers[questionId];
    return answer !== undefined && (Array.isArray(answer) ? answer.length > 0 : true);
  };

  const getAnsweredQuestionsCount = () => {
    return surveyData.questions.filter(q => isQuestionAnswered(q.id)).length;
  };

  const getQuestionScore = (questionId) => {
    const answer = answers[questionId];
    if (Array.isArray(answer)) {
      return answer.reduce((sum, item) => sum + item.score, 0);
    }
    return answer || 0;
  };

  const progress = (getAnsweredQuestionsCount() / surveyData.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{surveyData.title}</h1>
        <p className="text-gray-600 mb-4">{surveyData.description}</p>
        
        {/* Dynamic Total Score */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <div className="text-2xl font-bold text-blue-800">
            Current Total Score: {calculateTotalScore()}
          </div>
          <div className="text-sm text-blue-600 mt-1">
            {getAnsweredQuestionsCount()} of {surveyData.questions.length} questions answered
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">{getAnsweredQuestionsCount()} of {surveyData.questions.length} questions answered</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* All Questions */}
      <div className="space-y-8 mb-8">
        {surveyData.questions.map((question, questionIndex) => {
          const questionScore = getQuestionScore(question.id);
          const isAnswered = isQuestionAnswered(question.id);
          
          return (
            <div key={question.id} className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-gray-800 flex-1">
                  {questionIndex + 1}. {question.question}
                </h2>
                <div className="ml-4 text-right">
                  <div className={`text-lg font-bold ${isAnswered ? 'text-blue-600' : 'text-gray-400'}`}>
                    {questionScore} pts
                  </div>
                  <div className="text-xs text-gray-500">
                    {isAnswered ? 'Current' : 'No answer'}
                  </div>
                </div>
              </div>
              
              {question.type === 'multiple' && (
                <p className="text-sm text-gray-600 mb-4 italic">Select all that apply</p>
              )}
              
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => {
                  const isSelected = question.type === 'multiple' 
                    ? (answers[question.id] || []).some(item => item.optionIndex === optionIndex)
                    : answers[question.id] === option.score;
                  
                  return (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswerSelect(question.id, optionIndex, option.score, question.type)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-800'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 border-2 rounded ${
                            question.type === 'multiple' ? 'rounded-sm' : 'rounded-full'
                          } ${
                            isSelected 
                              ? 'bg-blue-500 border-blue-500' 
                              : 'border-gray-300'
                          }`}>
                            {isSelected && (
                              <div className={`w-full h-full ${
                                question.type === 'multiple' 
                                  ? 'bg-blue-500 rounded-sm' 
                                  : 'bg-blue-500 rounded-full'
                              }`}></div>
                            )}
                          </div>
                          <span className="font-medium">{option.text}</span>
                        </div>
                        <span className="text-sm text-gray-500">+{option.score} pts</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={getAnsweredQuestionsCount() !== surveyData.questions.length}
          className={`px-8 py-4 rounded-lg font-medium text-lg transition-colors ${
            getAnsweredQuestionsCount() === surveyData.questions.length
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Submit Survey
        </button>
        {getAnsweredQuestionsCount() !== surveyData.questions.length && (
          <p className="text-sm text-gray-500 mt-2">
            Please answer all questions to submit
          </p>
        )}
      </div>
    </div>
  );
};

export default SurveyApp;