import React from "react";
import marketing from "../../images/marketing.png";
function Marketing() {
  return (
    <div className="md:flex w-full justify-center items-center md:p-14">
      <div className="md:w-1/2 flex justify-center">
        <img src={marketing} alt="marketing" />
      </div>
      <div className="md:w-1/2 mx-2">
        <h2 className="text-3xl text-[#16A34A] font-bold py-4">
          Complete Marketing Solution <br /> To Grow Using WhatsApp
        </h2>
        <div className="p-2">
          <div className="bg-green-100 rounded flex p-4 h-full items-center">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
              viewBox="0 0 24 24"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <span className="title-font font-medium">
              Send video, images, and text messages/per day
            </span>
          </div>
        </div>
        <div className="p-2">
          <div className="bg-green-100 rounded flex p-4 h-full items-center">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
              viewBox="0 0 24 24"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <span className="title-font font-medium">
              No blocking of numbers
            </span>
          </div>
        </div>
        <div className="p-2 ">
          <div className="bg-green-100 rounded flex p-4 h-full items-center">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
              viewBox="0 0 24 24"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <span className="title-font font-medium">
              Phone, chat, email support for setup
            </span>
          </div>
        </div>
        <div className="p-2  ">
          <div className="bg-green-100 rounded flex p-4 h-full items-center">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
              viewBox="0 0 24 24"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
              <path d="M22 4L12 14.01l-3-3"></path>
            </svg>
            <span className="title-font font-medium">
              Automation & Chatbots
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marketing;
