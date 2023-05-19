import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgLogOff } from "react-icons/cg";
// import { toast } from "react-toastify";

function MessageCountNav({ coinBalance, setCurrentUser }) {
  const navigate = useNavigate();

  const logout = async () => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:3000");

    const res = await fetch(
      `https://whatsapp-server-production-f5c7.up.railway.app/api/logout`,
      {
        method: "POST",
        credentials: "include",
        headers: headers,
      }
    );
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
    <div className="py-3 bg-green-600  md:pl-28 md:pr-10 px-1">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white ">
          Whats
          <span className="text-yellow-300 bg-black px-2 rounded-md">Bulk</span>
        </Link>
        <button
          onClick={logout}
          className="bg-[#E0E8FF] font-bold flex md:ml-8 py-1 text-sm md:text-md  px-2 rounded-md flex justify-center items-center"
        >
          <CgLogOff size={24} className="mr-2" /> Log Out
        </button>
      </div>

      <div className="flex  justify-center mt-3">
        <div className="text-black text-sm md:text-lg bg-yellow-300 px-2  rounded-md">
          <p>Massage : 💰 {coinBalance}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageCountNav;
