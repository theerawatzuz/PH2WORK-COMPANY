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
  TablePagination,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import CachedIcon from "@mui/icons-material/Cached";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Divider } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.MuiTableCell-head`]: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.black,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    fontWeight: `bold`,
    width: "25%",
  },
  [`&.MuiTableCell-body`]: {
    fontSize: 14,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
    width: "25%",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const rows = [
  { agent: "PG", netAmount: "80%" },
  { agent: "Sexy", netAmount: "85%" },
  { agent: "SA", netAmount: "87%" },
  { agent: "SBO", netAmount: "86%" },
  { agent: "JILI", netAmount: "87%" },
  { agent: "WM", netAmount: "85%" },
  { agent: "Joker", netAmount: "89%" },
];

function LoseWinAgentTransaction({ id, onBack }) {
  const [playerData, setPlayerData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [dropdownValues, setDropdownValues] = useState(
    rows.map((row) => row.netAmount)
  );
  const [quickSetting, setQuickSetting] = useState("50%");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDropdownChange = (index, value) => {
    const newValues = [...dropdownValues];
    newValues[index] = value;
    setDropdownValues(newValues);
  };

  const updateAllDropdowns = (value) => {
    setDropdownValues(
      rows.map((row) => {
        if (row.agent === "SBO" && parseInt(value) > 86) {
          return "86%";
        }
        return value;
      })
    );
  };

  const handleQuickSettingChange = (event) => {
    const newValue = event.target.value;
    setQuickSetting(newValue);
    updateAllDropdowns(newValue);
  };

  const handleReset = () => {
    setDropdownValues(rows.map((row) => row.netAmount));
    setQuickSetting("50%");
  };

  useEffect(() => {
    setPlayerData({
      id: id,
    });
  }, [id]);

  if (!playerData) {
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
            <Button variant="contained" color="success" onClick={onBack}>
              บันทึก
            </Button>
          </Box>
          <Typography variant="h4" sx={{ mt: 2 }}>
            จัดการยอดถือสู้ของ Master
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
            <AccountCircle />
            {playerData.id}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: 28, alignSelf: "center", mx: 1, bgcolor: "white" }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button startIcon={<CachedIcon />} onClick={handleReset}>
            <b>รีเซ็ต</b>
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>ตั้งค่ารวดเร็ว</Typography>
            <Select
              value={quickSetting}
              onChange={handleQuickSettingChange}
              sx={{ minWidth: 350 }}
            >
              {[...Array(40).keys()].map((i) => (
                <MenuItem key={i} value={`${50 + i}%`}>
                  {50 + i}%
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ค่ายเกมส์</StyledTableCell>
                <StyledTableCell colSpan={2} align="center">
                  ยอดสู้
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.agent}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.netAmount}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Select
                        fullWidth
                        value={dropdownValues[index]}
                        onChange={(e) =>
                          handleDropdownChange(index, e.target.value)
                        }
                      >
                        {[...Array(row.agent === "SBO" ? 38 : 40).keys()].map(
                          (i) => (
                            <MenuItem
                              key={i}
                              value={`${50 + i}%`}
                              disabled={row.agent === "SBO" && 50 + i > 86}
                            >
                              {50 + i}%
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}

export default LoseWinAgentTransaction;
