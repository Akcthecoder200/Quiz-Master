import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="border-b bg-gray-100 sticky top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              QuizMaster
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground"
              >
                Home
              </Link>
              <Link
                to="/timed-quiz"
                className="px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
              >
                Timed Quiz
              </Link>
              <Link
                to="/quiz"
                className="px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
              >
                Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;