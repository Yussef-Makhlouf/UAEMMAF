"use client";

import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-r from-gray-900 to-black bg-opacity-75 backdrop-blur-sm z-50">
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg">
        <img src="/spinner.svg" alt="Loading..." className="w-20 h-20 animate-spin" />
      </div>
    </div>
  );
};

export default Loader; 