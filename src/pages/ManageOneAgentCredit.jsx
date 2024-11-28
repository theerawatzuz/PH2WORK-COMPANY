import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import axiosInstance from "../utils/axiosInstance";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.black,
    fontWeight: "bold",
    border: `1px solid ${theme.palette.divider}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const parseNumberString = (str) => {
  if (str === null || str === undefined || str === "") return 0;
  return Number(String(str).replace(/,/g, ""));
};

const formatNumber = (num) => {
  return num.toLocaleString("en-US");
};

function ManageOneAgentCredit({ id, username, remainingCredit, onBack }) {
  const [agentData, setAgentData] = useState(null);
  const [addCredit, setAddCredit] = useState("");
  const [reduceCredit, setReduceCredit] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [creditHistory, setCreditHistory] = useState([]);

  useEffect(() => {
    // ตรวจสอบว่ามี id แทนการตรวจสอบ username
    if (id) {
      setAgentData({
        id: id,
        username: username || "Unknown", // กำหนดค่าเริ่มต้นถ้าไม่มี username
        remainingCredit:
          typeof remainingCredit === "string"
            ? parseNumberString(remainingCredit)
            : Number(remainingCredit || 0), // กำหนดค่าเริ่มต้นเป็น 0 ถ้าไม่มี remainingCredit
      });
    }

    // เพิ่ม function เรียก API สำหรับดึงประวัติเครดิต
    const fetchCreditHistory = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await axiosInstance.get(
          `/master/${id}/credit?page=0&size=100`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setCreditHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching credit history:", error);
      }
    };

    if (id) {
      fetchCreditHistory();
    }
  }, [id, username, remainingCredit]);

  const handleAddCreditChange = (event) => {
    setAddCredit(event.target.value);
  };

  const handleReduceCreditChange = (event) => {
    setReduceCredit(event.target.value);
  };

  const calculateTotalCredit = () => {
    if (!agentData) return 0;
    const add = parseNumberString(addCredit) || 0;
    const reduce = parseNumberString(reduceCredit) || 0;
    return agentData.remainingCredit + add - reduce;
  };

  const isReduceDisabled = () => {
    const reduceAmount = parseNumberString(reduceCredit);
    return reduceAmount <= 0 || reduceAmount > agentData?.remainingCredit;
  };

  const handleAddCredit = async () => {
    if (addCredit) {
      const authToken = localStorage.getItem("authToken");
      try {
        await axiosInstance.post(
          `/master/${id}/credit`,
          {
            type: "INCREASE",
            credit: parseNumberString(addCredit),
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const newRemainingCredit =
          agentData.remainingCredit + parseNumberString(addCredit);
        setAgentData({
          ...agentData,
          remainingCredit: newRemainingCredit,
        });
        setAddCredit("");
        setShowSuccess(true);
      } catch (error) {
        console.error("Error updating credit:", error);
      }
    }
  };

  const handleReduceCredit = async () => {
    if (reduceCredit) {
      const authToken = localStorage.getItem("authToken");
      try {
        await axiosInstance.post(
          `/master/${id}/credit`,
          {
            type: "DECREASE",
            credit: parseNumberString(reduceCredit),
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const newRemainingCredit = Math.max(
          0,
          agentData.remainingCredit - parseNumberString(reduceCredit)
        );
        setAgentData({
          ...agentData,
          remainingCredit: newRemainingCredit,
        });
        setReduceCredit("");
        setShowSuccess(true);
      } catch (error) {
        console.error("Error updating credit:", error);
      }
    }
  };

  if (!agentData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        gap: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          p: 2,
          boxShadow: 1,
          gap: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={onBack}>
              กลับ
            </Button>
            {showSuccess && (
              <Typography color="success.main">ปรับปรุงเครดิตสำเร็จ</Typography>
            )}
          </Box>
          <Typography variant="h4" sx={{ mt: 2 }}>
            เพิ่ม/ลด เครดิต
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
            <AccountCircle />
            {agentData.username}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: 28, alignSelf: "center", mx: 1, bgcolor: "white" }}
            />
          </Box>
        </Box>

        <Typography variant="h6" sx={{ mt: 2 }}>
          จำนวนเครดิตหลังจัดการ: {formatNumber(calculateTotalCredit())}
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ชื่อ Agent</StyledTableCell>

                <StyledTableCell align="center">เครดิตปัจจุบัน</StyledTableCell>
                <StyledTableCell align="center">เพิ่ม</StyledTableCell>
                <StyledTableCell align="center">ลด</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {agentData.username}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <b>{formatNumber(agentData.remainingCredit)}</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      type="text"
                      value={addCredit}
                      onChange={handleAddCreditChange}
                      variant="outlined"
                      size="small"
                      sx={{ width: "60%", mr: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ minWidth: "80px" }}
                      onClick={handleAddCredit}
                    >
                      เพิ่ม
                    </Button>
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      type="text"
                      value={reduceCredit}
                      onChange={handleReduceCreditChange}
                      variant="outlined"
                      size="small"
                      sx={{ width: "60%", mr: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ minWidth: "80px" }}
                      onClick={handleReduceCredit}
                      disabled={isReduceDisabled()}
                    >
                      ลด
                    </Button>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* เพิ่มตารางประวัติเครดิต */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            ประวัติการทำรายการ
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="credit history table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ผู้ทำรายการ</StyledTableCell>
                  <StyledTableCell>รหัส</StyledTableCell>
                  <StyledTableCell>ผู้รับ</StyledTableCell>
                  <StyledTableCell>รหัส</StyledTableCell>
                  <StyledTableCell align="center">ประเภท</StyledTableCell>
                  <StyledTableCell align="right">จำนวน</StyledTableCell>
                  <StyledTableCell>หมายเหตุ</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {creditHistory.map((history, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{history.source.username}</StyledTableCell>
                    <StyledTableCell>{history.source.code}</StyledTableCell>
                    <StyledTableCell>
                      {history.desination.username}
                    </StyledTableCell>
                    <StyledTableCell>{history.desination.code}</StyledTableCell>
                    <StyledTableCell align="center">
                      {history.type === "INCREASE" ? "เพิ่ม" : "ลด"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatNumber(history.amount)}
                    </StyledTableCell>
                    <StyledTableCell>{history.remark}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default ManageOneAgentCredit;
