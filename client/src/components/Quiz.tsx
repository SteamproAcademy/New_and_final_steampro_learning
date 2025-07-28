import { useState } from 'react';
import { type QuizQuestion } from '../data/trainingData';
import { Button } from './ui/button';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score
      const correctAnswers = questions.filter((q, index) => 
        selectedAnswers[index] === q.correctAnswer
      ).length;
      const finalScore = Math.round((correctAnswers / questions.length) * 100);
      setScore(finalScore);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleComplete = () => {
    onComplete(score);
  };

  if (showResults) {
    const passed = score === 100;
    
    return (
      <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-center">
          <i className={`text-4xl mb-4 ${passed ? 'fas fa-trophy text-yellow-500' : 'fas fa-times-circle text-red-500'}`}></i>
          <h3 className="text-xl font-semibold text-steampro-dark mb-2">
            {passed ? 'Congratulations!' : 'Not Quite There Yet'}
          </h3>
          <p className="text-gray-600 mb-4">
            You scored <span className={`font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>{score}%</span> on this quiz.
          </p>
          {passed ? (
            <p className="text-green-700 mb-6">You've successfully completed this module!</p>
          ) : (
            <p className="text-red-700 mb-6">You need 100% to pass. Please review the material and try again.</p>
          )}
          <div className="space-x-4">
            {!passed && (
              <Button onClick={handleRetry} variant="outline">
                Retry Quiz
              </Button>
            )}
            {passed && (
              <Button onClick={handleComplete} className="bg-steampro-blue hover:bg-steampro-blue/90">
                Complete Module
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-steampro-dark">
          <i className="fas fa-question-circle text-steampro-blue mr-2"></i>
          Knowledge Quiz
        </h2>
        <span className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Quiz Progress */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-steampro-blue h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-steampro-dark mb-4">
          {currentQuestion.question}
        </h3>
        
        <div className="space-y-3">
          {currentQuestion.choices.map((choice, index) => (
            <label 
              key={index}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
            >
              <input 
                type="radio" 
                name="quiz-answer" 
                className="mr-3 text-steampro-blue"
                checked={selectedAnswers[currentQuestionIndex] === choice}
                onChange={() => handleAnswerSelect(choice)}
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Quiz Actions */}
      <div className="flex justify-between items-center">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <i className="fas fa-arrow-left mr-2"></i>Previous
        </button>
        
        <Button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestionIndex]}
          className="bg-steampro-blue hover:bg-steampro-blue/90"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          <i className="fas fa-arrow-right ml-2"></i>
        </Button>
      </div>
    </div>
  );
}
