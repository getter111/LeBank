import {
  ArrowDropDownOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import FlexBox from "./FlexBox";
{
  /*passing the state setter and state itself allows for sync of state btwn parent and child component*/
}
const Navbar = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  setUserId,
  setUser,
  currentPage,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("open settings");
  };
  const handleClose = () => setAnchorEl(null);

  const defaultUser = {
    id: "64bad48e38f3cbbee41def65",
    name: "User",
  };
  //resets cookies and userId
  const logout = () => {
    handleClose();
    setCookies("access_token", "");
    setUserId(defaultUser.id);
    setUser(defaultUser.name);
    window.localStorage.clear();
    navigate("/manage-account");
  };
  const login = () => {
    handleClose();
    navigate("/manage-account");
  };

  return (
    <AppBar
      sx={{
        position: "static",
        height: "4rem",
        background: "#3B374A",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* left */}
        <FlexBox>
          {/* open/close the sidebar view, re-renders both child and parent*/}
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <MenuIcon
              sx={{ color: theme.palette.text.primary, fontSize: "25px" }}
            />
          </IconButton>

          <FlexBox>
            <Typography variant="h3" sx={{ paddingLeft: "1rem" }}>
              {currentPage}
            </Typography>
          </FlexBox>
        </FlexBox>

        {/* right */}
        <FlexBox gap="1.5rem">
          <IconButton
            onClick={handleClick}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <SettingsOutlined
              sx={{ color: theme.palette.text.primary, fontSize: "25px" }}
            />
          </IconButton>

          <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
            <MenuItem
              sx={{ color: theme.palette.text.secondary }}
              onClick={handleClose}
            >
              Profile
            </MenuItem>
            <MenuItem
              sx={{ color: theme.palette.text.secondary }}
              onClick={handleClose}
            >
              Settings
            </MenuItem>
            {!cookies.access_token ? (
              <MenuItem
                sx={{ color: theme.palette.text.secondary }}
                onClick={login}
              >
                Login
              </MenuItem>
            ) : (
              <MenuItem
                sx={{ color: theme.palette.text.secondary }}
                onClick={logout}
              >
                Logout
              </MenuItem>
            )}
          </Menu>
        </FlexBox>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
