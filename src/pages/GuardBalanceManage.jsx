import { Box } from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CachedIcon from "@mui/icons-material/Cached";

import LoseWinMasterTransaction from "../pages/LoseWinMasterTransaction";

const UserName = "ผู้ใช้งาน";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.black,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    fontWeight: `bold`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  [`&.${tableCellClasses.footer}`]: {
    fontSize: 14,
    color: theme.palette.common.black,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
    fontWeight: `bold`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function createData(
  order,
  masterName,
  agentCount,
  creditUsed,
  manageCredit,
  manage
) {
  return { order, masterName, agentCount, creditUsed, manageCredit, manage };
}

const rows = [
  createData("1", "Master 1", 15, "200,000,000.00"),
  createData("2", "Master 2", 3, "50,000,000.00"),
  createData("3", "Master 3", 10, "80,000,000.00"),
];

function GuardBalanceManage() {
  const [selectedRow, setSelectedRow] = useState(null); // เก็บข้อมูลของแถวที่ถูกเลือก

  const handleViewClick = (row) => {
    setSelectedRow({ id: row.masterName, active: row.agentCount });
  };

  return (
    <Box
      sx={{
        gap: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4">จัดการ</Typography>
      {selectedRow ? (
        <LoseWinMasterTransaction
          id={selectedRow.id}
          active={selectedRow.active}
          onBack={() => setSelectedRow(null)}
        />
      ) : (
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              id="outlined-basic"
              label="กรอกชื่อ Master"
              variant="outlined"
            />
            <Button variant="contained">ค้นหา</Button>
          </Box>
          {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">
            <Box sx={{ bgcolor: '#eeeeee', display: 'inline-block', p: 1, borderRadius: '10px' }}>
              <b>ดาวไลน์ปัจจุบัน : </b> {UserName}
            </Box>
          </Typography>
          <Button startIcon={<CachedIcon />}>
            <b>รีเซ็ต</b>
          </Button>
        </Box> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ลำดับ</StyledTableCell>
                  <StyledTableCell align="center">ชื่อ Master</StyledTableCell>
                  <StyledTableCell align="center">จัดการยอดถือสู้</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.order}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.order}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.masterName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleViewClick(row)}
                      >
                        จัดการ
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}

export default GuardBalanceManage;
