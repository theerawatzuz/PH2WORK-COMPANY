import { Box } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Divider } from '@mui/material';
import Button from '@mui/material/Button';


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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            <Button size="small" variant="contained" color="success" startIcon={<KeyIcon />} sx={{mx:1}}>เปลี่ยนพาสโค้ด</Button>
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
        <Box sx={{width: '100%', boxShadow: 1 , mt: 2, p: 2}}>
        <Tabs value={value} onChange={handleChange}>
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
        </Box>
      </Box>

    </Box>
  )
}

export default Dashboard
