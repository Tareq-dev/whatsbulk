import React, { useEffect, useState } from "react";

// import { toast } from "react-toastify";
import Ably from "ably";
import { useAuth } from "./context/auth";

function MessageCountNav() {
  const user = useAuth();

  const [msg, setMsg] = useState(user?.user?.message);

  const baseUrl = process.env.REACT_APP_BASE_URL2;

  useEffect(() => {
    fetch(`${baseUrl}/api/user/${user?.user.email}`)
      .then((res) => res.json())
      .then((data) => setMsg(data.message));
  }, [baseUrl,user?.user.email]);
  useEffect(() => {
    const ably = new Ably.Realtime({
      key: "VSU5GA.7M4Y5Q:4Tok9TlkaNq5T8u5dKnJ42pu3oZrH0GYqKpkNPVqsHE",
    });
    const msgCountEvent = ably.channels.get("messageCount");
    /////message count event
    msgCountEvent.subscribe((message) => {
      setMsg(message?.data?.updatedBalance);
    });
  }, [msg]);
  return (
    <div className="py-4 px-2">
      <div className="flex justify-center mt-3">
        <div className=" bg-yellow-300 rounded text-center px-10 py-4">
          <p className="text-black text-sm md:text-lg px-2 rounded-md">
            {user?.user?.email}
          </p>

          <p className="text-black text-sm md:text-lg px-2  rounded-md">
            Message : 💰 {msg}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageCountNav;
