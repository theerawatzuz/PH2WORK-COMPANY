import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupIcon from "@mui/icons-material/Group";
import CasinoIcon from "@mui/icons-material/Casino";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const drawerWidth = 240;

const ToggleButton = styled("div")(({ theme, isExpanded }) => ({
  position: "absolute",
  left: isExpanded ? drawerWidth : 64,
  top: "72px",
  width: 32,
  height: 32,
  backgroundColor: theme.palette.primary.main,
  borderRadius: "0 16px 16px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: theme.palette.common.white,
  boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  transition: theme.transitions.create(["left"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  zIndex: 1300,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    width: 36,
  },
}));

export default function LeftNav({ isExpanded, setIsExpanded }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [reportOpen, setReportOpen] = useState(false);

  const menuItems = [
    { text: "แดชบอร์ด", icon: <DashboardIcon />, path: "/app/dashboard" },
    {
      text: "ประวัติ",
      icon: <HistoryIcon />,
      disabled: true,
      path: "/app/history",
    },
    {
      text: "รายชื่อ Master",
      icon: <FormatListBulletedIcon />,
      path: "/app/list-master",
    },
    {
      text: "จัดการ Master",
      icon: <ManageAccountsIcon />,
      path: "/app/manage-master",
    },

    {
      text: "สร้าง Master",
      icon: <PersonAddIcon />,
      path: "/app/create-master",
    },
  ];

  const reportItems = [
    { text: "รายงาน Master", path: "/app/reports/lose-win-provider" },
    { text: "รายงาน Billing", path: "/app/reports/billing" },
  ];

  return (
    <Box sx={{ position: "relative" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isExpanded ? drawerWidth : 64,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isExpanded ? drawerWidth : 64,
            boxSizing: "border-box",
            transition: "width 0.3s ease",
            overflowX: "hidden",
            border: "none",
            zIndex: 1200,
          },
        }}
      >
        <Toolbar />

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: (theme) =>
                      `${theme.palette.primary.main}14`,
                    "&:hover": {
                      backgroundColor: (theme) =>
                        `${theme.palette.primary.main}29`,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: (theme) =>
                      location.pathname === item.path
                        ? theme.palette.primary.main
                        : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isExpanded && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setReportOpen(!reportOpen)}
              selected={location.pathname.includes("/app/reports")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: (theme) => `${theme.palette.primary.main}14`,
                  "&:hover": {
                    backgroundColor: (theme) =>
                      `${theme.palette.primary.main}29`,
                  },
                },
              }}
            >
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              {isExpanded && (
                <>
                  <ListItemText primary="รายงาน" />
                  {reportOpen ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </ListItemButton>
          </ListItem>

          {isExpanded && (
            <Collapse in={reportOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {reportItems.map((item) => (
                  <ListItemButton
                    key={item.text}
                    sx={{
                      pl: 4,
                      "&.Mui-selected": {
                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main}14`,
                        "&:hover": {
                          backgroundColor: (theme) =>
                            `${theme.palette.primary.main}29`,
                        },
                      },
                    }}
                    selected={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                  >
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </List>
      </Drawer>

      <ToggleButton
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </ToggleButton>
    </Box>
  );
}
