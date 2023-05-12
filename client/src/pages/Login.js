import React from "react";
import registration from "../images/registration.jpg";
import whatsapp from "../images/whatsapp-logo.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className={"flex flex-col md:flex-row bg-green-500 w-3/5"}>
        <div className={"md:w-1/2 flex justify-center items-center px-12"}>
          <div className={"w-full max-w-sm"}>
            <div className="flex justify-center items-center">
              <img className="h-32" src={whatsapp} alt="" />
            </div>
            <h2 className={"text-3xl md:text-4xl font-bold text-white mb-2"}>
              Welcome Back
            </h2>
            <form className={"flex flex-col"} action="/">
              <label htmlFor="email" className={"text-white text-xl"}>
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

              <label htmlFor="password" className={"text-white text-xl"}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={"outline-none rounded-md text-white py-2 px-3 mb-2"}
                placeholder="Enter your password"
                required
              />
              <Link to="/forgot_password" className="font-bold text-md text-white mb-2">
                Forgot Password ?
              </Link>
              <button
                type="submit"
                className={
                  "bg-black text-white font-semibold rounded-lg py-2 px-3 hover:bg-gray-100 hover:text-green-700 transition-all duration-200"
                }
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className={"md:w-1/2 bg-white flex justify-center items-center"}>
          <div className={"w-full max-w-sm p-8"}>
            <img src={registration} alt="" />

            <h2 className={"text-2xl md:text-3xl font-bold text-gray-800 mb-4"}>
              Don't have an account?
            </h2>

            <div className="flex justify-center">
              <Link
                to="/sign_up"
                className={
                  "bg-green-500 text-white rounded-lg py-2 px-3 hover:bg-green-700 transition-all duration-200"
                }
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
