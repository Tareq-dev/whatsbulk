import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
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
import { AuthProvider } from "./components/context/auth";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin";
function App() {
  const [admin, setAdmin] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL2;
  console.log(baseUrl);
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
