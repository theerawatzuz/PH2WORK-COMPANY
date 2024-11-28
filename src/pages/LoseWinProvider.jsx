import React, { useState, useEffect, useCallback } from "react";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";

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

import axiosInstance from "../utils/axiosInstance";

import CircularProgress from "@mui/material/CircularProgress";

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

function ProviderSelection({
  providers,
  onSelectChange,
  providerStatusData,
  selectedMaster,
}) {
  const onlineAgents = providerStatusData.filter(
    (agent) => agent.status === "ONLINE"
  );

  return (
    <ButtonGroup variant="outlined" size="small">
      {onlineAgents.map((agent) => (
        <Button
          key={agent.id}
          onClick={() => onSelectChange(agent.id)}
          variant={selectedMaster === agent.id ? "contained" : "outlined"}
        >
          {agent.username} {agent.website ? `(${agent.website})` : ""}
        </Button>
      ))}
    </ButtonGroup>
  );
}

function LoseWinProvider() {
  const [providers, setProviders] = useState({ ALL: true });
  const [showTable, setShowTable] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showUserReport, setShowUserReport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [providerStatusData, setProviderStatusData] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedMaster, setSelectedMaster] = useState(null);

  const updateFilteredRows = useCallback(() => {
    const fetchData = async () => {
      if (!selectedMaster) return;

      setIsLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const body = {
          master_id: selectedMaster,
          start: startDate ? startDate.format("YYYY-MM-DDTHH:mm:ssZ") : null,
          end: endDate ? endDate.format("YYYY-MM-DDTHH:mm:ssZ") : null,
        };

        const response = await axiosInstance.post("/report/masters", body, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const formattedData = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];
        setFilteredRows(formattedData);
      } catch (error) {
        console.error("Error in fetchData:", error);
        setFilteredRows([]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [selectedMaster, startDate, endDate]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.get("/master?page=0&size=100", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const agentsData = response.data.data;
        setProviderStatusData(agentsData);

        const firstOnlineMaster = agentsData.find(
          (agent) => agent.status === "ONLINE"
        );
        if (firstOnlineMaster) {
          setSelectedMaster(firstOnlineMaster.id);
        }

        const todayStart = dayjs().startOf("day").add(1, "minute");
        const todayEnd = dayjs();

        setStartDate(todayStart);
        setEndDate(todayEnd);
        setShowTable(true);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (
      isInitialLoad &&
      startDate &&
      endDate &&
      providerStatusData.length > 0
    ) {
      updateFilteredRows();
      setIsInitialLoad(false);
    }
  }, [
    isInitialLoad,
    startDate,
    endDate,
    providerStatusData,
    updateFilteredRows,
  ]);

  useEffect(() => {
    if (startDate && endDate && selectedMaster) {
      updateFilteredRows();
    }
  }, [startDate, endDate, selectedMaster]);

  const handleSearch = () => {
    setShowTable(true);
    updateFilteredRows();
  };

  const handleAllDates = () => {
    setStartDate(null);
    setEndDate(null);
    setShowTable(true);
    updateFilteredRows();
  };

  const handleQuickSelect = async (period) => {
    const now = dayjs();
    let newStartDate, newEndDate;

    switch (period) {
      case "today":
        newStartDate = now.startOf("day").add(1, "minute");
        newEndDate = now;
        break;
      case "week":
        newStartDate = now.startOf("week");
        newEndDate = now;
        break;
      case "month":
        newStartDate = now.startOf("month");
        newEndDate = now;
        break;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setShowTable(true);
  };

  const totalSum = filteredRows.reduce((acc, row) => acc + row.total, 0);
  const receivedSum = filteredRows.reduce((acc, row) => acc + row.received, 0);
  const companyReceivedSum = filteredRows.reduce(
    (acc, row) => acc + row.companyReceived,
    0
  );

  const handleShowFindUserReport = () => {
    setShowUserReport(true);
  };

  const handleBack = () => {
    setShowUserReport(false);
  };

  const handleProviderSelect = useCallback((masterId) => {
    setSelectedMaster(masterId);
  }, []);

  return (
    <Box
      sx={{
        gap: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Typography variant="h4">รายงาน Master</Typography>
      </Box>

      <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
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
                  <DatePicker
                    label="จากวันที่"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    format="DD MMM YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="ถึงวันที่"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    format="DD MMM YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Button variant="contained" onClick={handleSearch}>
                ค้นหา
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
                <Button onClick={() => handleQuickSelect("today")}>
                  วันนี้
                </Button>
                <Button onClick={() => handleQuickSelect("week")}>
                  อาทิตย์นี้
                </Button>
                <Button onClick={() => handleQuickSelect("month")}>
                  เดือนนี้
                </Button>
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

          <Typography
            variant="subtitle1"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <b>Masters</b>
            <ProviderSelection
              providers={providers}
              onSelectChange={handleProviderSelect}
              providerStatusData={providerStatusData}
              selectedMaster={selectedMaster}
            />
          </Typography>
          {showTable && (
            <>
              <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                {startDate && endDate
                  ? `วันที่ ${startDate.format(
                      "DD MMM YYYY"
                    )} - ${endDate.format("DD MMM YYYY")}`
                  : "ทั้งหมด"}
              </Typography>
              {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          ค่ายเกมส์
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          เปอร์เซ็นต์ Master
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          เปอร์เซ็นต์ Company
                        </StyledTableCell>
                        <StyledTableCell align="right">เดิมพัน</StyledTableCell>
                        <StyledTableCell align="right">
                          ยอดได้เสีย
                        </StyledTableCell>
                        <StyledTableCell align="right">ยอดรวม</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRows.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="center">
                            <b>{row?.game?.name || "N/A"}</b>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {(row?.percentage?.master * 100 || 0).toFixed(2)}%
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {(row?.percentage?.company * 100 || 0).toFixed(2)}%
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {Number(row?.credit?.bet || 0).toLocaleString()}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {Number(row?.credit?.settle || 0).toLocaleString()}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {Number(row?.credit?.total || 0).toLocaleString()}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <StyledTableCell align="right" colSpan={3}>
                          รวม
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <b>
                            {filteredRows
                              .reduce(
                                (sum, row) => sum + (row?.credit?.bet || 0),
                                0
                              )
                              .toLocaleString()}
                          </b>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <b>
                            {filteredRows
                              .reduce(
                                (sum, row) => sum + (row?.credit?.settle || 0),
                                0
                              )
                              .toLocaleString()}
                          </b>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <b>
                            {filteredRows
                              .reduce(
                                (sum, row) => sum + (row?.credit?.total || 0),
                                0
                              )
                              .toLocaleString()}
                          </b>
                        </StyledTableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* <TablePagination
            rowsPerPageOptions={[1, 5, 10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
    </Box>
  );
}

export default LoseWinProvider;
