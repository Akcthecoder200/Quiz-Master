//import Link from "next/link"
import { Link } from "react-router-dom";
import { Timer, Brain, Users, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
     

      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Test Your Knowledge with QuizMaster
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Challenge yourself with our diverse range of quizzes. From timed
            challenges to subject-specific tests, enhance your learning journey
            today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/quiz"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Start Quiz <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Quiz Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Timer className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Timed Quizzes</h3>
              <p className="text-muted-foreground">
                Challenge yourself with time-bound quizzes to test your speed
                and accuracy.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Subject Quizzes</h3>
              <p className="text-muted-foreground">
                Explore quizzes across various subjects to expand your
                knowledge.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Join our community of learners and share your quiz achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} QuizMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}