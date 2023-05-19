import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword && email) {
      const resetData = {
        email,
        newPassword,
        token,
      };
      const res = await fetch(`http://localhost:5000/api/reset-password`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ resetData }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.status === 1) {
        toast.success(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSuccess(true);
        setEmail("");
        setNewPassword("");
      }
    } else {
      setError("Email and Password Required");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E0E8FF]">
      <div className="bg-green-200 w-[300px] shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">Reset Password</h1>
        </div>
        <form onSubmit={handleUpdatePassword}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              name="newPassword"
              type="text"
              placeholder="New Password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
              minLength={6}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex items-center justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          </div>

          {success && (
            <div className="flex justify-center pt-4">
              <Link to="/login" className=" flex items-center ">
                <AiOutlineLeft className="mr-2 mt-1" size={20} /> Back to login
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
