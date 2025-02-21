import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { questions as allQuestions } from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import QuizResults from "../components/QuizResults";
import AttemptHistory from "../components/AttemptHistory";

const STORAGE_KEY = "quiz_attempts";
const TOTAL_QUESTIONS = 5;

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  }, [attempts]);

  const startQuiz = () => {
    const shuffledQuestions = allQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, TOTAL_QUESTIONS);
    setQuizState({
      questions: shuffledQuestions,
      answers: new Array(TOTAL_QUESTIONS).fill(null),
      isComplete: false,
      score: 0,
    });
    setQuizStarted(true);
  };

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
    startQuiz();
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg text-center">
          <h1 className="text-2xl font-bold mb-4">📜 Quiz Instructions</h1>
          <ul className="text-left list-disc list-inside text-gray-700">
            <li>The quiz consists of <strong>10 random questions</strong>.</li>
            <li>Answer all questions and submit your responses.</li>
            <li>Take your time, but no cheating! 🚫</li>
            <li>Click the button below to begin.</li>
          </ul>
          <button 
            onClick={startQuiz} 
            className="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
          >
            Start Quiz 🚀
          </button>
        </div>
      </div>
    );
  }

  if (quizState.isComplete) {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Fixed height for Quiz Results */}
          <div className="h-[600px] overflow-hidden flex flex-col justify-center bg-white p-6 rounded-lg shadow-lg">
            <QuizResults attempt={attempts[0]} onRetry={handleRetry} />
          </div>
      
          {/* Scrollable Attempt History */}
          <div className="h-[600px] overflow-y-auto bg-white p-6 rounded-lg shadow-lg">
            <AttemptHistory attempts={attempts} />
          </div>
      
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

export default Quiz;