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
import React, { useState } from "react";
import FlexBox from "./FlexBox";

{
  /*passing the state setter and state itself allows for sync of state btwn parent and child component*/
}
const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
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
        <FlexBox sx={{ background: "red" }}>
          {/* open/close the sidebar view, re-renders both child and parent*/}
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon sx={{ color: "white", fontSize: "25px" }} />
          </IconButton>
          {/* <FlexBox sx={{ background: "yellow" }}>
            <Typography variant="h2" sx={{ paddingLeft: "2rem" }}>
              My Ass
            </Typography>
          </FlexBox> */}
        </FlexBox>

        {/* right */}
        <FlexBox gap="1.5rem" sx={{ background: "red" }}>
          <IconButton onClick={() => console.log("open settings")}>
            <SettingsOutlined sx={{ color: "white", fontSize: "25px" }} />
          </IconButton>
        </FlexBox>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
