import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth";
import { CgLogOff } from "react-icons/cg";

function Navbar() {
  const baseUrl = process.env.REACT_APP_BASE_URL2;
  const auth = useAuth();
  const user = auth?.user;
  const navigate = useNavigate();
  const logout = async () => {
    const res = await fetch(`${baseUrl}/api/logout`, {
      method: "POST",
    });

    auth.logout();
    navigate("/");
  };
  return (
    <div className="navbar bg-[#16A34A] border-b px-2 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu bg-[#16A34A] menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52"
          >
            <li>
              <Link to="/main">Main</Link>
            </li>
            {user ? (
              <div className="flex md:justify-end items-center">
                {user?.role === "" && (
                  <button
                    onClick={logout}
                    className="bg-[#E0E8FF] text-black font-bold flex text-sm md:text-md  px-2 rounded-md md:ml-16 justify-center items-center"
                  >
                    <CgLogOff size={24} className="mr-2" /> Log Out
                  </button>
                )}
              </div>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

            {!user && (
              <li>
                <Link to="/sign_up">Register</Link>
              </li>
            )}
            {user?.role === "admin" && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-white bg-black rounded-md px-2"
          >
            Whats
            <span className="text-yellow-300">Bulk</span>
          </Link>
        </div>
      </div>
      <div className="navbar-end hidden lg:flex mr-14">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/main">Main</Link>
          </li>
          {user ? (
            <div className="flex md:justify-end items-center">
              {user?.role === "" && (
                <button
                  onClick={logout}
                  className="bg-[#E0E8FF] text-black font-bold flex text-sm md:text-md  px-2 rounded-md ml-16 justify-center items-center"
                >
                  <CgLogOff size={24} className="mr-2" /> Log Out
                </button>
              )}
            </div>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}

          {!user && (
            <li>
              <Link to="/sign_up">Register</Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
