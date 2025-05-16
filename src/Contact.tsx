import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      className="h-full bg-gray-900 text-gray-100 p-8 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-gray-300">For any queries, reach us at:</p>
        <ul className="mt-4 space-y-2">
          <li>
            📧{" "}
            <a
              href="mailto:Scan.print@gmail.com"
              className="text-blue-400 hover:underline"
            >
              Scan.print@gmail.com
            </a>
          </li>
          <li>
            📞{" "}
            <a
              href="tel:+91936800XXXX"
              className="text-blue-400 hover:underline"
            >
              +91 936800XXXX
            </a>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Contact;
