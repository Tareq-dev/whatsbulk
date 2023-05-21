import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgLogOff } from "react-icons/cg";
// import { toast } from "react-toastify";
import Ably from "ably";

function MessageCountNav({ coinBalance, setCurrentUser }) {
  const [msg, setMsg] = useState(coinBalance);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const logout = async () => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/logout`, {
      method: "POST",
      credentials: "include",
      headers: headers,
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
  useEffect(() => {
    const ably = new Ably.Realtime({
      key: "VSU5GA.7M4Y5Q:4Tok9TlkaNq5T8u5dKnJ42pu3oZrH0GYqKpkNPVqsHE",
    });
    const msgCountEvent = ably.channels.get("messageCount");
    /////message count event
    msgCountEvent.subscribe((message) => {
      setMsg(message?.data?.updatedBalance);
    });
  }, []);
  return (
    <div className="py-4 bg-green-600  md:pl-28 md:pr-10 px-2">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white bg-black rounded-md px-2"
        >
          Whats
          <span className="text-yellow-300">
            Bulk
          </span>
        </Link>
        <button
          onClick={logout}
          className="bg-[#E0E8FF] font-bold flex md:ml-8 py-1 text-sm md:text-md  px-2 rounded-md  justify-center items-center"
        >
          <CgLogOff size={24} className="mr-2" /> Log Out
        </button>
      </div>

      <div className="flex  justify-center mt-3">
        <div className="text-black text-sm md:text-lg bg-yellow-300 px-2  rounded-md">
          <p>Massage : 💰 {msg}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageCountNav;
