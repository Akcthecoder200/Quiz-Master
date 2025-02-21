import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { questions } from '../data/questions';
import QuestionCard from '../components/QuestionCard';
import QuizTimer from '../components/QuizTimer';
import QuizResults from '../components/QuizResults';
import AttemptHistory from '../components/AttemptHistory';

const SECONDS_PER_QUESTION = 30;
const STORAGE_KEY = 'quiz_attempts';

const Quiz = () => {
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    answers: [],
    timeRemaining: SECONDS_PER_QUESTION,
    isComplete: false,
    score: 0,
  });

  const [attempts, setAttempts] = useState(() => {
    const savedAttempts = localStorage.getItem(STORAGE_KEY);
    return savedAttempts ? JSON.parse(savedAttempts) : [];
  });
  
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuizState((prev) => ({
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTimeUp = useCallback(() => {
    if (!showFeedback) {
      setShowFeedback(true);
      setTimeout(moveToNextQuestion, 2000);
    }
  }, [showFeedback]);

  const moveToNextQuestion = useCallback(() => {
    setQuizState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;
      const isComplete = nextIndex >= questions.length;

      if (isComplete) {
        const score = prev.answers.reduce(
          (acc, answer, index) => (answer === questions[index].correctAnswer ? acc + 1 : acc),
          0
        );

        const attempt = {
          id: uuidv4(),
          date: new Date().toISOString(),
          score,
          totalQuestions: questions.length,
          timeSpent: questions.length * SECONDS_PER_QUESTION - prev.timeRemaining,
        };

        setAttempts((prevAttempts) => [attempt, ...prevAttempts]);

        return {
          ...prev,
          isComplete: true,
          score,
        };
      }

      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        timeRemaining: SECONDS_PER_QUESTION,
      };
    });
    setShowFeedback(false);
  }, []);

  const handleAnswerSelect = (answerIndex) => {
    setQuizState((prev) => ({
      ...prev,
      answers: [
        ...prev.answers.slice(0, prev.currentQuestionIndex),
        answerIndex,
        ...prev.answers.slice(prev.currentQuestionIndex + 1),
      ],
    }));
    setShowFeedback(true);
    setTimeout(moveToNextQuestion, 2000);
  };

  const handleRetry = () => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: SECONDS_PER_QUESTION,
      isComplete: false,
      score: 0,
    });
  };

  if (quizState.isComplete) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <QuizResults
            attempt={attempts[0]}
            onRetry={handleRetry}
          />
          <AttemptHistory attempts={attempts} />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg">
          <div className="text-lg font-semibold">
            Question {quizState.currentQuestionIndex + 1} of {questions.length}
          </div>
          <QuizTimer
            timeRemaining={quizState.timeRemaining}
            onTimeUp={handleTimeUp}
          />
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={quizState.answers[quizState.currentQuestionIndex] ?? null}
          onSelectAnswer={handleAnswerSelect}
          showFeedback={showFeedback}
        />

        <AttemptHistory attempts={attempts} />
      </div>
    </div>
  );
};

export default Quiz;