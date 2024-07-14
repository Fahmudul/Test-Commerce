import React from "react";
import { BiImageAdd } from "react-icons/bi";
const DragDropBox = () => {
  return (
    <div
      className=" w-[100%]  flex flex-col text-[#967dcb] justify-center items-center 
    "
    >
      <BiImageAdd className="text-5xl  "  />
      <p className="text-black">
        <span className="text-[#967dcb] ">Click to upload</span> <br /> or drag
        and drop
      </p>
    </div>
  );
};

export default DragDropBox;
