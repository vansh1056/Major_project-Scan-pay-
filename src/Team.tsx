import React from "react";

const teamMembers = [
  {
    name: "VANSH SINGH",
    role: "Frontend Developer",
    image: "/images/vansh.jpg", // Replace with actual image path
  },
  {
    name: "Member 2",
    role: "Backend Developer",
    image: "/images/member2.jpg",
  },
  {
    name: "Member 3",
    role: "Database Manager",
    image: "/images/member3.jpg",
  },
  {
    name: "Member 4",
    role: "UI/UX Designer",
    image: "/images/member4.jpg",
  },
];

function Team() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Our Project Team</h1>

      <div className="flex justify-center space-x-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center border border-gray-700 w-64">
            <img
              src={member.image}
              alt={member.name}
              className="w-40 h-40 rounded-full border-4 border-gray-600 shadow-md"
            />
            <h2 className="mt-4 text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
