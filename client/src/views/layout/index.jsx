import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"; //for template layout
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getUserData } from "../../state/api.js";
//TODO: CREATE API ENDPOINTS. SO FRONTEND CAN ACCESS DATA

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState([]); //data of our user

  //some initial data for our website
  useEffect(() => {
    const firstLoadData = () => {
      //pass id into helper function to get user data
      getUserData("63701cc1f03239c72c00017f")
        .then((result) => {
          setUserData(result.data);
          console.log(userData);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    firstLoadData();
  }, []);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        //user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          //user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet /> {/* renders child components below our Layout component */}
      </Box>
    </Box>
  );
};

export default Layout;
