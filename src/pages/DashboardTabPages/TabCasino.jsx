import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

function TabCasino() {
  const [rows, setRows] = useState([
    {
      id: "all",
      name: "ผู้ให้บริการทั้งหมด",
      enabled: true,
      holding: "0",
      free: "0",
      takeRest: "0",
      forceHolding: "0",
      commission: "0",
    },
    {
      id: "QM",
      name: "QM",
      enabled: true,
      holding: "88",
      free: "0",
      takeRest: "0",
      forceHolding: "0",
      commission: "0",
    },
    {
      id: "PG (OFFICE)",
      name: "PG (OFFICE)",
      enabled: false,
      holding: "0",
      free: "0",
      takeRest: "0",
      forceHolding: "0",
      commission: "2",
    },
    {
      id: "PG (AMB TH)",
      name: "PG (AMB TH)",
      enabled: true,
      holding: "86",
      free: "0",
      takeRest: "0",
      forceHolding: "0",
      commission: "0",
    },
    {
      id: "JILI",
      name: "JILI",
      enabled: true,
      holding: "86",
      free: "0",
      takeRest: "0",
      forceHolding: "0",
      commission: "0",
    },
    {
      id: "JOKER",
      name: "JOKER",
      enabled: false,
      holding: "0",
      free: "0",
      takeRest: "0",
      forceHolding: "0",
      commission: "0",
    },
  ]);

  const handleSwitchChange = (id) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, enabled: !row.enabled } : row
      )
    );
  };

  const handlePercentChange = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const percentOptions = Array.from({ length: 101 }, (_, i) => i.toString());

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto", boxShadow: 2 }}>
      <Table sx={{ minWidth: "100%", borderCollapse: "collapse" }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "grey.800", color: "white" }}>
            <TableCell
              sx={{
                fontWeight: "bold",
                border: 1,
                borderColor: "grey.300",
                color: "white",
              }}
            >
              ผู้ให้บริการ
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                border: 1,
                borderColor: "grey.300",
                color: "white",
              }}
            >
              สถานะ
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                border: 1,
                borderColor: "grey.300",
                color: "white",
              }}
            >
              ถือสู้
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                border: 1,
                borderColor: "grey.300",
                color: "white",
              }}
            >
              ปล่อย
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                border: 1,
                borderColor: "grey.300",
                color: "white",
              }}
            >
              เอาส่วนที่เหลือ
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                border: 1,
                borderColor: "grey.300",
                color: "white",
              }}
            >
              บังคับถือ
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                border: 1,
                borderColor: "grey.300",
                color: "white",
              }}
            >
              คอมมิชชั่น
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ "&:hover": { bgcolor: "grey.100" } }}>
              <TableCell sx={{ border: 1, borderColor: "grey.300" }}>
                {row.name}
              </TableCell>
              <TableCell sx={{ border: 1, borderColor: "grey.300" }}>
                <Switch
                  checked={row.enabled}
                  onChange={() => handleSwitchChange(row.id)}
                  color="primary"
                />
              </TableCell>
              {[
                "holding",
                "free",
                "takeRest",
                "forceHolding",
                "commission",
              ].map((field) => (
                <TableCell
                  key={field}
                  sx={{ border: 1, borderColor: "grey.300" }}
                >
                  <Select
                    value={row[field]}
                    onChange={(e) =>
                      handlePercentChange(row.id, field, e.target.value)
                    }
                    disabled={!row.enabled}
                    sx={{ width: "100%" }}
                  >
                    {percentOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}%
                      </MenuItem>
                    ))}
                  </Select>
                  {field === "holding" && parseInt(row[field]) > 0 && (
                    <Typography variant="caption" sx={{ color: "grey.500" }}>
                      Your % got forced to {row[field]}
                    </Typography>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TabCasino;
