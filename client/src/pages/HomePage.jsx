import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Welcome to Assignment Tracker
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Manage and track your assignments effortlessly.
      </p>
      <div className="flex space-x-4">
        <a
          href="/student-login"
          className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Student Login
        </a>
        <a
          href="/admin-login"
          className="px-6 py-3 bg-gray-700 text-white text-lg rounded-lg shadow-md hover:bg-gray-900 transition"
        >
          Admin Login
        </a>
      </div>
    </div>
  );
};

export default HomePage;
