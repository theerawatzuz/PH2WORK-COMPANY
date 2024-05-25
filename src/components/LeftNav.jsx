import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuAppBar from './Nav'

//Icon
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


// import page
import Dashboard from '../pages/Dashboard';
import History from '../pages/History';
import CreateAgent from '../pages/CreateAgent'
import CreateMembers from '../pages/CreateMember'
import ListNameAgent from '../pages/ListNameAgent'
import CopyMember from '../pages/CopyMember'
import LoseWinMembers from '../pages/LoseWinMembers'
import LoseWinProvider from '../pages/LoseWinProvider'


const drawerWidth = 240;

export default function LeftNav() {

  //SetStateMenu
  const [accountOpen, setAccountOpen] = React.useState(false);
  const [manageMemberOpen, setManageMemberOpen] = React.useState(false);
  const [reportOpen, setReportOpen] = React.useState(false);

  //SetDefaultPageDashboard
  const [selectedContent, setSelectedContent] = React.useState('Dashboard');


  //MenuDrawList
  const handleaccountClick = () => {
    setAccountOpen(!accountOpen);
  };

  const handleManageMemberOpen = () => {
    setManageMemberOpen(!manageMemberOpen);
  };

  const handleReportOpen = () => {
    setReportOpen(!reportOpen);
  };

  //Content Select
  const handleMenuClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <MenuAppBar />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleaccountClick}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="บัญชี" />
                {accountOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </ListItemButton>
            </ListItem>
            {accountOpen && (
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick('Dashboard')}>
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ pl: 4 }} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick('History')}>
                    <ListItemText primary="History" />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ pl: 4 }} disablePadding>
                  <ListItemButton>
                    <ListItemText primary="{waiting}" />
                  </ListItemButton>
                </ListItem>
              </List>
            )}

            <ListItem disablePadding>
              <ListItemButton onClick={handleManageMemberOpen}>
                <ListItemIcon>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText primary="Agent" />
                {manageMemberOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </ListItemButton>
            </ListItem>
            {manageMemberOpen && (
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }} disablePadding>
                 <ListItemButton onClick={() => handleMenuClick('CreateAgent')}>
                    <ListItemText primary="Create Agent" />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ pl: 4 }} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick('CreateMembers')}>
                    <ListItemText primary="Create Member" />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ pl: 4 }} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick('ListNameAgent')}>
                    <ListItemText primary="List Name Agent" />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ pl: 4 }} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick('CopyMember')}>
                    <ListItemText primary="Copy Member" />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ pl: 4 }} disablePadding>
                  <ListItemButton>
                    <ListItemText primary="{waiting}" />
                  </ListItemButton>
                </ListItem>
              </List>
            )}

            <ListItem disablePadding>
              <ListItemButton onClick={handleReportOpen}>
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="รายงาน" />
                {reportOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </ListItemButton>
            </ListItem>
            {reportOpen && (
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick('LoseWinMembers')}>
                    <ListItemText primary="Lose/win Members" />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ pl: 4 }} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick('LoseWinProvider')}>
                    <ListItemText primary="Lose/win Provider" />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ pl: 4 }} disablePadding>
                  <ListItemButton>
                    <ListItemText primary="{waiting}" />
                  </ListItemButton>
                </ListItem>
              </List>
            )}
            
          </List>
        </Box>
      </Drawer>

      {/* Page Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 , bgcolor: '#fafbfb', height: '100vh'}}>
        <Toolbar />
        {selectedContent === 'Dashboard' && <Dashboard />}
        {selectedContent === 'History' && <History />}
        {selectedContent === 'CreateAgent' && <CreateAgent />}
        {selectedContent === 'CreateMembers' && <CreateMembers />}
        {selectedContent === 'ListNameAgent' && <ListNameAgent />}
        {selectedContent === 'CopyMember' && <CopyMember />}
        {selectedContent === 'LoseWinMembers' && <LoseWinMembers />}
        {selectedContent === 'LoseWinProvider' && <LoseWinProvider />}
      </Box>
    </Box>
  );
}
