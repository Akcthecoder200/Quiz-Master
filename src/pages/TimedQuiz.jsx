import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { questions } from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import QuizTimer from "../components/QuizTimer";
import QuizResults from "../components/QuizResults";
import AttemptHistory from "../components/AttemptHistory";

const SECONDS_PER_QUESTION = 30;
const STORAGE_KEY = "quiz_attempts";
const TOTAL_QUESTIONS = 10;

const TimedQuiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    answers: [],
    timeRemaining: SECONDS_PER_QUESTION,
    isComplete: false,
    score: 0,
    startTime: null,
  });

  const [attempts, setAttempts] = useState(() => {
    const savedAttempts = localStorage.getItem(STORAGE_KEY);
    return savedAttempts ? JSON.parse(savedAttempts) : [];
  });

  const [showFeedback, setShowFeedback] = useState(false);
  const [openEndedAnswer, setOpenEndedAnswer] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    if (!quizStarted) return;

    const timer = setInterval(() => {
      setQuizState((prev) => ({
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted]);

  const handleTimeUp = useCallback(() => {
    if (!showFeedback) {
      setShowFeedback(true);
      setTimeout(moveToNextQuestion, 2000);
    }
  }, [showFeedback]);

  const moveToNextQuestion = useCallback(() => {
    setQuizState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;
      const isComplete = nextIndex >= TOTAL_QUESTIONS;

      if (isComplete) {
        const score = prev.answers.reduce((acc, answer, index) => {
          const question = questions[index];
          if (question.type === "open-ended") {
            return answer.toLowerCase() === question.correctAnswer.toLowerCase()
              ? acc + 1
              : acc;
          } else {
            return answer === question.correctAnswer ? acc + 1 : acc;
          }
        }, 0);

        const endTime = Date.now();
        const timeSpent = Math.round((endTime - prev.startTime) / 1000);

        const attempt = {
          id: uuidv4(),
          date: new Date().toISOString(),
          score,
          totalQuestions: TOTAL_QUESTIONS,
          timeSpent,
        };

        setAttempts((prevAttempts) => [attempt, ...prevAttempts]);

        return {
          ...prev,
          isComplete: true,
          score,
        };
      }

      setOpenEndedAnswer("");

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

  const handleOpenEndedSubmit = () => {
    if (!currentQuestion) return;

    const isCorrect =
      openEndedAnswer.trim().toLowerCase() ===
      currentQuestion.correctAnswer.toLowerCase();

    setQuizState((prev) => ({
      ...prev,
      answers: [
        ...prev.answers.slice(0, prev.currentQuestionIndex),
        openEndedAnswer.trim(),
        ...prev.answers.slice(prev.currentQuestionIndex + 1),
      ],
    }));
    setShowFeedback(true);
    setTimeout(() => {
      moveToNextQuestion();
      setOpenEndedAnswer("");
    }, 2000);
  };

  const handleRetry = () => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: SECONDS_PER_QUESTION,
      isComplete: false,
      score: 0,
      startTime: Date.now(),
    });
    setQuizStarted(true);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizState((prev) => ({ ...prev, startTime: Date.now() }));
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg text-center">
          <h1 className="text-2xl font-bold mb-4">📜 Quiz Instructions</h1>
          <ul className="text-left list-disc list-inside text-gray-700">
            <li>
              You have <strong>30 seconds</strong> to answer each question.
            </li>
            <li>
              There is <strong>no cheating</strong> allowed! 🚫
            </li>
            <li>Try your best and aim for the highest score.</li>
            <li>The quiz will start once you click the button below.</li>
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
          <div className="h-[600px] overflow-hidden flex flex-col justify-center bg-white p-6 rounded-lg shadow-lg">
            <QuizResults attempt={attempts[0]} onRetry={handleRetry} />
          </div>
          <div className="h-[600px] overflow-y-auto bg-white p-6 rounded-lg shadow-lg">
            <AttemptHistory attempts={attempts} />
          </div>
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
            Question {quizState.currentQuestionIndex + 1} of {TOTAL_QUESTIONS}
          </div>
          <QuizTimer
            timeRemaining={quizState.timeRemaining}
            onTimeUp={handleTimeUp}
          />
        </div>

        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={
              quizState.answers[quizState.currentQuestionIndex] ?? null
            }
            onSelectAnswer={handleAnswerSelect}
            showFeedback={showFeedback}
            openEndedAnswer={openEndedAnswer}
            setOpenEndedAnswer={setOpenEndedAnswer}
            onOpenEndedSubmit={handleOpenEndedSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default TimedQuiz;