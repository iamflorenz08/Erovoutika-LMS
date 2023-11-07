import React from "react";

interface CourseContainerProps {
  imageUrl: string;
  text: string;
  buttonText: string;
}

const CourseContainer = ({ imageUrl, text, buttonText }: CourseContainerProps) => {
  return (
    <div className="flex w-full md:w-444 h-[168px] bg-white rounded-lg shadow-md">
      <img src={imageUrl} alt="Image" className="w-[168px] sm:w-[200px] h-[168px] rounded-l-lg" />
      <div className="flex flex-col justify-between w-3/4 p-4">
        <div>
          <p className="text-lg font-semibold">{text}</p>
        </div>
        <div className="flex justify-end">
          <button className="text-white py-2 px-4 rounded-lg bg-primary">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default CourseContainer;
