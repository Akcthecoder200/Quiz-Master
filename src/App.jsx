import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Home from "./components/Home";
import NonTimedQuiz from "./pages/NonTimedQuiz";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timed-quiz" element={<Quiz />} />
        <Route path="/quiz" element={<NonTimedQuiz />} />
      </Routes>
    </div>
  );
}

export default App;