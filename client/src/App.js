import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<Register />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
