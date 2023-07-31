import React from "react";
import FlexBox from "../../components/FlexBox.jsx";
import { Form } from "./form.jsx";
import { Login } from "./login.jsx";
import { Register } from "./register.jsx";
const Auth = ({ setUserId, setUser }) => {
  return (
    <FlexBox>
      <Login setUserId={setUserId} setUser={setUser} />
      <Register />
    </FlexBox>
  );
};

export default Auth;
