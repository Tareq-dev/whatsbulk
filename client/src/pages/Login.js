import React, { useState } from "react";
import registration from "../images/registration.jpg";
import whatsapp from "../images/whatsapp-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GlobalLoading from "./../components/GlobalLoading";
import { useAuth } from "../components/context/auth";
import { AiOutlineLeft } from "react-icons/ai";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const auth = useAuth();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";
  if (loading) {
    return <GlobalLoading />;
  }
  // const [loading, setLoading] = useState(false);
  const isValidEmail = (email) => {
    // Check if email is in a valid format
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // front end validation
    let check = true;
    if (!isValidEmail(inputs.email)) {
      check = false;
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
    }
    if (inputs.password.length < 5) {
      check = false;
      setErrors((prev) => ({
        ...prev,
        password: "At least 5 characters long",
      }));
    }

    if (check) {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/api/login`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(inputs),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.status === 1) {
          toast.success(`🚀${data.message}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(true);
          auth.login(data.data);
          navigate(redirectPath, { replace: true });
        }
        if (data.status === 0) {
          toast.error(`${data.message}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
        }
      } catch (error) {}
    }
  };

  const handleChange = (e) => {
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex justify-center items-center py-20 ">
      <div
        className={
          "flex flex-col md:flex-row bg-green-500 md:w-3/5 py-10 md:py-0 rounded"
        }
      >
        <div className={"md:w-1/2 flex justify-center items-center px-12"}>
          <div className={"w-full max-w-sm"}>
            <div className="flex justify-center items-center">
              <img className="h-32" src={whatsapp} alt="" />
            </div>
            <h2 className={"text-3xl md:text-4xl font-bold text-white mb-2"}>
              Welcome Back
            </h2>
            <form
              onSubmit={handleSubmit}
              className={"flex flex-col"}
              action="/"
            >
              <label htmlFor="email" className={"text-white text-xl"}>
                Email
              </label>
              <input
                id="email"
                className={
                  errors.email
                    ? "border-2 border-red-500 outline-none rounded-md py-2 px-3  "
                    : "  outline-none rounded-md py-2 px-3 mb-3"
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
              <label htmlFor="password" className={"text-white text-xl"}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={
                  errors.password
                    ? "border-2 border-red-500 outline-none rounded-md py-2 px-3 "
                    : "outline-none rounded-md  py-2 px-3"
                }
                placeholder={"Enter your password"}
                name="password"
                onChange={handleChange}
              />
              {errors.password ? (
                <span className="text-red-700">{errors.password}</span>
              ) : (
                ""
              )}
              <Link
                to="/forgot_password"
                className="font-bold text-md text-white py-1 mb-2"
              >
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
              <p className="md:hidden text-white py-2">
                Don't have an account?{" "}
                <span className="underline text-black cursor-pointer">
                  <Link to="/sign_up">Create One</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
        <div
          className={
            "md:w-1/2 bg-white hidden md:flex justify-center items-center"
          }
        >
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
            <div className="flex justify-center ">
              <Link to="/" className="flex mt-6 px-4 items-center">
                <AiOutlineLeft className="block" size={30} />
                <span className="block text-green-500 font-semibold">
                  Back To Home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
