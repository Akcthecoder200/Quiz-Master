import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { questions as allQuestions } from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import QuizResults from "../components/QuizResults";
import AttemptHistory from "../components/AttemptHistory";

const STORAGE_KEY = "quiz_attempts";
const TOTAL_QUESTIONS = 5; // Number of random questions to display

const NonTimedQuiz = () => {
  const [quizState, setQuizState] = useState({
    questions: [],
    answers: new Array(TOTAL_QUESTIONS).fill(null),
    isComplete: false,
    score: 0,
  });

  const [attempts, setAttempts] = useState(() => {
    const savedAttempts = localStorage.getItem(STORAGE_KEY);
    return savedAttempts ? JSON.parse(savedAttempts) : [];
  });

  useEffect(() => {
    // Select 5 random questions
    const shuffledQuestions = allQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, TOTAL_QUESTIONS);
    setQuizState((prev) => ({ ...prev, questions: shuffledQuestions }));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  }, [attempts]);

  const handleAnswerSelect = (answerIndex, questionIndex) => {
    setQuizState((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[questionIndex] = answerIndex;
      return { ...prev, answers: newAnswers };
    });
  };

  const handleSubmit = () => {
    const score = quizState.answers.reduce(
      (acc, answer, index) =>
        answer === quizState.questions[index].correctAnswer ? acc + 1 : acc,
      0
    );

    const attempt = {
      id: uuidv4(),
      date: new Date().toISOString(),
      score,
      totalQuestions: TOTAL_QUESTIONS,
    };

    setAttempts((prevAttempts) => [attempt, ...prevAttempts]);
    setQuizState((prev) => ({ ...prev, isComplete: true, score }));
  };

  const handleRetry = () => {
    const shuffledQuestions = allQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, TOTAL_QUESTIONS);
    setQuizState({
      questions: shuffledQuestions,
      answers: new Array(TOTAL_QUESTIONS).fill(null),
      isComplete: false,
      score: 0,
    });
  };

  if (quizState.isComplete) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <QuizResults attempt={attempts[0]} onRetry={handleRetry} />
          <AttemptHistory attempts={attempts} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {quizState.questions.map((question, index) => (
          <QuestionCard
            key={index}
            question={question}
            selectedAnswer={quizState.answers[index] ?? null}
            onSelectAnswer={(answerIndex) =>
              handleAnswerSelect(answerIndex, index)
            }
          />
        ))}

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default NonTimedQuiz;