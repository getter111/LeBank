import axios from "axios";
import React, { useState } from "react";
import { Form } from "./form";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      //endpoint, body
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/user/auth/register",
        {
          username,
          password,
        }
      );
      if (response.status == 201) {
        alert("Registration was Successfull! ");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
      alert("User already Exists Bozo");
      setUsername("");
      setPassword("");
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      formType="Register"
      onSubmit={onSubmit}
      displayReset={false}
    />
  );
};
