import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Form } from "./form";

export const Login = ({ setUserId, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const base_url = import.meta.env.VITE_BASE_URL;

    try {
      //endpoint, body
      const response = await axios.post(base_url + "/user/auth/login", {
        username,
        password,
      }); //this response sends back a token and the userID :)

      if (
        (response.status == 200 && !cookies.access_token) ||
        cookies.access_token === ""
      ) {
        //set jwt token into cookies
        setCookies("access_token", response.data.token);
        //set userId in global state located -> App.jsx
        setUserId(response.data.userId);
        setUser(username);
        navigate("/");
        alert("Woohoo");
      } else {
        alert("Please log out first before logging in.");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
      alert("Username or Password Incorrect");
      setPassword("");
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      formType="Login"
      onSubmit={onSubmit}
    />
  );
};
