import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TimedQuiz from "./pages/TimedQuiz";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timed-quiz" element={<TimedQuiz />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
}
export default App;