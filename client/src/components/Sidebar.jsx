import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import HelpIcon from "@mui/icons-material/Help";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBox from "./FlexBox";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Accountant",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Add Account",
    icon: <AccountBalanceIcon />,
  },
  {
    text: "Manage Account",
    icon: <ManageAccountsIcon />,
  },

  { text: "Contact Me", icon: null },
  {
    text: "LinkedIn",
    icon: <LinkedInIcon />,
  },
  {
    text: "Email",
    icon: <EmailIcon />,
  },
  {
    text: "Github",
    icon: <GitHubIcon />,
  },
  {
    text: "About",
    icon: <HelpIcon />,
  },
];

const Sidebar = ({
  //user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation(); //to map icon to current location
  const [active, setActive] = useState(""); //keep track of current URL
  const navigate = useNavigate(); //when icon is clicked navigate
  const theme = useTheme();

  //when pathname changes we change active to the current URL
  //we use substring 1 because it returns /pathname (we dont want the "/")
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {/*if statement checking if sidebar open lol*/}
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              //styles the inner content of paper component
              backgroundColor: theme.palette.primary.main,
              boxSizing: "border-box", //total size with margin/padding
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBox>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ color: "black" }}
                  >
                    FinanaceHub
                  </Typography>
                </Box>

                {/*adds a close button on mobile screens*/}
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBox>
            </Box>

            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 3rem", color: "black" }}
                    >
                      {text}
                    </Typography>
                  );
                }

                const lcText = text.toLowerCase().replaceAll(" ", "");

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? "orange"
                            : theme.palette.primary.main,
                        color:
                          active === lcText
                            ? "black"
                            : theme.palette.secondary.main,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? "black"
                              : theme.palette.secondary.main,
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/*profile area below sidebar*/}
          <Box position="absolute" bottom="2rem" sx={{ color: "black" }}>
            <Divider />
            <FlexBox gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={"https://reactjs.org/logo-og.png"}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.9rem">
                  Username
                </Typography>
              </Box>
              <IconButton
                onClick={() => console.log("open settings")}
                sx={{ margin: "0px", padding: "0px" }}
              >
                <SettingsOutlined sx={{ fontSize: "25px" }} />
              </IconButton>
            </FlexBox>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
