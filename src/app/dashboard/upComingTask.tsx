import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const UpComingTaskContainer= ({ children }: ContainerProps) => {
  return (
    <div
      className="w-[300px] h-[250px] bg-white rounded-lg shadow-md p-4 ml-6 mb-4">
      {children}
    </div>
  );
};

export default UpComingTaskContainer;
