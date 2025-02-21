import React from 'react';
import { Routes, Route,Link } from 'react-router-dom';
import Quiz from './pages/Quiz';
import Home from './components/Home';
import NonTimedQuiz from './pages/NonTimedQuiz';
//import { Link } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="mb-6">
        {/* <Link 
          to="/timed-Quiz" 
          className="text-blue-600 font-semibold hover:underline"
        >
          Timed Quiz
        </Link> */}
      </nav>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/timed-Quiz" element={<Quiz />} />
      <Route path="/Quiz" element={<NonTimedQuiz />} />
      </Routes>
    </div>
  );
}

export default App;