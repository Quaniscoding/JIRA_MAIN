//side bar of personal settings
import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Input,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Stack,
  Collapse,
  GlobalStyles,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { closeSidebar } from "../../utils/utils";
import ColorModeSelect from "../shared-theme/ColorModeSelect.jsx";
import { useLocation, useNavigate } from 'react-router-dom';
import { DATA_PROJECT, DATA_USER, USER_LOGIN } from './../../utils/constant';
export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [reset, setReset] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const getSelectedItem = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'dashboard';
      case '/orders':
        return 'orders';
      case '/messages':
        return 'messages';
      case '/tasks':
        return 'tasks';
      case '/users':
        return 'users';
      case '/support':
        return 'support';
      case '/settings':
        return 'settings';
      default:
        return 'home';
    }
  };
  const handleLogout = () => {
    setReset(reset + 1);
    localStorage.removeItem(DATA_USER);
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(DATA_PROJECT);
    navigate("/login");
  };
  const selectedItem = getSelectedItem();
  return (
    <Box
      className='Sidebar'
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 9999,
        height: "100vh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.default",
      }}
    >
      <GlobalStyles
        styles={theme => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className='Sidebar-overlay'
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "rgba(50 56 62 / 0.25)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <IconButton color='primary' size='small'>
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography variant='h6'>Deeplynet.</Typography>
        <ColorModeSelect sx={{ ml: "auto" }} />
      </Box>
      <Input
        startAdornment={<SearchRoundedIcon />}
        placeholder='Search'
        fullWidth
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: "auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton selected={selectedItem === 'home'} href="/">
              <ListItemIcon>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Home'
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="/dashboard" selected={selectedItem === 'dashboard'}>
              <ListItemIcon>
                <DashboardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component='a' href='/orders'>
              <ListItemIcon>
                <ShoppingCartRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Orders' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemIcon>
                <AssignmentRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Tasks' />
              <KeyboardArrowDownIcon
                sx={{
                  transform: open ? "rotate(180deg)" : "none",
                  transition: "transform 0.3s",
                }}
              />
            </ListItemButton>
          </ListItem>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem sx={{ pl: 2 }}>
                <ListItemButton>
                  <ListItemText primary='All tasks' />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ pl: 2 }}>
                <ListItemButton>
                  <ListItemText primary='Backlog' />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ pl: 2 }}>
                <ListItemButton>
                  <ListItemText primary='In progress' />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ pl: 2 }}>
                <ListItemButton>
                  <ListItemText primary='Done' />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
          <ListItem disablePadding>
            <ListItemButton component='a' href='/messages'>
              <ListItemIcon>
                <QuestionAnswerRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Messages' />
              <Chip label='4' color='primary' size='small' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpen2(!open2)}>
              <ListItemIcon>
                <GroupRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Users' />
              <KeyboardArrowDownIcon
                sx={{
                  transform: open2 ? "rotate(180deg)" : "none",
                  transition: "transform 0.3s",
                }}
              />
            </ListItemButton>
          </ListItem>
          <Collapse in={open2} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem sx={{ pl: 2 }}>
                <ListItemButton>
                  <ListItemText primary='My profile' />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ pl: 2 }}>
                <ListItemButton>
                  <ListItemText primary='Create a new user' />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ pl: 2 }}>
                <ListItemButton>
                  <ListItemText primary='Roles & permission' />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SupportRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Support' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItemButton>
          </ListItem>
        </List>
        <Box
          sx={{ p: 1, bgcolor: "warning.main", color: "warning.contrastText" }}
        >
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='body2'>Used space</Typography>
            <IconButton size='small'>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Typography variant='caption'>
            Your team has used 80% of your available space. Need more?
          </Typography>
          <LinearProgress variant='determinate' value={80} sx={{ my: 1 }} />
          <Button variant='contained' color='primary' fullWidth>
            Upgrade plan
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Avatar
          src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286'
          sx={{ border: "1px solid", width: 32, height: 32 }}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant='subtitle2' fontWeight='bold'>
            Siriwat K.
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            siriwatk@test.com
          </Typography>
        </Box>
        <IconButton size='small' color='default' onClick={()=>handleLogout()}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
