import React, { useEffect } from 'react';
import { Timer } from 'lucide-react';

const QuizTimer = ({ timeRemaining, onTimeUp }) => {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  return (
    <div className="flex items-center space-x-2 text-lg font-semibold">
      <Timer className="w-6 h-6 text-blue-500" />
      <span className={`${timeRemaining <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
        {timeRemaining}s
      </span>
    </div>
  );
};

export default QuizTimer;