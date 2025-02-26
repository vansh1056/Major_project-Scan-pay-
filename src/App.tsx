import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home"; // Your existing App.tsx code moved here
import Feedback from "./Feedback";
import Team from "./Team";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        {/* Navigation */}
        <nav className="flex justify-center space-x-6 mb-8">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/feedback" className="text-gray-300 hover:text-white">Feedback</Link>
          <Link to="/team" className="text-gray-300 hover:text-white">Project Team</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
