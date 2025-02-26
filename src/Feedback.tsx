import React, { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Feedback submitted: " + feedback);
    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Feedback</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <textarea
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200"
          placeholder="Enter your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full mt-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
