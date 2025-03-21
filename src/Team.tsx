import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const teamMembers = [
  {
    name: "Vansh Singh",
    role: "Frontend Developer",
    image: "/images/member1.jpg",
    // bio:" ahfjsbnfkugjsdkfnsiukfjasifugyvashfnsdufyhsaWVkf",
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

function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipedLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const handleSwipedRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipedLeft,
    onSwipedRight: handleSwipedRight,
  });

  return (
    <div className="h-full bg-gray-900 text-gray-100 flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Project Team</h1>

      <div {...handlers} className="w-full max-w-md flex flex-col items-center">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center border border-gray-700 w-full">
          <img
            src={teamMembers[currentIndex].image}
            alt={teamMembers[currentIndex].name}
            className="w-50 h-50 rounded-full border-4 border-gray-600 shadow-md"
          />
          <h2 className="mt-4 text-xl font-semibold">{teamMembers[currentIndex].name}</h2>
          <p className="text-gray-400">{teamMembers[currentIndex].role}</p>
          {/* <h3 className="text-gray-300">{teamMembers[currentIndex].bio}</h3> */}
        </div>

        <div className="flex justify-between w-full mt-4">
          <button
            onClick={handleSwipedRight}
            className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          >
            Previous
          </button>
          <button
            onClick={handleSwipedLeft}
            className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          >
            Next
          </button>
        </div>

        <div className="flex mt-4 space-x-2">
          {teamMembers.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
