import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { setAuthToken } from "../utils/axiosInstance";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const existingToken = localStorage.getItem("authToken");
    if (existingToken) {
      setAuthToken(existingToken);
      navigate("/app/dashboard", { replace: true });
      return;
    }

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      handleTokenLogin(token);
    } else {
      window.location.href =
        "https://youtu.be/6dMjCa0nqK0?si=as6tYmJNARXn3sLp&t=3";
    }
  }, [navigate]);

  const handleTokenLogin = async (verify_token) => {
    try {
      const result = await axiosInstance.post("/auth/login/token", {
        verify_token,
      });

      if (result.status === 200) {
        const token = result.data.token;
        localStorage.setItem("authToken", token);
        setAuthToken(token);
        navigate("/app/dashboard", { replace: true });
      } else {
        window.location.href =
          "https://youtu.be/6dMjCa0nqK0?si=as6tYmJNARXn3sLp&t=3";
      }
    } catch (error) {
      window.location.href =
        "https://youtu.be/6dMjCa0nqK0?si=as6tYmJNARXn3sLp&t=3";
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #f6f8ff 0%, #f5f5f5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}

export default LoginPage;
