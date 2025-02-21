import React from 'react';
import { Trophy, Clock, Calendar } from 'lucide-react';

const QuizResults = ({ attempt, onRetry }) => {
  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center mb-6">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-gray-600">Here's how you did:</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Score:</span>
          </div>
          <span className="text-lg font-semibold">{percentage}%</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Time Spent:</span>
          </div>
          <span className="text-lg font-semibold">{attempt.timeSpent}s</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Date:</span>
          </div>
          <span className="text-lg font-semibold">
            {new Date(attempt.date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <button
        onClick={onRetry}
        className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default QuizResults;