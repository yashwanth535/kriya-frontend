import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-12 h-12 animate-spin-custom">
        <div className="absolute w-5 h-5 bg-white rounded-full top-0 left-0"></div>
        <div className="absolute w-5 h-5 bg-white rounded-full top-0 right-0"></div>
        <div className="absolute w-5 h-5 bg-white rounded-full bottom-0 left-0"></div>
        <div className="absolute w-5 h-5 bg-white rounded-full bottom-0 right-0"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 