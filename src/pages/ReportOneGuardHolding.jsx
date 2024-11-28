import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//icon
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpIcon from "@mui/icons-material/Help";
import AccountCircle from "@mui/icons-material/AccountCircle";

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

function createData(
  provider,
  winRate,
  companyRate,
  betAmount,
  receivedAmount,
  companyReceived
) {
  return {
    provider,
    winRate,
    companyRate,
    betAmount,
    receivedAmount,
    companyReceived,
  };
}

const rows = [
  createData("PG", "85%", "15%", 10000, 8500, 1500),
  createData("Sexy", "87%", "13%", 15000, 13050, 1950),
  createData("SA", "90%", "10%", 80000, 72000, 8000),
  createData("SBO", "87%", "13%", 25000, 21750, 3250),
  createData("JILI", "87%", "13%", 100000, 87000, 13000),
  createData("WM", "87%", "13%", 632000, 549840, 82160),
  createData("Joker", "90%", "10%", 847200, 762480, 84720),
];

function ReportOneGuardHolding({ id, onBack }) {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    setPlayerData({
      id: id,
    });
  }, [id]);

  if (!playerData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" onClick={onBack}>
            กลับ
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <Typography
            variant="h4"
            sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
          >
            <AccountCircle />
            {playerData.id}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 28, alignSelf: "center", mx: 1, bgcolor: "white" }}
          />
        </Box>
      </Box>
      {/* SearchHeader */}
      <Box
        sx={{
          bgcolor: "white",
          p: 2,
          boxShadow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="จากวันที่" />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="ถึงวันที่" />
              </DemoContainer>
            </LocalizationProvider>
            <Button variant="contained">ค้นหา</Button>
            <Button variant="contained" color="success">
              ทั้งหมด
            </Button>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                height: 28,
                width: 2,
                alignSelf: "center",
                mx: 1,
                mr: 2,
                bgcolor: "grey",
              }}
            />
            <ButtonGroup variant="contained" aria-label="GroupSelect">
              <Button>วันนี้</Button>
              <Button>อาทิตย์นี้</Button>
              <Button>เดือนนี้</Button>
            </ButtonGroup>
          </Box>
          <Typography
            variant="subtitle1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <HelpOutlineIcon fontSize="small" />
            นโยบายข้อมูล
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ค่ายเกมส์</StyledTableCell>
                <StyledTableCell align="center">ยอดสู้</StyledTableCell>
                <StyledTableCell align="center">ยอดบริษัท</StyledTableCell>
                <StyledTableCell align="center">ยอดที่ใช้</StyledTableCell>
                <StyledTableCell align="center">ยอดที่ได้รับ</StyledTableCell>
                <StyledTableCell align="center">
                  ยอดที่บริษัทได้รับ
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">{row.provider}</StyledTableCell>
                  <StyledTableCell align="right">{row.winRate}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.companyRate.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.betAmount.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.receivedAmount.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.companyReceived.toLocaleString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow sx={{ bgcolor: "grey.300" }}>
                <StyledTableCell
                  align="center"
                  colSpan={3}
                  sx={{ bgcolor: "#00bcd4" }}
                >
                  รวม
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ bgcolor: "#90EE90" }}>
                  {rows
                    .reduce((sum, row) => sum + row.betAmount, 0)
                    .toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ bgcolor: "#87CEFA" }}>
                  {rows
                    .reduce((sum, row) => sum + row.receivedAmount, 0)
                    .toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ bgcolor: "#4caf50" }}>
                  {rows
                    .reduce((sum, row) => sum + row.companyReceived, 0)
                    .toLocaleString()}
                </StyledTableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default ReportOneGuardHolding;
