import React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

import TabProviders from "./DashboardTabPages/TabProviders";

function HoldTabs({ onPercentagesChange }) {
  const [value, setValue] = React.useState("1");
  const [nestedValue, setNestedValue] = React.useState("1.1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleNestedChange = (event, newValue) => {
    setNestedValue(newValue);
  };

  const handlePercentagesChange = (percentages) => {
    onPercentagesChange?.(percentages);
  };

  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: 1,
        mt: -1,
        mb: 5,
        px: 2,
        pb: 2,
        bgcolor: "white",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Subject Tab">
            <Tab label="ยอดถือสู้" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ mt: 2, p: 2 }}>
          <TabProviders onPercentagesChange={handlePercentagesChange} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default HoldTabs;
