import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Nav from "./Nav";
import LeftNav from "./LeftNav";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "../utils/useSnackbar";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Divider from "@mui/material/Divider";

const drawerWidth = 240;

const Main = styled("main")(({ theme, isExpanded }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: 0,
  marginLeft: isExpanded ? drawerWidth : 64,
  marginTop: 120,
  minHeight: "100vh",
  backgroundColor: "#fafbfb",
  position: "relative",
  width: "100%",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const NavWrapper = styled("div")(({ theme, isExpanded }) => ({
  position: "fixed",
  top: 0,
  left: isExpanded ? drawerWidth : 64,
  right: 0,
  zIndex: 1200,
  transition: theme.transitions.create("left", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const LeftNavWrapper = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  width: drawerWidth,
  zIndex: 1100,
});

function Layout() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await axiosInstance.get("/user/@me", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("รหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }
    const authToken = localStorage.getItem("authToken");

    try {
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

      showSnackbar("เปลี่ยนรหัสผ่านสำเร็จ", "success");
      setOpenPasswordDialog(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน",
        "error"
      );
    }
  };

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
    setAnchorEl(null);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  const handleTogglePassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleLogout = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      await axiosInstance.get("/user/logout", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    } catch (error) {
      showSnackbar("เกิดข้อผิดพลาดในการออกจากระบบ", "error");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavWrapper>
        <Nav />
      </NavWrapper>
      <LeftNavWrapper>
        <LeftNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </LeftNavWrapper>
      <Main isExpanded={isExpanded}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Company | <AccountBalanceWalletIcon />
              {userData?.credit?.toLocaleString("th-TH", {
                maximumFractionDigits: 0,
              }) || "0"}{" "}
              บาท
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Button
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleClick}
              sx={{ color: "white", textTransform: "none" }}
            >
              {userData?.display_name || ""} | <b>{userData?.username || ""}</b>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleOpenPasswordDialog}>
                เปลี่ยนรหัสผ่าน
              </MenuItem>
              <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 1, pt: 0 }}>
          <Outlet />
        </Box>
      </Main>
      <Dialog
        open={openPasswordDialog}
        onClose={handleClosePasswordDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>เปลี่ยนรหัสผ่าน</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="รหัสผ่านเดิม"
              type={showPasswords.old ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => handleTogglePassword("old")}
                    edge="end"
                  >
                    {showPasswords.old ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Divider sx={{ my: 1 }} />
            <TextField
              label="รหัสผ่านใหม่"
              type={showPasswords.new ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => handleTogglePassword("new")}
                    edge="end"
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              label="ยืนยันรหัสผ่านใหม่"
              type={showPasswords.confirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={Boolean(passwordError)}
              helperText={passwordError}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => handleTogglePassword("confirm")}
                    edge="end"
                  >
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog}>ยกเลิก</Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            disabled={!oldPassword || !newPassword || !confirmPassword}
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarComponent />
    </Box>
  );
}

export default Layout;
