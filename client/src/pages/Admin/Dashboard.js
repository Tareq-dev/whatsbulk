import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiUsers } from "react-icons/hi";
import { FaUserGraduate } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { useAuth } from "../../components/context/auth";

function Dashboard({ admin, setAdmin, currentUser }) {
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_BASE_URL2;
  const auth = useAuth();
  const user = auth.user;
  const role = user?.role;
  const logout = async () => {
    const res = await fetch(`${baseUrl}/api/logout`, {
      method: "POST",
      body: JSON.stringify({ role }), // Convert the role value to a JSON string
      headers: {
        "Content-Type": "application/json", // Use "application/json" as the content type
      },
    });
    const data = await res.json();
    if (data.status) {
      auth.logout();
      localStorage.removeItem("user");
      setAdmin([]);
    }
    navigate("/");
  };

  return (
    <div className="">
      <Navbar admin={admin} currentUser={currentUser} />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-56 h-72 md:h-96 bg-green-300 text-base-content border-r md:ml-8 md:my-4 rounded-r-3xl md:rounded-3xl">
            {/* <!-- Sidebar content here --> */}
            <li>
              <NavLink
                className="py-2 my-1 uppercase font-bold"
                to="/dashboard"
              >
                <LuLayoutDashboard />
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                className="py-2 my-1 uppercase font-bold"
                to="/dashboard/all-user"
              >
                <HiUsers />
                Users
              </NavLink>
            </li>

            <li>
              <NavLink
                className="py-2 my-1 uppercase font-bold"
                to="/dashboard/admin"
              >
                <FaUserGraduate />
                Admins
              </NavLink>
            </li>
            <button
              onClick={logout}
              className="flex py-2 rounded-md items-center px-3 mt-6 hover:bg-black hover:text-white"
            >
              <BiLogOutCircle size={24} />
              <span className="ml-3 font-bold">LOG OUT</span>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
