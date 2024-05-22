import { Box } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography';

import { Divider } from '@mui/material';
import Button from '@mui/material/Button';


//icon
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import KeyIcon from '@mui/icons-material/Key';

//State
const user = "ผู้ใช้งาน"
const userStatus = "Enabled"

const Dashboard = () => {
  return (
    <Box sx={{ gap: 3}}>
      <Typography variant="h4">
        DASHBOARD
      </Typography>
      <Box>
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
          <Box sx={{mt:2, p:2 , bgcolor: "#bbdefb", borderRadius: '12px', display: "flex", alignItems: 'center'}}>
              <Typography variant="body1">
                <b>THB</b>
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ height: 28, width: 2,  alignSelf: 'center', mx: 1, bgcolor: 'black' }} />
            
          </Box>
        </Box>
      </Box>
      
    </Box>
  )
}

export default Dashboard
