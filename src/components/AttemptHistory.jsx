import React from "react";
import { History } from "lucide-react";

const AttemptHistory = ({ attempts }) => {
  if (attempts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <History className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold">Previous Attempts</h2>
      </div>
      <div className="space-y-3">
        {attempts.map((attempt) => (
          <div
            key={attempt.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex flex-col">
              <span className="font-medium">
                Score:
                {Math.round((attempt.score / attempt.totalQuestions) * 100)}%
              </span>
              <span className="text-sm text-gray-500">
                {new Date(attempt.date).toLocaleDateString()}
              </span>
            </div>
            <div className="text-right">
              {attempt.timeSpent && (
                <span className="font-medium">{attempt.timeSpent}s</span>
              )}
              <span className="block text-sm text-gray-500">
                {attempt.score}/{attempt.totalQuestions} correct
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttemptHistory;