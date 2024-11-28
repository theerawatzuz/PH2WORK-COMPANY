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
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import TablePagination from "@mui/material/TablePagination";
import axiosInstance from "../utils/axiosInstance";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CachedIcon from "@mui/icons-material/Cached";

// import LoseWinMasterTransaction from "../pages/LoseWinMasterTransaction";
// import ListNameAgent from "../pages/ListNameAgent";
import ManageOneAgent from "../pages/ManageOneAgent";
import LoseWinOneAgentTransaction from "../pages/LoseWinOneAgentTransaction";
import ManageOneAgentCredit from "../pages/ManageOneAgentCredit";

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
  agentName,
  status,
  creditUsed,
  remainingCredit,
  holdingAmount,
  manage
) {
  return {
    order,
    agentName,
    status,
    creditUsed,
    remainingCredit,
    holdingAmount,
    manage,
  };
}

function DashboardReport() {
  const [selectedRow, setSelectedRow] = useState(null); // เก็บข้อมูลของแถวที่ถูกเลือก

  const handleViewClick = (row) => {
    setSelectedRow({
      id: row.id,
      username: row.username,
      remainingCredit: row.credit || "0",
    });
  };

  const [selectedRowAgent, setSelectedRowAgent] = useState(null); // เก็บข้อมูลของแถวที่ถูกเลือก

  const handleViewClickAgent = (row) => {
    setSelectedRowAgent({
      id: row.id,
      username: row.username,
      remainingCredit: row.credit || "0",
    });
  };

  // เพิ่ม state สำหรับ pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [agents, setAgents] = useState([]);
  const [pagination, setPagination] = useState(null);

  // เพิ่ม state สำหรับเก็บข้อมูลทั้งหมดและข้อมูลที่กรองแล้ว
  const [allAgents, setAllAgents] = useState([]); // เก็บข้อมูลทั้งหมด
  const [filteredAgents, setFilteredAgents] = useState([]); // เก็บข้อมูลที่กรองแล้ว
  const [searchTerm, setSearchTerm] = useState("");

  // เพิ่ม function สำหรับโหลดข้อมูล
  const loadAgents = () => {
    const authToken = localStorage.getItem("authToken");
    axiosInstance
      .get(`/agents?page=${page}&size=${rowsPerPage}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setAllAgents(response.data.data);
        setFilteredAgents(response.data.data);
        setPagination(response.data.page);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  // แก้ไข handler สำหรับปุ่ม back
  const handleBack = () => {
    setSelectedRow(null);
    setSelectedRowAgent(null);
    loadAgents(); // โหลดข้อมูลใหม่เมื่อกลับมา
  };

  // แก้ไข handler สำหรับการเปลี่ยนหน้า
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // เพิ่ม handler สำหรับการเปลี่ยนจำนวนแถวต่อหน้า
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // แก้ไขฟังก์ชันค้นหา
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    const filtered = allAgents.filter((agent) =>
      agent.username.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredAgents(filtered);
    setPage(0);
  };

  // useEffect เดิม
  useEffect(() => {
    loadAgents();
  }, [page, rowsPerPage]);

  return (
    <Box
      sx={{
        gap: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4">ภาพรวม Agent</Typography>
      {selectedRow ? (
        <Box>
          <LoseWinOneAgentTransaction
            id={selectedRow.id}
            username={selectedRow.username}
            remainingCredit={selectedRow.remainingCredit}
            onBack={handleBack}
          />
        </Box>
      ) : selectedRowAgent ? (
        <Box>
          <ManageOneAgentCredit
            id={selectedRowAgent.id}
            username={selectedRowAgent.username}
            remainingCredit={selectedRowAgent.remainingCredit}
            onBack={handleBack}
          />
        </Box>
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
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
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
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">ชื่อ Agent</StyledTableCell>
                  <StyledTableCell align="center">Website</StyledTableCell>
                  {/* <StyledTableCell align="center">ประเภท</StyledTableCell> */}
                  <StyledTableCell align="center">สถานะ</StyledTableCell>
                  <StyledTableCell align="center">
                    ยอดเครดิตที่ใช้ไป
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    เครดิตคงเหลือ
                  </StyledTableCell>
                  <StyledTableCell align="center">ยอดถือสู้</StyledTableCell>
                  <StyledTableCell align="center">
                    จัดการเครดิตและประวัติ
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAgents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.username || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <b>{row.website || "-"}</b>
                      </StyledTableCell>
                      {/* <StyledTableCell align="left">
                        <b>-</b>
                      </StyledTableCell> */}
                      <StyledTableCell align="center">
                        <Typography
                          variant="body2"
                          style={{
                            color:
                              row.status === "ONLINE"
                                ? "green"
                                : row.status === "OFFLINE"
                                ? "red"
                                : row.status === "MAINTENANCE"
                                ? "blue"
                                : "inherit",
                            fontWeight: "bold",
                          }}
                        >
                          {row.status}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <b>{row.creditUsed?.toLocaleString() || "-"}</b>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <b>{row.credit.toLocaleString()}</b>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleViewClick(row)}
                        >
                          จัดการ
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <ButtonGroup
                          variant="contained"
                          aria-label="ManageUserStatus"
                        >
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => handleViewClickAgent(row)}
                          >
                            <EditIcon />
                          </Button>
                        </ButtonGroup>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={filteredAgents.length} // แก้ไขให้ใช้ความยาวของข้อมูลที่กรองแล้ว
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="แถวต่อหน้า"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} จาก ${count}`
              }
            />
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}

export default DashboardReport;
