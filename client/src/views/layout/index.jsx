import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"; //for template layout
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getUserData } from "../../state/api.js";
//TODO: CREATE API ENDPOINTS. SO FRONTEND CAN ACCESS DATA

const Layout = ({ userId, setUserId, setUser, currentPage }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState({}); //data of our user

  useEffect(() => {
    const firstLoadData = async (userId) => {
      try {
        console.log("firstLoadData id = ", userId);
        const result = await getUserData(userId);
        setUserData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    firstLoadData(userId);
  }, [userId]);

  // useEffect(() => {
  //   console.log("updated?");
  //   console.log(userData);
  // }, [userData]);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={userData || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setUserId={setUserId}
      />
      <Box flexGrow={1}>
        <Navbar
          user={userData || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setUserId={setUserId}
          setUser={setUser}
          currentPage={currentPage}
        />
        <Outlet /> {/* renders child components below our Layout component */}
      </Box>
    </Box>
  );
};

export default Layout;
