import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-gray-300">For any queries, reach us at:</p>
        <ul className="mt-4 space-y-2">
          <li className="text-gray-200">📧 Email: example@kiet.edu</li>
          <li className="text-gray-200">📞 Phone: +91 9876543210</li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
