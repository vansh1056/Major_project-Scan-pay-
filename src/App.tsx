import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./Home";
import Feedback from "./Feedback";
import Team from "./Team";
import Contact from "./Contact";

function AppContent() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const linkClasses = (path: string) =>
    `hover:text-white ${location.pathname === path ? "text-white font-semibold underline" : "text-gray-300"}`;

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Scan & Pay</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <nav className="flex flex-col space-y-4 mb-6 text-center">
          <Link to="/" className={linkClasses("/")} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/feedback" className={linkClasses("/feedback")} onClick={() => setIsOpen(false)}>Feedback</Link>
          <Link to="/team" className={linkClasses("/team")} onClick={() => setIsOpen(false)}>Project Team</Link>
          <Link to="/contact" className={linkClasses("/contact")} onClick={() => setIsOpen(false)}>Contact Us</Link>
        </nav>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-center space-x-6 mb-8 sticky top-0 z-50 bg-gray-900 py-4 shadow-md rounded">
        <Link to="/" className={linkClasses("/")}>Home</Link>
        <Link to="/feedback" className={linkClasses("/feedback")}>Feedback</Link>
        <Link to="/team" className={linkClasses("/team")}>Project Team</Link>
        <Link to="/contact" className={linkClasses("/contact")}>Contact Us</Link>
      </nav>

      {/* Animated Page Content */}
      <div className="max-w-4xl mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div {...pageTransition}>
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/feedback"
              element={
                <motion.div {...pageTransition}>
                  <Feedback />
                </motion.div>
              }
            />
            <Route
              path="/team"
              element={
                <motion.div {...pageTransition}>
                  <Team />
                </motion.div>
              }
            />
            <Route
              path="/contact"
              element={
                <motion.div {...pageTransition}>
                  <Contact />
                </motion.div>
              }
            />
            <Route
              path="*"
              element={
                <motion.div {...pageTransition}>
                  <div className="text-center text-red-400 font-semibold text-lg py-10">
                    404 - Page Not Found
                  </div>
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
