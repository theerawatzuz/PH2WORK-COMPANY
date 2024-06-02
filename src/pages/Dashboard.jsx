import { Box } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { Divider } from '@mui/material';
import Button from '@mui/material/Button';

//Tab
import TabSport1 from './DashboardTabPages/TabSport1'


//icon
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import KeyIcon from '@mui/icons-material/Key';

//State
const user = "ผู้ใช้งาน"
const userStatus = "Enabled"

//amount
const currentAmount = "0.00"

const Dashboard = () => {
  const [value, setValue] = React.useState('1');
  const [nestedValue, setNestedValue] = React.useState('1.1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNestedChange = (event, newValue) => {
    setNestedValue(newValue);
  };

  return (
    <Box sx={{ gap: 3, bgcolor:'background.paper'}}>
      <Typography variant="h4">
        DASHBOARD
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
        {/* HEAD */}
        <Box sx={{boxShadow: 1 , mt: 2, p: 2}}>
          <Box sx={{ display: 'flex', alignItems: 'center',  gap: 1}}>
              <AccountCircle/>
              {user}
              <Divider orientation="vertical" flexItem sx={{ height: 28, alignSelf: 'center', mx: 1, bgcolor: 'white' }} />
            
            <Button size="small" variant="contained" startIcon={<PasswordIcon />} sx={{mx:1}}>เปลี่ยนรหัส</Button>
            {/* <Button size="small" variant="contained" color="success" startIcon={<KeyIcon />} sx={{mx:1}}>เปลี่ยนพาสโค้ด</Button> */}
            <Typography variant="body1">
                สถานะ :
              </Typography>
            <Typography variant="body1" color="green">
                <b>{userStatus}</b>
              </Typography>
            {/* <Typography variant="body1" color="red">
                <b>{userStatus}</b>
              </Typography> */}
          </Box>
 
          <Box sx={{mt:2, p:2 , bgcolor: "#bbdefb", borderRadius: '12px', display: 'flex'}}>
            <Box sx={{display: "flex", alignItems: 'center', width: 6/12}}>
              <Typography variant="body1" >
                <b>THB</b>
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ height: 3/4, width: 2,  alignSelf: 'center', mx: 1, mr:2, bgcolor: 'black' }} />
              <Box sx={{ width:1/3}}>
              <Typography variant="body1">
                <b>ยอดเงิน</b>
                
              </Typography>
              <Typography variant="body1">
                <b>{currentAmount}</b>
                
              </Typography>
              </Box>
              <Box sx={{ width:1/3}}>
              <Typography variant="body1">
                <b>ยอดเงินของคนข้างล่าง</b>
                
              </Typography>
              <Typography variant="body1">
                <b>{currentAmount}</b>
                
              </Typography>
              </Box>
              <Box sx={{ width:1/3}}>
              <Typography variant="body1">
                <b>แทง</b>
                
              </Typography>
              <Typography variant="body1">
                <b>{currentAmount}</b>
                
              </Typography>
              </Box>
              </Box>

            <Box sx={{display: "flex", alignItems: 'center', width: 6/12}}>
              <Divider orientation="vertical" flexItem sx={{ height: 3/4, width: 2,  alignSelf: 'center', mx: 1, mr:2, bgcolor: 'black' }} />
              <Box sx={{ width:1/3}}>
              <Typography variant="body1">
                <b>ยอดรวมทั้งหมด</b>
                
              </Typography>
              <Box>
              <Typography variant="body1">
                <b>ฝาก : {currentAmount}</b>
              </Typography>
              <Typography variant="body1">
                <b>ถอน : {currentAmount}</b>
              </Typography>
              <Typography variant="body1">
                <b>กำไร : {currentAmount}</b>
              </Typography>
              </Box>
         
              </Box>
              <Box sx={{ width:1/3}}>
              <Typography variant="body1">
                <b>ยอดรายเดือน</b>
                
              </Typography>
              <Box>
              <Typography variant="body1">
                <b>ฝาก : {currentAmount}</b>
              </Typography>
              <Typography variant="body1">
                <b>ถอน : {currentAmount}</b>
              </Typography>
              <Typography variant="body1">
                <b>กำไร : {currentAmount}</b>
              </Typography>
              </Box>
              </Box>
              <Box sx={{ width:1/3}}>
              <Typography variant="body1">
                <b>ยอดวันนี้</b>
                
              </Typography>
              <Box>
              <Typography variant="body1">
                <b>ฝาก : {currentAmount}</b>
              </Typography>
              <Typography variant="body1">
                <b>ถอน : {currentAmount}</b>
              </Typography>
              <Typography variant="body1">
                <b>กำไร : {currentAmount}</b>
              </Typography>
              </Box>
              </Box>
 
              </Box>
          </Box>

    
        </Box>
        {/* BODY */}
        <Box sx={{ width: '100%', boxShadow: 1, mt: -1, p: 2 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{mt: 0, p: 0}}>
          <TabContext value={nestedValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
              <TabList onChange={handleNestedChange} aria-label="lab API tabs example">
                <Tab label="Item 1.1" value="1.1" />
                <Tab label="Item 1.2" value="1.2" />
                <Tab label="Item 1.3" value="1.3" />
              </TabList>
            </Box>
            <TabPanel value="1.1" sx={{mt: 2, p: 0}}><TabSport1/></TabPanel>
            <TabPanel value="1.2">Item 1.2</TabPanel>
            <TabPanel value="1.3">Item 1.3</TabPanel>
          </TabContext>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
        </Box>
      </Box>

    </Box>
  )
}

export default Dashboard
