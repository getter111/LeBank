import React from "react";
import { Login } from "./login.jsx";
import { Register } from "./register.jsx";

const Auth = ({ setUserId }) => {
  return (
    <div className="auth">
      <Login setUserId={setUserId} />
      <Register />
    </div>
  );
};

export default Auth;
