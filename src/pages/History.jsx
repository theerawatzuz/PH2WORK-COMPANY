import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
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
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import CachedIcon from "@mui/icons-material/Cached";
import axiosInstance from "../utils/axiosInstance";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { UAParser } from "ua-parser-js";

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
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function History() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [histories, setHistories] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchHistories = async (page) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get(
        `/user/histories/login?page=${page}&size=${rowsPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setHistories(response.data.data);
      setTotalSize(response.data.page.totalSize);
    } catch (error) {
      console.error("Error fetching histories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistories(page);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDateTime = (dateString) => {
    return dayjs(dateString).locale("en").format("DD MMM YYYY HH:mm:ss");
  };

  const handleReset = () => {
    setSearchTerm("");
    setPage(0);
    fetchHistories(0);
  };

  const formatUserAgent = (userAgent) => {
    if (!userAgent) return "-";

    const parser = new UAParser();
    parser.setUA(userAgent);
    const result = parser.getResult();

    const browser = result.browser.name
      ? `${result.browser.name} ${result.browser.version}`
      : "";
    const os = result.os.name ? `${result.os.name} ${result.os.version}` : "";
    const device = result.device.type
      ? `${
          result.device.type.charAt(0).toUpperCase() +
          result.device.type.slice(1)
        }`
      : "Desktop";

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="body2">{browser}</Typography>
        <Typography variant="body2" color="text.secondary">
          {os} • {device}
        </Typography>
      </Box>
    );
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
      <Typography variant="h4">ประวัติการเข้าสู่ระบบ</Typography>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="กรอก IP"
            variant="outlined"
          />
          <Button variant="contained">ค้นหา</Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button startIcon={<CachedIcon />} onClick={handleReset}>
            <b>รีเซ็ต</b>
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">วันที่-เวลา</StyledTableCell>
                <StyledTableCell align="center">IP</StyledTableCell>
                <StyledTableCell align="center">User Agent</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histories.map((history) => (
                <StyledTableRow key={history.logged_at}>
                  <StyledTableCell align="center">
                    {formatDateTime(history.logged_at)}
                  </StyledTableCell>
                  <StyledTableCell align="center">{history.ip}</StyledTableCell>
                  <StyledTableCell align="center">
                    {formatUserAgent(history.useragent)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[50, 100]}
          component="div"
          count={totalSize}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="แถวต่อหน้า"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} จาก ${count}`
          }
        />
      </Box>
    </Box>
  );
}

export default History;
