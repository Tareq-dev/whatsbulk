import React, { useState } from "react";
import forgot from "../images/forgot.jpg";
import whatsapp from "../images/whatsapp-logo.png";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [inputs, setInputs] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    server_error: "",
  });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let check = true;
    if (!isValidEmail(inputs.email)) {
      check = false;
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
    }

    if (check) {
      const email = inputs.email;
     
      const res = await fetch(`${baseUrl}/api/reset`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.status === 1) {
        toast.success(`${data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // inputs.email("");
      }
      if (data.status === 0) {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // inputs.email("");
      }
    }
  };
  const handleChange = (e) => {
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
      ["server_error"]: "",
    }));
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex justify-center items-center py-28">
      <div className={"flex flex-col md:flex-row bg-green-500 md:w-3/5 py-4"}>
        <div className={"md:w-1/2 flex justify-center items-center px-12"}>
          <div className={"w-full max-w-sm"}>
            <div className="flex justify-center items-center">
              <img className="h-32" src={whatsapp} alt="" />
            </div>
            <h2 className={"text-3xl md:text-4xl font-bold text-white mb-4"}>
              Reset Password
            </h2>
            <form
              onSubmit={handleSubmit}
              className={"flex flex-col"}
              action="/"
            >
              <label htmlFor="email" className={"text-white text-xl mb-2"}>
                Email
              </label>
              <input
                id="email"
                className={
                  errors.email
                    ? "border-2 border-red-500 outline-none rounded-md py-2 px-3  "
                    : "  outline-none rounded-md py-2 mb-3 px-3"
                }
                placeholder={"Enter your email"}
                name="email"
                onChange={handleChange}
              />
              {errors.email ? (
                <span className="text-red-700"> {errors.email}</span>
              ) : (
                ""
              )}

              <input
                type="submit"
                className={
                  "bg-black text-white font-semibold rounded-lg py-2 px-3 hover:bg-gray-100 hover:text-green-700 transition-all duration-200"
                }
                value="Reset"
              />
            </form>
          </div>
        </div>
        <div
          className={
            "md:w-1/2 bg-white hidden md:flex justify-center items-center"
          }
        >
          <div className={"w-full max-w-sm p-8"}>
            <img src={forgot} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
