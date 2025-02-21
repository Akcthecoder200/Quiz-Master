
import React from "react";

const QuestionCard = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  showFeedback,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full p-4 text-left rounded-lg transition-colors ${
              selectedAnswer === index
                ? showFeedback
                  ? index === question.correctAnswer
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"
                  : "bg-blue-100 border-blue-500"
                : "bg-gray-50 hover:bg-gray-100"
            } border-2 ${
              selectedAnswer === index
                ? "border-opacity-100"
                : "border-transparent"
            }`}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
