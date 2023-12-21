import React from "react";
import FlexBox from "../../components/FlexBox.jsx";
import { Form } from "./form.jsx";
import { Login } from "./login.jsx";
import { Register } from "./register.jsx";
const Auth = ({ setUserId, setUser, setCurrentPage }) => {
  setCurrentPage("Manage Account");
  return (
    <FlexBox
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        height: "calc(100vh - 4rem)",
        bgcolor: "#040404",
      }}
    >
      <Login setUserId={setUserId} setUser={setUser} />
      <Register />
    </FlexBox>
  );
};

export default Auth;
