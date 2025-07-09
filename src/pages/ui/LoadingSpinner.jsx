import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="relative w-12 h-12 animate-spin">
        <div className="absolute w-5 h-5 bg-black dark:bg-gray-200 rounded-full top-0 left-0"></div>
        <div className="absolute w-5 h-5 bg-black dark:bg-gray-200 rounded-full top-0 right-0"></div>
        <div className="absolute w-5 h-5 bg-black dark:bg-gray-200 rounded-full bottom-0 left-0"></div>
        <div className="absolute w-5 h-5 bg-black dark:bg-gray-200 rounded-full bottom-0 right-0"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
