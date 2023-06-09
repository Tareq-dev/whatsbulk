import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewPassword from "./pages/NewPassword";
import Dashboard from "./pages/Admin/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AllUser from "./pages/Admin/AllUser";
import AllAdmins from "./pages/Admin/AllAdmins";
import { AuthProvider, useAuth } from "./components/context/auth";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin";
import GlobalLoading from "./components/GlobalLoading";
function App() {
  // const user = JSON.parse(localStorage.getItem("user"));
  // const [loading, setLoading] = useState(true);
  // const [coinBalance, setCoinBalance] = useState(user?.message);
  const [admin, setAdmin] = useState([]);
  // const email = user?.email;
  // const baseUrl = process.env.REACT_APP_BASE_URL2;
  // useEffect(() => {
  //   if (email) {
  //     fetch(`${baseUrl}/api/user?email=${email}`).then((res) =>
  //       res.json().then((data) => {
  //         // setLoading(false);
  //         if (email === data?.email) {
  //           setCoinBalance(Number(data?.message));
  //         }
  //       })
  //     );
  //   }
  // }, [user, coinBalance]);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home admin={admin} />} />
        <Route path="/login" element={<Login admin={admin} />} />
        <Route path="/sign_up" element={<Register />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<NewPassword />} />
        <Route
          path="/main"
          element={
            <RequireAuth>
              <Main />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAdmin>
              <Dashboard admin={admin} setAdmin={setAdmin} />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />}></Route>
          <Route path="all-user" element={<AllUser />}></Route>
          <Route path="admin" element={<AllAdmins />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
