import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/main">Main</Link>
              </li>
              <li>
                <a>Login</a>
              </li>
              <li>
                <a>Register</a>
              </li>
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold text-white px-48">
            Whats
            <span className="text-yellow-300 bg-black px-2 rounded-md">
              Bulk
            </span>
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex mr-14">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/main">Main</Link>
            </li>
            <li>
              <a>Login</a>
            </li>
            <li>
              <a>Register</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
