import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgLogOff } from "react-icons/cg";
// import { toast } from "react-toastify";

function MessageCountNav({ coinBalance, setCurrentUser }) {
  const navigate = useNavigate();

  const logout = async () => {
    const res = await fetch(`http://localhost:5000/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // if (res.status) {
    //   toast.success(`${res.message}`, {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   navigate("/");
    // }
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="py-4 bg-green-600 flex justify-between items-center pl-28 pr-10">
      <Link to="/" className="text-2xl font-bold text-white ">
        Whats
        <span className="text-yellow-300 bg-black px-2 rounded-md">Bulk</span>
      </Link>
      <div>
        <div className="flex  items-center">
          <div className="text-black text-lg bg-[#E0E8FF] px-2 py-1 rounded-md">
            <p>Massage Balance: 💰 {coinBalance}</p>
          </div>
          <button
            onClick={logout}
            className="bg-[#E0E8FF] font-bold flex ml-8 py-1 px-2 rounded-md"
          >
            <CgLogOff size={24} className="mr-2" /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageCountNav;
