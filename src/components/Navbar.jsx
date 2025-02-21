import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-gray-100 sticky top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              QuizMaster
            </Link>
          </div>

          {/* Desktop Menu */}
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-100 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-start px-4 space-y-4">
          <Link
            to="/"
            className="px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground w-full text-left"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/timed-quiz"
            className="px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md w-full text-left"
            onClick={() => setIsOpen(false)}
          >
            Timed Quiz
          </Link>
          <Link
            to="/quiz"
            className="px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md w-full text-left"
            onClick={() => setIsOpen(false)}
          >
            Quiz
          </Link>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
