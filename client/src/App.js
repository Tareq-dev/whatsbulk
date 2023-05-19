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
// import Loading from "./components/Loading";
function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [coinBalance, setCoinBalance] = useState(0);

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
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/api/user?email=${email}`).then((res) =>
        res.json().then((data) => {
          if (email === data?.email) {
            setCoinBalance(Number(data?.message));
          }
        })
      );
    }
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
    // console.log('this is test');
    // console.log(localStorage.getItem("user"));
  }, [currentUser]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
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
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
