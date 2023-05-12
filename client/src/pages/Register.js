import React from "react";
import { Link } from "react-router-dom";
import login from "../images/login.jpg";
import whatsapp from "../images/whatsapp-logo.png";

function Register() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className={"flex flex-col md:flex-row bg-green-500 w-3/5"}>
        <div className={"md:w-1/2 flex justify-center items-center px-12"}>
          <div className={"w-full max-w-sm"}>
            <div className="flex justify-center items-center">
              <img className="h-32" src={whatsapp} alt="" />
            </div>
            <h2 className={"text-3xl md:text-4xl font-bold text-white mb-4"}>
              Sign Up
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

              <label htmlFor="password" className={"text-white text-xl mb-2"}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={"outline-none rounded-md text-white py-2 px-3 mb-4"}
                placeholder="Enter your password"
                required
              />

              <button
                type="submit"
                className={
                  "bg-black text-white font-semibold rounded-lg py-2 px-3 hover:bg-gray-100 hover:text-green-700 transition-all duration-200"
                }
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className={"md:w-1/2 bg-white flex justify-center items-center"}>
          <div className={"w-full max-w-sm p-8"}>
            <img src={login} alt="" />

            <h2 className={"text-2xl font-bold text-gray-800 mb-4"}>
              Already have an account?
            </h2>

            <div className="flex justify-center">
              <Link
                to="/login"
                className={
                  "bg-green-500 text-white rounded-lg py-2 px-3 hover:bg-green-700 transition-all duration-200"
                }
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
