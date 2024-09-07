import { Box } from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import ButtonGroup from "@mui/material/ButtonGroup";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//icon
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CachedIcon from "@mui/icons-material/Cached";

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
    borderButtom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  [`&.${tableCellClasses.footer}`]: {
    fontSize: 14,
    color: theme.palette.common.black,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderButtom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
    fontWeight: `bold`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

function createData(date, time, user, transaction, ip) {
  return { date, time, user, transaction, ip };
}

const rows = [
  createData("12 ก.ย.67", "14:23", "admin1", "Login", "192.167.5.4"),
  createData("13 ก.ย.67", "10:10", "admin1", "Login", "192.167.5.4"),
  createData("13 ก.ย.67", "19:04", "admin1", "Logout", "192.167.5.4"),
];

function History() {
  const [activeButtons, setActiveButtons] = useState(rows.map(() => "เปิด"));

  const handleButtonClick = (index, value) => {
    const newActiveButtons = [...activeButtons];
    newActiveButtons[index] = value;
    setActiveButtons(newActiveButtons);
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
      <Typography variant="h4">ประวัติ</Typography>
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
            label="กรอกชื่อผู้ใช้"
            variant="outlined"
          />
          <Button variant="contained">ค้นหา</Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button startIcon={<CachedIcon />}>
            <b>รีเซ็ต</b>
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" rowSpan={2}>
                  วันที่
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  เวลา
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  ชื่อ
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  สถานะ
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  IP
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={row.date}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.time}</StyledTableCell>
                  <StyledTableCell align="center">{row.user}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          row.transaction === "Login"
                            ? "green"
                            : row.transaction === "Logout"
                            ? "red"
                            : "inherit",
                        fontWeight: "bold",
                      }}
                    >
                      {row.transaction}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.ip}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default History;
