import React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

import TabSport from "./DashboardTabPages/TabSport";
import TabCasino from "./DashboardTabPages/TabCasino";
import TabSlot from "./DashboardTabPages/TabSlot";

function MainTabs() {
  const [value, setValue] = React.useState("1");
  const [nestedValue, setNestedValue] = React.useState("1.1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleNestedChange = (event, newValue) => {
    setNestedValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", boxShadow: 1, mt: -1, mb: 5, px: 2, pb: 2 ,bgcolor: "white",}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Subject Tab">
            <Tab label="กีฬา" value="1" />
            <Tab label="คาสิโน" value="2" />
            <Tab label="สล็อต" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ mt: 0, p: 0 }}>
          <TabContext value={nestedValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleNestedChange} aria-label="Child Tab">
                <Tab label="QM" value="1.1" />
                <Tab label="PG (Office)" value="1.2" />
                <Tab label="PG (AMB TH)" value="1.3" />
                <Tab label="JILI" value="1.4" />
                <Tab label="Joker" value="1.5" />
              </TabList>
            </Box>
            <TabPanel value="1.1" sx={{ mt: 2, p: 0 }}>
              <TabSport />
            </TabPanel>
            <TabPanel value="1.2" sx={{ mt: 2, p: 0 }}>
              <TabSport />
            </TabPanel>
            <TabPanel value="1.3" sx={{ mt: 2, p: 0 }}>
              <TabSport />
            </TabPanel>
            <TabPanel value="1.4" sx={{ mt: 2, p: 0 }}>
              <TabSport />
            </TabPanel>
            <TabPanel value="1.5" sx={{ mt: 2, p: 0 }}>
              <TabSport />
            </TabPanel>
          </TabContext>
        </TabPanel>
        <TabPanel value="2"><TabCasino/></TabPanel>
        <TabPanel value="3"><TabSlot/></TabPanel>
      </TabContext>
    </Box>
  );
}

export default MainTabs;
