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

const agents = ["123Bet.live", "Heng888.co", "lolHeng.live"];
const games = ["PG", "Sexy", "SA", "SBO", "JILI", "WM", "Joker"];

// สร้างข้อมูล mock
const generateMockData = () => {
  const startDate = dayjs("2023-08-01");
  const endDate = dayjs();
  const data = [];

  for (
    let d = startDate;
    d.isBefore(endDate) || d.isSame(endDate, "day");
    d = d.add(1, "day")
  ) {
    agents.forEach((agent) => {
      games.forEach((game) => {
        const total = Math.floor(Math.random() * 1000000) + 10000;
        const percentage = Math.floor(Math.random() * 10) + 80;
        const received = Math.floor((total * percentage) / 100);
        data.push({
          date: d.format("YYYY-MM-DD"),
          agent,
          game,
          percentage: `${percentage}%`,
          commission: `${100 - percentage}%`,
          total,
          received,
          companyReceived: total - received,
        });
      });
    });
  }

  return data;
};

const mockData = generateMockData();

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

function ProviderSelection({ providers, onSelectChange }) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={providers.ALL}
            onChange={onSelectChange}
            name="ALL"
          />
        }
        label="ALL"
      />
      {games.map((game) => (
        <FormControlLabel
          key={game}
          control={
            <Checkbox
              checked={providers[game]}
              onChange={onSelectChange}
              name={game}
            />
          }
          label={game}
        />
      ))}
    </FormGroup>
  );
}

function AgentSelection({ selectedAgents, onSelectChange }) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedAgents.ALL}
            onChange={onSelectChange}
            name="ALL"
          />
        }
        label="ALL"
      />
      {agents.map((agent) => (
        <FormControlLabel
          key={agent}
          control={
            <Checkbox
              checked={selectedAgents[agent]}
              onChange={onSelectChange}
              name={agent}
            />
          }
          label={agent}
        />
      ))}
    </FormGroup>
  );
}

function ReportGuardHolding() {
  const [providers, setProviders] = useState(() => {
    const initialProviders = { ALL: true };
    games.forEach((game) => {
      initialProviders[game] = true;
    });
    return initialProviders;
  });
  const [selectedAgents, setSelectedAgents] = useState(() => {
    const initialAgents = { ALL: true };
    agents.forEach((agent) => {
      initialAgents[agent] = true;
    });
    return initialAgents;
  });
  const [showTable, setShowTable] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleProviderSelect = useCallback((event) => {
    const { name, checked } = event.target;

    setProviders((prev) => {
      const newProviders = { ...prev, [name]: checked };

      if (name === "ALL") {
        Object.keys(newProviders).forEach((key) => {
          if (key !== "ALL") newProviders[key] = checked;
        });
      } else {
        const allSelected = Object.keys(newProviders).every(
          (key) => key === "ALL" || newProviders[key]
        );
        newProviders.ALL = allSelected;
      }

      return newProviders;
    });
  }, []);

  const handleAgentSelect = useCallback((event) => {
    const { name, checked } = event.target;

    setSelectedAgents((prev) => {
      const newAgents = { ...prev, [name]: checked };

      if (name === "ALL") {
        Object.keys(newAgents).forEach((key) => {
          if (key !== "ALL") newAgents[key] = checked;
        });
      } else {
        const allSelected = Object.keys(newAgents).every(
          (key) => key === "ALL" || newAgents[key]
        );
        newAgents.ALL = allSelected;
      }

      return newAgents;
    });
  }, []);

  const updateFilteredRows = useCallback(() => {
    let filtered = mockData;

    if (startDate && endDate) {
      filtered = filtered.filter(
        (row) =>
          dayjs(row.date).isAfter(startDate, "day") ||
          (dayjs(row.date).isSame(startDate, "day") &&
            (dayjs(row.date).isBefore(endDate, "day") ||
              dayjs(row.date).isSame(endDate, "day")))
      );
    }

    const selectedProviders = Object.keys(providers).filter(
      (key) => providers[key] && key !== "ALL"
    );
    const selectedAgentsList = Object.keys(selectedAgents).filter(
      (key) => selectedAgents[key] && key !== "ALL"
    );

    filtered = filtered.filter(
      (row) =>
        selectedProviders.includes(row.game) &&
        selectedAgentsList.includes(row.agent)
    );

    const groupedData = filtered.reduce((acc, row) => {
      if (!acc[row.agent]) {
        acc[row.agent] = {};
      }
      if (!acc[row.agent][row.game]) {
        acc[row.agent][row.game] = { ...row, count: 1 };
      } else {
        acc[row.agent][row.game].total += row.total;
        acc[row.agent][row.game].received += row.received;
        acc[row.agent][row.game].companyReceived += row.companyReceived;
        acc[row.agent][row.game].count += 1;
      }
      return acc;
    }, {});

    const result = Object.entries(groupedData).map(([agent, games]) => ({
      agent,
      games: Object.values(games).map((row) => ({
        ...row,
        percentage: `${Math.round((row.received / row.total) * 100)}%`,
        commission: `${Math.round((row.companyReceived / row.total) * 100)}%`,
      })),
    }));

    setFilteredRows(result);
  }, [providers, selectedAgents, startDate, endDate]);

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

  const handleQuickSelect = (period) => {
    const today = dayjs();
    switch (period) {
      case "today":
        setStartDate(today);
        setEndDate(today);
        break;
      case "week":
        setStartDate(today.startOf("week"));
        setEndDate(today.endOf("week"));
        break;
      case "month":
        setStartDate(today.startOf("month"));
        setEndDate(today.endOf("month"));
        break;
    }
    setShowTable(true);
    updateFilteredRows();
  };

  const calculateAgentSummary = useCallback(() => {
    return filteredRows.map((agentData) => ({
      agent: agentData.agent,
      total: agentData.games.reduce((acc, game) => acc + game.total, 0),
      received: agentData.games.reduce((acc, game) => acc + game.received, 0),
      companyReceived: agentData.games.reduce(
        (acc, game) => acc + game.companyReceived,
        0
      ),
    }));
  }, [filteredRows]);

  return (
    <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
      <Typography variant="h4">ค่าถือสู้ Agent</Typography>
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
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="ถึงวันที่"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button variant="contained" onClick={handleSearch}>
              ค้นหา
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleAllDates}
            >
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
              <Button onClick={() => handleQuickSelect("today")}>วันนี้</Button>
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
        <AgentSelection
          selectedAgents={selectedAgents}
          onSelectChange={handleAgentSelect}
        />
        <ProviderSelection
          providers={providers}
          onSelectChange={handleProviderSelect}
        />
        {showTable && (
          <>
            <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
              {startDate && endDate
                ? `วันที่ ${startDate.format("DD/MM/YYYY")} - ${endDate.format(
                    "DD/MM/YYYY"
                  )}`
                : "ทั้งหมด"}
            </Typography>

            {/* Agent Summary Table */}
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              สรุปข้อมูล Agents
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="agent summary table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Agent</StyledTableCell>
                    <StyledTableCell align="right">ยอดที่ใช้</StyledTableCell>
                    <StyledTableCell align="right">
                      ยอดที่ได้รับ
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      ยอดที่บริษัทได้รับ
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calculateAgentSummary().map((summary, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{summary.agent}</StyledTableCell>
                      <StyledTableCell align="right">
                        {summary.total.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {summary.received.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {summary.companyReceived.toLocaleString()}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <StyledTableCell>รวมทั้งหมด</StyledTableCell>
                    <StyledTableCell align="right">
                      {calculateAgentSummary()
                        .reduce((acc, summary) => acc + summary.total, 0)
                        .toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {calculateAgentSummary()
                        .reduce((acc, summary) => acc + summary.received, 0)
                        .toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {calculateAgentSummary()
                        .reduce(
                          (acc, summary) => acc + summary.companyReceived,
                          0
                        )
                        .toLocaleString()}
                    </StyledTableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>

            {/* Detailed Tables for each Agent */}
            <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
              รายละเอียดแต่ละ Agent
            </Typography>
            {filteredRows.map((agentData, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Agent: {agentData.agent}
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>ค่ายเกมส์</StyledTableCell>
                        <StyledTableCell align="right">ยอดรู้</StyledTableCell>
                        <StyledTableCell align="right">
                          ยอดบริษัท
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          ยอดที่ใช้
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          ยอดที่ได้รับ
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          ยอดที่บริษัทได้รับ
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {agentData.games.map((row, gameIndex) => (
                        <StyledTableRow key={gameIndex}>
                          <StyledTableCell>{row.game}</StyledTableCell>
                          <StyledTableCell align="right">
                            {row.percentage}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.commission}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.total.toLocaleString()}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.received.toLocaleString()}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.companyReceived.toLocaleString()}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <StyledTableCell colSpan={3} align="right">
                          รวม
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {agentData.games
                            .reduce((acc, row) => acc + row.total, 0)
                            .toLocaleString()}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {agentData.games
                            .reduce((acc, row) => acc + row.received, 0)
                            .toLocaleString()}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {agentData.games
                            .reduce((acc, row) => acc + row.companyReceived, 0)
                            .toLocaleString()}
                        </StyledTableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}

export default ReportGuardHolding;
