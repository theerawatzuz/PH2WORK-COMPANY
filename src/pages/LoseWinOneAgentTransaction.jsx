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
  ButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import CachedIcon from "@mui/icons-material/Cached";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Divider } from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import SettingsIcon from "@mui/icons-material/Settings";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "../utils/useSnackbar";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.MuiTableCell-head`]: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.black,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    fontWeight: `bold`,
    "&:nth-of-type(1)": { width: "30%" },
    "&:nth-of-type(2)": { width: "15%" },
    "&:nth-of-type(3)": { width: "15%" },
    "&:nth-of-type(4)": { width: "20%" },
    "&:nth-of-type(5)": { width: "10%" },
  },
  [`&.MuiTableCell-body`]: {
    fontSize: 14,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
    "&:nth-of-type(1)": { width: "30%" },
    "&:nth-of-type(2)": { width: "15%" },
    "&:nth-of-type(3)": { width: "15%" },
    "&:nth-of-type(4)": { width: "20%" },
    "&:nth-of-type(5)": { width: "10%" },
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

function LoseWinOneAgentTransaction({ id, onBack, username }) {
  const [playerData, setPlayerData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [quickSetting, setQuickSetting] = useState("50%");
  const [percentage, setPercentage] = useState(null);
  const [calculatedPercentages, setCalculatedPercentages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [editedBetLimits, setEditedBetLimits] = useState([]);
  const [isSavingBetLimits, setIsSavingBetLimits] = useState(false);
  const [allBetLimits, setAllBetLimits] = useState({});
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [providerStatus, setProviderStatus] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDropdownChange = (item, value) => {
    const newCalculatedPercentages = calculatedPercentages.map((row) => {
      if (row.id === item.id) {
        return {
          ...row,
          calculatedValue: value,
          percentage: {
            ...row.percentage,
            current: value / 100,
          },
        };
      }
      return row;
    });
    setCalculatedPercentages(newCalculatedPercentages);

    const logData = {
      data: newCalculatedPercentages.map((item) => ({
        id: item.id,
        enabled: true,
        percentage: item.percentage.current,
      })),
    };
    console.log("ค่าที่เปลี่ยนแปลง:", JSON.stringify(logData, null, 2));
  };

  const updateAllDropdowns = (value) => {
    if (!percentage) return;

    const newPercentage = percentage.map((item) => ({
      ...item,
      percentage: {
        ...item.percentage,
        current:
          item.agent === "SBO" && parseInt(value) > 86
            ? 0.86
            : parseInt(value) / 100,
      },
    }));
    setPercentage(newPercentage);
  };

  const handleQuickSettingChange = (event) => {
    const newValue = event.target.value;
    setQuickSetting(newValue);
    const percentageValue = parseInt(newValue) / 100;

    const newCalculatedPercentages = calculatedPercentages.map((item) => ({
      ...item,
      calculatedValue: parseInt(newValue),
      percentage: {
        ...item.percentage,
        current:
          item.agent === "SBO" && parseInt(newValue) > 86
            ? 0.86
            : percentageValue,
      },
    }));
    setCalculatedPercentages(newCalculatedPercentages);

    const logData = {
      data: newCalculatedPercentages.map((item) => ({
        id: item.id,
        enabled: true,
        percentage: item.percentage.current,
      })),
    };
  };

  const handleReset = () => {
    const authToken = localStorage.getItem("authToken");
    axiosInstance
      .get(`/master/${id}/percentage`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setPercentage(response.data.data);
        setQuickSetting("50%");
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleSave = () => {
    const payload = {
      data: calculatedPercentages.map((item) => ({
        id: item.id,
        enabled: providerStatus[item.id] ?? item.enabled,
        percentage: item.percentage.current,
      })),
    };

    const authToken = localStorage.getItem("authToken");
    axiosInstance
      .put(`/master/${id}/percentage`, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          showSnackbar("อัพเดตสำเร็จ", "success");
        }
      })
      .catch((error) => {
        console.error("Error saving percentages:", error);
        showSnackbar("เกิดข้อผิดพลาดในการบันทึกข้อมูล", "error");
      });
  };

  const handleOpenDialog = (provider) => {
    setSelectedProvider(provider);
    setOpenDialog(true);
    const providerLimits = allBetLimits[provider.code] || [];
    setEditedBetLimits(providerLimits);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProvider(null);
  };

  const handleChangeEnabled = (limitId) => {
    setEditedBetLimits((prev) =>
      prev.map((limit) =>
        limit.id === limitId ? { ...limit, enabled: !limit.enabled } : limit
      )
    );
  };

  const fetchBetLimits = () => {
    const authToken = localStorage.getItem("authToken");
    return axiosInstance
      .get(`/master/${id}/betlimit`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setAllBetLimits(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bet limits:", error);
      });
  };

  const handleSaveBetLimits = () => {
    setIsSavingBetLimits(true);

    const payload = {
      data: editedBetLimits.map((limit) => ({
        id: limit.id,
        enabled: limit.enabled,
      })),
    };

    const authToken = localStorage.getItem("authToken");
    axiosInstance
      .post(`/master/${id}/betlimit`, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        fetchBetLimits().then(() => {
          showSnackbar(
            `บันทึก bet limit ${selectedProvider?.title} สำเร็จ`,
            "success"
          );
          handleCloseDialog();
        });
      })
      .catch((error) => {
        console.error("Error saving bet limits:", error);
        showSnackbar(
          `บันทึก bet limit ${selectedProvider?.title} ไม่สำเร็จ`,
          "error"
        );
      })
      .finally(() => {
        setIsSavingBetLimits(false);
      });
  };

  const handleProviderStatusChange = (providerId, newStatus) => {
    setProviderStatus((prev) => ({
      ...prev,
      [providerId]: newStatus,
    }));
  };

  useEffect(() => {
    setPlayerData({
      username: username,
    });
  }, [username]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    axiosInstance
      .get(`/master/${id}/percentage`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setPercentage(response.data.data);
        const calculated = response.data.data.map((item) => ({
          ...item,
          calculatedValue: Math.round(item.percentage.current * 100),
        }));
        setCalculatedPercentages(calculated);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  useEffect(() => {
    fetchBetLimits();
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
            <Button variant="contained" color="success" onClick={handleSave}>
              บันทึก
            </Button>
          </Box>
          <Typography variant="h4" sx={{ mt: 2 }}>
            จัดการยอดถือสู้ของ Master
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
            <AccountCircle />
            {playerData.username}
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
                <StyledTableCell align="center">ยอดสู้ปัจจุบัน</StyledTableCell>
                <StyledTableCell align="center">ตั้งค่า</StyledTableCell>
                <StyledTableCell align="center">
                  เปิด-ปิด ค่ายเกมส์
                </StyledTableCell>
                <StyledTableCell align="center">
                  จัดการ Bet Limit
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calculatedPercentages.length > 0 ? (
                calculatedPercentages
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell>{item.title}</StyledTableCell>
                      <StyledTableCell align="center">
                        <b>{item.calculatedValue}%</b>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Select
                          fullWidth
                          value={item.calculatedValue}
                          onChange={(e) => {
                            const newValue = parseInt(e.target.value);
                            handleDropdownChange(item, newValue);
                          }}
                        >
                          {[...Array(46).keys()].map((i) => {
                            const value = 50 + i;
                            return (
                              <MenuItem key={i} value={value}>
                                {value}%
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <ButtonGroup
                          variant="contained"
                          aria-label="ManageUserStatus"
                        >
                          <Button
                            color="primary"
                            variant={
                              providerStatus[item.id] ?? item.enabled
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() =>
                              handleProviderStatusChange(item.id, true)
                            }
                          >
                            เปิด
                          </Button>
                          <Button
                            color="error"
                            variant={
                              !(providerStatus[item.id] ?? item.enabled)
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() =>
                              handleProviderStatusChange(item.id, false)
                            }
                          >
                            ปิด
                          </Button>
                        </ButtonGroup>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {allBetLimits[item.code] ? (
                          <IconButton
                            color={
                              allBetLimits[item.code].some(
                                (limit) => limit.editable
                              )
                                ? "success"
                                : "default"
                            }
                            onClick={() => handleOpenDialog(item)}
                            disabled={
                              !allBetLimits[item.code].some(
                                (limit) => limit.editable
                              )
                            }
                          >
                            <SettingsIcon />
                          </IconButton>
                        ) : (
                          "-"
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
              ) : (
                <StyledTableRow>
                  {calculatedPercentages.length === 0 && (
                    <StyledTableCell colSpan={4}>ไม่พบข้อมูล</StyledTableCell>
                  )}
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[50]}
          component="div"
          count={calculatedPercentages.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          จัดการ Bet Limit - {selectedProvider?.title}
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    สถานะการใช้งาน
                  </StyledTableCell>
                  <StyledTableCell align="center">Bet limit</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {editedBetLimits.map((limit) => (
                  <StyledTableRow key={limit.id}>
                    <StyledTableCell align="center">
                      <Checkbox
                        checked={limit.enabled}
                        onChange={() => handleChangeEnabled(limit.id)}
                        disabled={!limit.editable}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>
                        {limit.min} - {limit.max}
                      </b>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSaveBetLimits}
            variant="contained"
            color="primary"
            disabled={isSavingBetLimits}
            startIcon={
              isSavingBetLimits ? <CircularProgress size={20} /> : null
            }
          >
            บันทึก
          </Button>
          <Button onClick={handleCloseDialog}>ยกเลิก</Button>
        </DialogActions>
      </Dialog>
      <SnackbarComponent />
    </Box>
  );
}

export default LoseWinOneAgentTransaction;
