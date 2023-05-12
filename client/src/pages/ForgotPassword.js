import React from "react";
import forgot from "../images/forgot.jpg";
import whatsapp from "../images/whatsapp-logo.png";

function ForgotPassword() {
  return (
    <div className="flex justify-center items-center py-28">
      <div className={"flex flex-col md:flex-row bg-green-500 w-3/5"}>
        <div className={"md:w-1/2 flex justify-center items-center px-12"}>
          <div className={"w-full max-w-sm"}>
            <div className="flex justify-center items-center">
              <img className="h-32" src={whatsapp} alt="" />
            </div>
            <h2 className={"text-3xl md:text-4xl font-bold text-white mb-4"}>
              Reset Password
            </h2>
            <form className={"flex flex-col"} action="/">
              <label htmlFor="email" className={"text-white text-xl mb-2"}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={"outline-none rounded-md text-white py-2 px-3 mb-4"}
                placeholder="Enter your email"
                required
              />

              <button
                type="submit"
                className={
                  "bg-black text-white font-semibold rounded-lg py-2 px-3 hover:bg-gray-100 hover:text-green-700 transition-all duration-200"
                }
              >
                Reset
              </button>
            </form>
          </div>
        </div>
        <div className={"md:w-1/2 bg-white flex justify-center items-center"}>
          <div className={"w-full max-w-sm p-8"}>
            <img src={forgot} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
