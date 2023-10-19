// @useClient
import React from "react";
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle'
import { FaTimes } from 'react-icons/fa';


interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const closeAndReset = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25">
      <div className="bg-white w-[512px] p-4 rounded-lg shadow-lg">
        
      <div className="grid grid-cols-3 gap-x-3 relative">
        <h2 className="text-[32px] font-bold mb-4 col-span-3 ">Create an account</h2>
        <button onClick={closeAndReset} className="text-black-500 mb-3 absolute top-0 right-0 mt-4 mr-4">
          <FaTimes style={{ fontSize: '24px' }} />
        </button>
      </div>

      
          <button
            className="mt-[24px] w-full rounded-lg text-[20px] py-[15px] font-semibold border text-semi-black border-gray flex justify-center items-center gap-3">
            <FcGoogle />
            Google
          </button>

          <div className="relative mt-[24px]">
            <div className="border border-gray mx-[80px]"></div>
            <label className="text-[16px] text-gray bg-white px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">OR CONTINUE WITH</label>
          </div>
  

          <div className="relative flex mt-[30px]">
            <input
              type="email"
              id="email"
              className="bg-white py-4 px-4 outline-none w-full rounded-tl-lg rounded-bl-lg border border-gray duration-200"
              placeholder=" "/>
                <button type="button" className="py-3 px-4 inline-flex flex-shrink-0 justify-center items-center
                 gap-2 rounded-r-md border border-transparent font-semibold bg-primary hover:bg-[#000067]
                  text-white focus:z-10 focus:outline-none focus:ring-2 transition-all text-sm">
                  Get Started
                </button>
            <label
              htmlFor="email"
              className="absolute left-0 px-2 transition duration-200 translate-x-3 -translate-y-[10px] 
              bg-white text-black">Email</label>
             
          </div>
       
      </div>
    </div>
  );
};

export default SignUpModal;
