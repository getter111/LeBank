import {
  ArrowDropDownOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import FlexBox from "./FlexBox";
{
  /*passing the state setter and state itself allows for sync of state btwn parent and child component*/
}
const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen, setUserId }) => {
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

  //resets cookies and userId
  const logout = () => {
    handleClose();
    setCookies("access_token", "");
    setUserId("64bad48e38f3cbbee41def65");
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
        background: "#37474f",
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
            <MenuIcon sx={{ color: "white", fontSize: "25px" }} />
          </IconButton>

          <FlexBox>
            <Typography variant="h3" sx={{ paddingLeft: "1rem" }}>
              Current Page
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
            <SettingsOutlined sx={{ color: "white", fontSize: "25px" }} />
          </IconButton>

          <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
            <MenuItem sx={{ color: "black" }} onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem sx={{ color: "black" }} onClick={handleClose}>
              Settings
            </MenuItem>
            {!cookies.access_token ? (
              <MenuItem sx={{ color: "black" }} onClick={login}>
                Login
              </MenuItem>
            ) : (
              <MenuItem sx={{ color: "black" }} onClick={logout}>
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
