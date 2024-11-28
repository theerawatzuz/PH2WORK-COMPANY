import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import axiosInstance from "../utils/axiosInstance";

import DashboardReport from "../pages/DashboardReport";

//Tab
import TabSlot from "./DashboardTabPages/TabSlot";

//icon
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import KeyIcon from "@mui/icons-material/Key";

//State
const user = "ผู้ใช้งาน";
const userStatus = "Enabled";

//amount
const currentAmount = "0.00";

const Dashboard = () => {
  const [value, setValue] = React.useState("1");
  const [nestedValue, setNestedValue] = React.useState("1.1");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  const [monthDeposit, setMonthDeposit] = useState(0);
  const [monthWithdraw, setMonthWithdraw] = useState(0);
  const [monthProfit, setMonthProfit] = useState(0);

  const [todayDeposit, setTodayDeposit] = useState(0);
  const [todayWithdraw, setTodayWithdraw] = useState(0);
  const [todayProfit, setTodayProfit] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNestedChange = (event, newValue) => {
    setNestedValue(newValue);
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
        setUsername(response.data.username);
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    axiosInstance
      .get("/dashboard/getDWTotal", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setTotalDeposit(response.data.deposit);
        setTotalWithdraw(response.data.profit);
        setTotalProfit(response.data.withdraw);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    axiosInstance
      .get("/dashboard/getDWMonth", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setMonthDeposit(response.data.deposit);
        setMonthWithdraw(response.data.profit);
        setMonthProfit(response.data.withdraw);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    axiosInstance
      .get("/dashboard/getDWToday", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setTodayDeposit(response.data.deposit);
        setTodayWithdraw(response.data.profit);
        setTodayProfit(response.data.withdraw);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <Box sx={{ gap: 3, bgcolor: "background.paper" }}>
      <Typography variant="h4">ภาพรวม</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* HEAD */}
        <Box sx={{ boxShadow: 1, mt: 2, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccountCircle />
            {username}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: 28, alignSelf: "center", mx: 1, bgcolor: "white" }}
            />

            {/* <Button
              size="small"
              variant="contained"
              startIcon={<PasswordIcon />}
              sx={{ mx: 1 }}
            >
              เปลี่ยนรหัส
            </Button> */}
            {/* <Button size="small" variant="contained" color="success" startIcon={<KeyIcon />} sx={{mx:1}}>เปลี่ยนพาสโค้ด</Button> */}
            {/* <Typography variant="body1">สถานะ :</Typography>
            <Typography variant="body1" color="green">
              <b>{status}</b>
            </Typography> */}
            {/* <Typography variant="body1" color="red">
                <b>{userStatus}</b>
              </Typography> */}
          </Box>

          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "#bbdefb",
              borderRadius: "12px",
              display: "flex",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: 6 / 12 }}>
              <Typography variant="body1">
                <b>THB</b>
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: 3 / 4,
                  width: 2,
                  alignSelf: "center",
                  mx: 1,
                  mr: 2,
                  bgcolor: "black",
                }}
              />
              <Box sx={{ width: 1 / 3 }}>
                <Typography variant="body1">
                  <b>ยอดเงิน</b>
                </Typography>
                <Typography variant="body1">
                  <b>{currentAmount}</b>
                </Typography>
              </Box>
              <Box sx={{ width: 1 / 3 }}>
                <Typography variant="body1">
                  <b>ยอดเงินของคนข้างล่าง</b>
                </Typography>
                <Typography variant="body1">
                  <b>{currentAmount}</b>
                </Typography>
              </Box>
              <Box sx={{ width: 1 / 3 }}>
                <Typography variant="body1">
                  <b>แทง</b>
                </Typography>
                <Typography variant="body1">
                  <b>{currentAmount}</b>
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", width: 6 / 12 }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: 3 / 4,
                  width: 2,
                  alignSelf: "center",
                  mx: 1,
                  mr: 2,
                  bgcolor: "black",
                }}
              />
              <Box sx={{ width: 1 / 3 }}>
                <Typography variant="body1">
                  <b>ยอดรวมทั้งหมด</b>
                </Typography>
                <Box>
                  <Typography variant="body1">
                    <b>ฝาก : {totalDeposit.toLocaleString()}</b>
                  </Typography>
                  <Typography variant="body1">
                    <b>ถอน : {totalWithdraw.toLocaleString()}</b>
                  </Typography>
                  <Typography variant="body1">
                    <b>กำไร : {totalProfit.toLocaleString()}</b>
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: 1 / 3 }}>
                <Typography variant="body1">
                  <b>ยอดรายเดือน</b>
                </Typography>
                <Box>
                  <Typography variant="body1">
                    <b>ฝาก : {monthDeposit.toLocaleString()}</b>
                  </Typography>
                  <Typography variant="body1">
                    <b>ถอน : {monthWithdraw.toLocaleString()}</b>
                  </Typography>
                  <Typography variant="body1">
                    <b>กำไร : {monthProfit.toLocaleString()}</b>
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: 1 / 3 }}>
                <Typography variant="body1">
                  <b>ยอดวันนี้</b>
                </Typography>
                <Box>
                  <Typography variant="body1">
                    <b>ฝาก : {todayDeposit.toLocaleString()}</b>
                  </Typography>
                  <Typography variant="body1">
                    <b>ถอน : {todayWithdraw.toLocaleString()}</b>
                  </Typography>
                  <Typography variant="body1">
                    <b>กำไร : {todayProfit.toLocaleString()}</b>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* BODY */}
        {/* <Box sx={{ width: "100%", boxShadow: 1, mt: -1, p: 2 }}>
          <DashboardReport />
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
