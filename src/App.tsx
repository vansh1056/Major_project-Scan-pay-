import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Home from "./Home";
import Feedback from "./Feedback";
import Team from "./Team";
import Contact from "./Contact";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
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
            <Link to="/" className="hover:text-white" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/feedback" className="hover:text-white" onClick={() => setIsOpen(false)}>Feedback</Link>
            <Link to="/team" className="hover:text-white" onClick={() => setIsOpen(false)}>Project Team</Link>
            <Link to="/contact" className="hover:text-white" onClick={() => setIsOpen(false)}>Contact Us</Link>
          </nav>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-center space-x-6 mb-8">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/feedback" className="text-gray-300 hover:text-white">Feedback</Link>
          <Link to="/team" className="text-gray-300 hover:text-white">Project Team</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
        </nav>

        {/* Page Content */}
        <div className="max-w-4xl mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
