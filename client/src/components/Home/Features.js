import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";

function Features() {
  return (
    <div className="py-8">
      <h2 className="text-4xl text-center text-[#16A34A] pb-12  font-bold">
        Amazing features to grow your business
      </h2>
      <div className="flex justify-center items-center md:py-8">
        <h2 className=" text-center text-white flex items-center px-12 py-4 rounded-xl bg-[#44CB65] font-semibold">
          <BsCheckCircleFill className="text-[#004029] mr-4" size={24} /> Use
          Your Own Number
        </h2>
      </div>
      <div className="md:flex justify-center items-center py-4">
        <div className="flex justify-center">
          <h2 className=" text-center text-white flex mb-4 md:mr-10 items-center px-12 py-4 rounded-xl bg-[#44CB65] font-semibold">
            <BsCheckCircleFill className="text-[#004029] mr-4" size={24} />{" "}
            Unlimited Contacts
          </h2>
        </div>
        <div className="flex justify-center">
          <h2 className=" text-center text-white flex items-center px-12 py-4 rounded-xl bg-[#44CB65] font-semibold">
            <BsCheckCircleFill className="text-[#004029] mr-4" size={24} />{" "}
            Whitelabel Option
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Features;
