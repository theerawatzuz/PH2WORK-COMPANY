import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
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
import TablePagination from "@mui/material/TablePagination";

//icon
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CachedIcon from "@mui/icons-material/Cached";

import axiosInstance from "../utils/axiosInstance";

import { useSnackbar } from "../utils/useSnackbar";

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

function createData(num, domainName, ip, status) {
  return { num, domainName, ip, status };
}

const rows = [
  createData("1", "VK1234.com", "405.232.4.2", "Active"),
  createData("2", "123Bet.info", "134.232.44.24", "Active"),
  createData("3", "PGslot123.live", "223.23.44.24", "Active"),
];

function ManageMaster() {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [pagination, setPagination] = useState({});

  const [activeButtons, setActiveButtons] = useState(rows.map(() => "เปิด"));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [editingId, setEditingId] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState({});

  const [newPassword, setNewPassword] = useState({});
  const [editedWebsites, setEditedWebsites] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const handleButtonClick = (index, value) => {
    const newActiveButtons = [...activeButtons];
    newActiveButtons[index] = value;
    setActiveButtons(newActiveButtons);
  };

  const getThaiStatus = (status) => {
    switch (status) {
      case "ONLINE":
        return "เปิด";
      case "SUSPENDED":
        return "ระงับ";
      case "CLOSED":
        return "ปิด";
      default:
        return status;
    }
  };

  useEffect(() => {
    loadAgents();
  }, [page]);

  const loadAgents = () => {
    const authToken = localStorage.getItem("authToken");
    axiosInstance
      .get(`/master?page=${page}&size=${rowsPerPage}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setAgents(response.data.data);
        setFilteredAgents(response.data.data);
        setPagination(response.data.page);
      })
      .catch((error) => {
        console.error("Error fetching masters data:", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (agentId) => {
    const agent = agents.find((a) => a.id === agentId);
    if (
      agent.website &&
      !agent.website.startsWith("http://") &&
      !agent.website.startsWith("https://")
    ) {
      setEditedWebsites({
        ...editedWebsites,
        [agentId]: "http://" + agent.website,
      });
    }
    setEditingId(agentId);
  };

  const handleSaveClick = async (agentId) => {
    try {
      const agent = agents.find((a) => a.id === agentId);

      const body = {
        email: agent.email,
        status: selectedStatus[agentId] || agent.status,
        website: editedWebsites[agentId] || agent.website || "",
      };

      if (newPassword[agentId]) {
        body.password = newPassword[agentId];
      }

      const authToken = localStorage.getItem("authToken");
      await axiosInstance.put(`/master/${agentId}`, body, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      showSnackbar("บันทึกข้อมูลสำเร็จ", "success");

      loadAgents();
      setEditingId(null);
      setSelectedStatus({});
      setNewPassword({});
      setEditedWebsites({});
    } catch (error) {
      console.error("Error updating master:", error);
      showSnackbar(
        "เกิดข้อผิดพลาด: " +
          (error.response?.data?.message || "ไม่สามารถบันทึกข้อมูลได้"),
        "error"
      );
    }
  };

  const handleStatusChange = (agentId, newStatus) => {
    const statusMap = {
      ONLINE: "ONLINE",
      SUSPENDED: "SUPENEDED",
      CLOSED: "CLOSED",
    };

    setSelectedStatus({
      ...selectedStatus,
      [agentId]: statusMap[newStatus],
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handlePasswordChange = (agentId, value) => {
    setNewPassword({
      ...newPassword,
      [agentId]: value,
    });
  };

  const handleWebsiteChange = (agentId, index, value) => {
    let updatedValue = value;
    if (!value.startsWith("http://") && !value.startsWith("https://")) {
      updatedValue = "http://" + value;
    }
    setEditedWebsites({
      ...editedWebsites,
      [agentId]: updatedValue,
    });
  };

  const handleSearch = () => {
    const filtered = agents.filter((agent) =>
      agent.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAgents(filtered);
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
      <Typography variant="h4">จัดการ Master</Typography>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch}>
            ค้นหา
          </Button>
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
                  ID
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  ชื่อผู้ใช้งาน
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  Website
                </StyledTableCell>

                <StyledTableCell align="center" rowSpan={2}>
                  สถานะ
                </StyledTableCell>
                {editingId && (
                  <StyledTableCell align="center" rowSpan={2}>
                    รหัสผ่าน
                  </StyledTableCell>
                )}
                <StyledTableCell align="center" rowSpan={2}>
                  จัดการ
                </StyledTableCell>
                <StyledTableCell align="center" rowSpan={2}>
                  แก้ไข
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAgents.map((agent, index) => (
                <StyledTableRow key={agent.id}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {agent.id}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {agent.username}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {editingId === agent.id ? (
                      <TextField
                        fullWidth
                        defaultValue={agent.website || ""}
                        size="small"
                        margin="dense"
                        value={
                          editedWebsites[agent.id] ||
                          (agent.website
                            ? agent.website.startsWith("http")
                              ? agent.website
                              : "http://" + agent.website
                            : "")
                        }
                        onChange={(e) =>
                          handleWebsiteChange(agent.id, 0, e.target.value)
                        }
                        InputProps={{
                          startAdornment: editingId === agent.id && (
                            <Box
                              component="span"
                              sx={{
                                color: "text.secondary",
                                userSelect: "none",
                                pointerEvents: "none",
                              }}
                            ></Box>
                          ),
                        }}
                      />
                    ) : (
                      <div>
                        <b>{agent.website || "-"}</b>
                      </div>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="subtitle1">
                      <Box
                        sx={{
                          color: agent.status === "ONLINE" ? "green" : "red",
                        }}
                      >
                        <b>{agent.status}</b>
                      </Box>
                    </Typography>
                  </StyledTableCell>
                  {editingId && (
                    <StyledTableCell align="center">
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="กรอกรหัสผ่านใหม่"
                        disabled={editingId !== agent.id}
                        value={newPassword[agent.id] || ""}
                        onChange={(e) =>
                          handlePasswordChange(agent.id, e.target.value)
                        }
                        sx={{
                          "& .Mui-disabled": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                            "-webkit-text-fill-color": "rgba(0, 0, 0, 0.38)",
                          },
                        }}
                      />
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="center">
                    <ButtonGroup
                      variant="contained"
                      aria-label="ManageUserStatus"
                      disabled={editingId !== agent.id}
                    >
                      <Button
                        color="success"
                        variant={
                          (editingId === agent.id &&
                            selectedStatus[agent.id] === "ONLINE") ||
                          (!selectedStatus[agent.id] &&
                            agent.status === "ONLINE")
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => handleStatusChange(agent.id, "ONLINE")}
                      >
                        เปิด
                      </Button>
                      <Button
                        color="primary"
                        variant={
                          (editingId === agent.id &&
                            selectedStatus[agent.id] === "SUPENEDED") ||
                          (!selectedStatus[agent.id] &&
                            agent.status === "SUPENEDED")
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() =>
                          handleStatusChange(agent.id, "SUSPENDED")
                        }
                      >
                        ระงับ
                      </Button>
                      <Button
                        color="error"
                        variant={
                          (editingId === agent.id &&
                            selectedStatus[agent.id] === "CLOSED") ||
                          (!selectedStatus[agent.id] &&
                            agent.status === "CLOSED")
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => handleStatusChange(agent.id, "CLOSED")}
                      >
                        ปิด
                      </Button>
                    </ButtonGroup>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {editingId === agent.id ? (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleSaveClick(agent.id)}
                        >
                          บันทึก
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={handleCancelEdit}
                        >
                          ยกเลิก
                        </Button>
                      </Box>
                    ) : (
                      <Button onClick={() => handleEditClick(agent.id)}>
                        <EditIcon />
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={filteredAgents.length}
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
      <SnackbarComponent />
    </Box>
  );
}

export default ManageMaster;
