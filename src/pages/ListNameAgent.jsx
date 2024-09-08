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
import { Divider } from "@mui/material";

//icon
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CachedIcon from "@mui/icons-material/Cached";
import AccountCircle from "@mui/icons-material/AccountCircle";

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

function createData(order, agentName, link, website, note) {
  return { order, agentName, link, website, note };
}

const rows = [
  createData(
    1,
    "123Bet",
    "https://ph-work-userpagem.vercel.app/",
    "123bet.live",
    ""
  ),
  createData(2, "1xxx1", "https://example1.com", "1xxx1.live", ""),
  createData(3, "xxx2", "https://example2.com", "xxx2.live", ""),
  createData(4, "xxx3", "https://example3.com", "xxx3.live", ""),
  createData(5, "xxx4", "https://example4.com", "xxx4.live", ""),
  createData(6, "bet365", "https://example5.com", "bet365.live", ""),
  createData(7, "winner55", "https://example6.com", "winner55.live", ""),
  createData(8, "luckybet", "https://example7.com", "luckybet.live", ""),
  createData(9, "goldenslot", "https://example8.com", "goldenslot.live", ""),
  createData(10, "sbobet", "https://example9.com", "sbobet.live", ""),
  createData(11, "w88", "https://example10.com", "w88.live", ""),
  createData(12, "fun88", "https://example11.com", "fun88.live", ""),
  createData(13, "m88", "https://example12.com", "m88.live", ""),
  createData(14, "188bet", "https://example13.com", "188bet.live", ""),
  createData(15, "12bet", "https://example14.com", "12bet.live", ""),
];
function ListNameAgent({ id, active, onBack }) {
  const [activeButtons, setActiveButtons] = useState(rows.map(() => "เปิด"));

  const handleButtonClick = (index, value) => {
    const newActiveButtons = [...activeButtons];
    newActiveButtons[index] = value;
    setActiveButtons(newActiveButtons);
  };

  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    setPlayerData({
      id: id,
      active: active,
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
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
            <Typography
              variant="h5"
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
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 2,
                color: "green",
                fontWeight: "bold",
              }}
            >
              Active {playerData.active} Agent
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            id="outlined-basic"
            label="กรอกชื่อ Agent"
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
                <StyledTableCell align="center">ลำดับ</StyledTableCell>
                <StyledTableCell align="center">ชื่อ Agent</StyledTableCell>
                <StyledTableCell align="center">Link</StyledTableCell>
                <StyledTableCell align="center">ชื่อเว็บไซต์</StyledTableCell>
                <StyledTableCell align="center">หมายเหตุ</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.order}>
                  <StyledTableCell align="center">{row.order}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.agentName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <a
                      href={row.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {row.link}
                    </a>
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.website}</StyledTableCell>
                  <StyledTableCell align="left">{row.note}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default ListNameAgent;
