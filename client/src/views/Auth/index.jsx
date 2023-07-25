import React from "react";
import { Login } from "./login.jsx";
import { Register } from "./register.jsx";

const Auth = ({ setUserId, setUser }) => {
  return (
    <div className="auth">
      <Login setUserId={setUserId} setUser={setUser} />
      <Register />
    </div>
  );
};

export default Auth;
