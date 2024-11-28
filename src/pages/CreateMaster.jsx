import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar, Alert } from "@mui/material";

import ManageGuardHolding from "./ManageGuardHolding";
import HoldTabs from "./HoldTabs";
import axiosInstance from "../utils/axiosInstance";

function CreateMaster() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showBackofficePassword, setShowBackofficePassword] =
    React.useState(false);
  const [percentages, setPercentages] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    prefix: "",
    website: "https://",
    backofficePassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [prefixError, setPrefixError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowBackofficePassword = () =>
    setShowBackofficePassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownBackofficePassword = (event) => {
    event.preventDefault();
  };

  const GeneratePassword = () => {
    const randomPassword = Math.random().toString(36).slice(2, 10);
    setFormData({
      ...formData,
      password: randomPassword,
    });
  };

  const GenerateBackofficePassword = () => {
    const randomPassword = Math.random().toString(36).slice(2, 10);
    setFormData({
      ...formData,
      backofficePassword: randomPassword,
    });
  };

  const handlePercentagesChange = (newPercentages) => {
    setPercentages(newPercentages);
  };

  const handleInputChange = (e) => {
    if (e.target.id === "website") {
      let value = e.target.value;
      if (!value.startsWith("http://") && !value.startsWith("https://")) {
        value = "https://" + value.replace(/^https?:\/\//, "");
      }
      setFormData({
        ...formData,
        website: value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");

      if (!percentages || percentages.length === 0) {
        alert("กรุณาตั้งค่าค่ายเกม อย่างน้อย 1 รายการ");
        return;
      }

      setIsLoading(true);

      const response = await axiosInstance.post(
        "/master",
        {
          username: formData.username,
          password: formData.password,
          prefix: formData.prefix,
          website: formData.website,
          percentages: percentages,
          backofficePassword: formData.backofficePassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setIsSuccess(true);
        setFormData({
          username: "",
          password: "",
          prefix: "",
          website: "",
          backofficePassword: "",
        });
        setPercentages(null);

        setSnackbarMessage("สร้างเอเจนต์สำเร็จ");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        setTimeout(() => {
          setIsSuccess(false);
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error creating agent:", error);
      if (error.response?.status === 400) {
        if (error.response?.data?.message === "Agent prefix already exist") {
          alert("Prefix name ซ้ำ กรุณาใช้ชื่ออื่น");
        }
        if (error.response?.data?.message === "Agent username already exist") {
          alert("Username ซ้ำ กรุณาใช้ชื่ออื่น");
        }
      }
      setIsLoading(false);

      setSnackbarMessage("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          สร้าง Master
        </Typography>
        <Box sx={{ boxShadow: 1, p: 2, bgcolor: "white" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                id="username"
                label="username"
                variant="outlined"
                value={formData.username}
                onChange={handleInputChange}
                inputProps={{ maxLength: 100 }}
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                variant="contained"
                color="success"
                onClick={GeneratePassword}
                sx={{ minWidth: "120px", height: "56px" }}
              >
                GENERATE
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                id="displayname"
                label="Display Name"
                variant="outlined"
                inputProps={{ maxLength: 300 }}
              />
              <TextField
                fullWidth
                id="prefix"
                label="Prefix Name"
                variant="outlined"
                value={formData.prefix}
                onChange={handleInputChange}
                helperText="Maximum 2 letters"
                inputProps={{ maxLength: 2 }}
              />
            </Box>
            <TextField
              fullWidth
              id="website"
              label="Website Name"
              variant="outlined"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, height: 48 }}
              onClick={handleSubmit}
              disabled={
                isLoading ||
                isSuccess ||
                !percentages ||
                percentages.length === 0
              }
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isSuccess ? (
                "สร้างเอเย่นต์สำเร็จ"
              ) : (
                "Create Agent"
              )}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <HoldTabs onPercentagesChange={handlePercentagesChange} />
        {/* <ManageGuardHolding /> */}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreateMaster;
