import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home"; // example icon
import { Divider } from "@mui/material";
import THAI from "../assets/thailand.png";
import UK from "../assets/united-kingdom.png";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

export default function MenuAppBar() {
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [language, setLanguage] = React.useState("THAI");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInvalidToken = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    axiosInstance
      .get("/user/@me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setBalance(response.data.credit);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        if (
          error.response?.status === 403 ||
          error.response?.data?.message === "Invalid token or expried." ||
          error.response?.data?.message === "User not exist"
        ) {
          handleInvalidToken();
        }
      });
  }, []);

  const handleMenu1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = (selectedLanguage) => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
    setAnchorEl1(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const flagIcon = language === "THAI" ? THAI : UK;
  // const username = language === 'THAI' ? 'ผู้ใช้งาน' : 'Username';
  const logoutText = language === "THAI" ? "ออกจากระบบ" : "Logout";
  const currency = language === "THAI" ? "บาท" : "THB";

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName);
  }, []);

  const handleAccountClick = () => {
    setOpenDialog(true);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("รหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const authToken = localStorage.getItem("authToken");
      await axiosInstance.post(
        "/user/password",
        {
          old_password: oldPassword,
          password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setSuccess(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // ปิด dialog หลังจาก 2 วินาที
      setTimeout(() => {
        setOpenDialog(false);
        setSuccess(false);
        setLoading(false);
      }, 2000);
    } catch (error) {
      if (
        error.response?.status === 403 ||
        error.response?.data?.message === "Invalid token or expried." ||
        error.response?.data?.message === "User not exist"
      ) {
        handleInvalidToken();
        return;
      }
      setError(error.response?.data?.message || "รหัสผ่านเก่าไม่ถูกต้อง");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          {/* icon button here */}
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              AGENT
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: 28, alignSelf: "center", mx: 1, bgcolor: "white" }}
            />
            <AccountBalanceWalletIcon
              sx={{ color: "white", width: 20, mr: 1 }}
            />
            {Math.floor(balance).toLocaleString()} {currency}
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 28, alignSelf: "center", mx: 1, bgcolor: "white" }}
          />
          <IconButton
            size="large"
            aria-label="account of current user"
            onClick={handleAccountClick}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Typography
            variant="body2"
            color="inherit"
            sx={{ ml: 1, marginRight: 2 }}
          >
            {userName}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            {logoutText}
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          My Account
          <IconButton
            onClick={() => setOpenDialog(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {!success ? (
            <>
              <Typography variant="h6" sx={{ mb: 3 }}>
                เปลี่ยนรหัสผ่าน
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
              >
                <TextField
                  fullWidth
                  label="รหัสผ่านเก่า"
                  type="password"
                  variant="outlined"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="รหัสผ่านใหม่"
                  type="password"
                  variant="outlined"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="ยืนยันรหัสผ่านใหม่"
                  type="password"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleChangePassword}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "ยืนยัน"
                  )}
                </Button>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 3,
              }}
            >
              <CircularProgress sx={{ mb: 2 }} />
              <Typography>เปลี่ยนรหัสผ่านสำเร็จ</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
