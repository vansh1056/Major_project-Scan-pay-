import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

const teamMembers = [
  {
    name: "Vansh Singh",
    role: "Frontend Developer",
    image: "/images/member1.jpg",
  },
  {
    name: "Shiv Panwar",
    role: "Backend Developer",
    image: "/images/member2.jpeg",
  },
  {
    name: "Sharandeep Meharwal",
    role: "Database Manager",
    image: "/images/member3.jpeg",
  },
  {
    name: "Yaduvendra Choudhary",
    role: "Documentation Specialist",
    image: "/images/member4.jpeg",
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

function Team() {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setCurrentIndex(([prevIndex]) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = teamMembers.length - 1;
      else if (newIndex >= teamMembers.length) newIndex = 0;
      return [newIndex, newDirection];
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => paginate(1),
    onSwipedRight: () => paginate(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const member = teamMembers[currentIndex];

  return (
    <div className="h-full bg-gray-900 text-gray-100 flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Project Team</h1>

      <div
        {...handlers}
        className="w-full max-w-md flex flex-col items-center select-none"
        aria-live="polite"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center border border-gray-700 w-full"
          >
            <img
              src={member.image}
              alt={`${member.name} - ${member.role}`}
              className="w-48 h-48 rounded-full border-4 border-gray-600 shadow-md object-cover"
              loading="lazy"
            />
            <h2 className="mt-4 text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-400">{member.role}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between w-full mt-4">
          <button
            onClick={() => paginate(-1)}
            className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
            aria-label="Previous team member"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(1)}
            className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
            aria-label="Next team member"
          >
            Next
          </button>
        </div>

        <div className="flex mt-4 space-x-2">
          {teamMembers.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-500"}`}
              aria-label={index === currentIndex ? "Current team member" : `Team member ${index + 1}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
