import React, { useState } from "react";
import { motion } from "framer-motion";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("5");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (feedback.trim() === "") {
      setErrorMessage("Feedback cannot be empty.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setRating("5");
      setFeedback("");
    }, 1500); // Simulate async submission
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full bg-gray-900 text-gray-100 p-8 flex flex-col items-center"
    >
      <h1 className="text-3xl font-bold mb-6">Feedback</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label className="block mb-1 text-gray-300" htmlFor="name">Name (optional)</label>
          <input
            id="name"
            type="text"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "submitting"}
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-300" htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting"}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-300" htmlFor="rating">Rating *</label>
          <select
            id="rating"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            disabled={status === "submitting"}
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Terrible</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-300" htmlFor="feedback">Feedback *</label>
          <textarea
            id="feedback"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200"
            placeholder="Enter your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={status === "submitting"}
            required
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-transform transform ${
            status === "submitting"
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
          }`}
        >
          {status === "submitting" ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>

      {status === "success" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-green-400 font-semibold"
        >
          Thank you for your feedback!
        </motion.p>
      )}

      {status === "error" && errorMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-red-500 font-semibold"
        >
          {errorMessage}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Feedback;
