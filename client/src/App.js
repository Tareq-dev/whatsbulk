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
function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [coinBalance, setCoinBalance] = useState(0);
  const [admin, setAdmin] = useState([]);
  const email = currentUser?.email;

  const Protected = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const checkAuth = () => {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  };
  const checkAdmin = () => {
    if (admin?.role) {
      return true;
    } else {
      return false;
    }
  };
  const ProtectedAdmin = ({ isAdmin, children }) => {
    if (!isAdmin) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const baseUrl = process.env.REACT_APP_BASE_URL2;
  useEffect(() => {
    if (email) {
      fetch(`${baseUrl}/api/user?email=${email}`).then((res) =>
        res.json().then((data) => {
          setAdmin(data);
          if (email === data?.email) {
            setCoinBalance(Number(data?.message));
          }
        })
      );
    }
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home admin={admin} currentUser={currentUser} />}
        />
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} admin={admin} />}
        />
        <Route
          path="/sign_up"
          element={<Register setCurrentUser={setCurrentUser} />}
        />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<NewPassword />} />
        <Route
          path="/main"
          element={
            <Protected isLoggedIn={checkAuth()}>
              <Main
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                coinBalance={coinBalance}
                setCoinBalance={setCoinBalance}
              />
            </Protected>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedAdmin isAdmin={checkAdmin()}>
              <Dashboard
                admin={admin}
                setAdmin={setAdmin}
                currentUser={currentUser}
              />
            </ProtectedAdmin>
          }
        >
          <Route index element={<AdminDashboard />}></Route>
          <Route path="all-user" element={<AllUser />}></Route>
          <Route path="admin" element={<AllAdmins />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
