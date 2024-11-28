import React, { useState, useEffect } from "react";
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

import axiosInstance from "../../utils/axiosInstance";

function TabProviders({ onPercentagesChange }) {
  const [providers, setProviders] = useState([]);
  const [enabledStates, setEnabledStates] = useState({});
  const [percentageValues, setPercentageValues] = useState({});

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    axiosInstance
      .get("/providers", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setProviders(response.data.data);
        const initialEnabled = {};
        const initialPercentages = {};
        response.data.data.forEach((provider) => {
          initialEnabled[provider.id] = false;
          initialPercentages[provider.id] = "0";
        });
        setEnabledStates(initialEnabled);
        setPercentageValues(initialPercentages);
      })
      .catch((error) => {
        console.error("Error fetching providers:", error);
      });
  }, []);

  const updatePercentages = (
    newEnabledStates = null,
    newPercentageValues = null
  ) => {
    const currentEnabled = newEnabledStates || enabledStates;
    const currentPercentages = newPercentageValues || percentageValues;

    const percentages = providers
      .filter((provider) => currentEnabled[provider.id])
      .map((provider) => ({
        id: provider.id,
        enabled: currentEnabled[provider.id],
        percentage: parseFloat(currentPercentages[provider.id]) / 100,
      }));

    onPercentagesChange(percentages);
  };

  const handleSwitchChange = (id) => {
    const newEnabledStates = {
      ...enabledStates,
      [id]: !enabledStates[id],
    };
    setEnabledStates(newEnabledStates);
    updatePercentages(newEnabledStates);
  };

  const handlePercentChange = (id, value) => {
    const newPercentageValues = {
      ...percentageValues,
      [id]: value,
    };
    setPercentageValues(newPercentageValues);
    updatePercentages(null, newPercentageValues);
  };

  const getPercentOptions = (maxPercentage) => {
    const max = Math.floor(maxPercentage * 100);
    return Array.from({ length: max + 1 }, (_, i) => i.toString());
  };

  const handleAllSwitchChange = (checked) => {
    const newEnabledStates = {};
    providers.forEach((provider) => {
      newEnabledStates[provider.id] = checked;
    });
    setEnabledStates(newEnabledStates);
    updatePercentages(newEnabledStates);
  };

  const handleAllPercentChange = (value) => {
    const newPercentageValues = {};
    providers.forEach((provider) => {
      const maxPercent = Math.floor(provider.percentage.max * 100);
      newPercentageValues[provider.id] =
        parseInt(value) > maxPercent ? maxPercent.toString() : value;
    });
    setPercentageValues(newPercentageValues);
    updatePercentages(null, newPercentageValues);
  };

  const minMaxPercentage =
    providers.length > 0
      ? Math.min(...providers.map((p) => p.percentage.max))
      : 1;

  const allSelectValue =
    providers.length > 0 && Object.values(percentageValues).length > 0
      ? Object.values(percentageValues)[0]
      : "0";

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
          </TableRow>
          <TableRow sx={{ bgcolor: "grey.100" }}>
            <TableCell sx={{ border: 1, borderColor: "grey.300" }}>
              <b>ทั้งหมด</b>
            </TableCell>
            <TableCell sx={{ border: 1, borderColor: "grey.300" }}>
              <Switch
                checked={
                  Object.values(enabledStates).length > 0 &&
                  Object.values(enabledStates).every((state) => state)
                }
                onChange={(e) => handleAllSwitchChange(e.target.checked)}
                color="primary"
              />
            </TableCell>
            <TableCell sx={{ border: 1, borderColor: "grey.300" }}>
              <Select
                value={allSelectValue}
                onChange={(e) => handleAllPercentChange(e.target.value)}
                disabled={!Object.values(enabledStates).some((state) => state)}
                sx={{ width: "100%" }}
              >
                {getPercentOptions(minMaxPercentage).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}%
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {providers.map((provider) => (
            <TableRow
              key={provider.id}
              sx={{ "&:hover": { bgcolor: "grey.100" } }}
            >
              <TableCell sx={{ border: 1, borderColor: "grey.300" }}>
                {provider.title}
              </TableCell>
              <TableCell sx={{ border: 1, borderColor: "grey.300" }}>
                <Switch
                  checked={enabledStates[provider.id] || false}
                  onChange={() => handleSwitchChange(provider.id)}
                  color="primary"
                />
              </TableCell>
              <TableCell sx={{ border: 1, borderColor: "grey.300" }}>
                <Select
                  value={percentageValues[provider.id] || "0"}
                  onChange={(e) =>
                    handlePercentChange(provider.id, e.target.value)
                  }
                  disabled={!enabledStates[provider.id]}
                  sx={{ width: "100%" }}
                >
                  {getPercentOptions(provider.percentage.max).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}%
                    </MenuItem>
                  ))}
                </Select>
                {parseInt(percentageValues[provider.id] || 0) >
                  provider.percentage.max * 100 && (
                  <Typography variant="caption" sx={{ color: "grey.500" }}>
                    ค่าสูงสุดที่ตั้งได้คือ {provider.percentage.max * 100}%
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TabProviders;
