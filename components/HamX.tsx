import React from "react";
import { assets } from "@/public/assets/assets";
import Image from "next/image";

interface HamXProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function HamX(params: HamXProps) {
  const { isOpen, setIsOpen } = params;
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {!isOpen && (
        <button onClick={toggleMenu} className="flex justify-center w-6 h-6 cursor-pointer">
          <Image src={assets.hamIcon} alt="Ham icon" />
        </button>
      )}
      {isOpen && (
        <button onClick={toggleMenu} className=" text-gray-500 text-md cursor-pointer">
          X
        </button>
      )}
    </div>
  );
}

export default HamX;
