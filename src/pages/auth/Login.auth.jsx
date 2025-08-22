// src/pages/auth/Login.auth.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api.js"; // Explicit .js extension
import { toast } from "react-toastify";

// Import the UI component
import LoginPage from "../../components/ui/LoginPage.jsx"; // Explicit .jsx extension

export default function LoginAuth({ toggleView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/agencies/client-login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Hostname: "starkindustries.sugamta.in",
          },
        }
      );

      const data = response.data.data;
      const token = data.token;
      localStorage.setItem("token", token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role_id = payload.roleid;
      const client_name = response.data.data.agency_name;

      console.log("Login success, Role ID:", role_id);
      toast.success("Login Successful!");

      if (role_id === "AO") {
        nav("/agency-dashboard", {
          state: { roleId: role_id, clientName: client_name },
        });
      } else if (role_id === "AC") {
        nav("/agency-client", {
          state: { roleId: role_id, clientName: client_name },
        });
      } else {
        nav("/dashboard", { state: { roleId: role_id, clientName: client_name } });
      }
    } catch (err) {
      console.error(
        "Error logging in:",
        err.response ? err.response.data : err.message
      );

      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else if (err.response && err.response.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <LoginPage
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      toggleView={toggleView}
    />
  );
}
