import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { getUserDataWithName } from "./state/api.js";
import { customTheme } from "./theme.js";
import Auth from "./views/Auth/index.jsx";
import BankViews from "./views/Bankviews/index.jsx";
import Dashboard from "./views/dashboard/index.jsx";
import Layout from "./views/layout/index.jsx";

function App() {
  const [cookies, setCookies] = useCookies(["access_token"]);

  // Check if the cookie exists, false meaning: no token exist
  const hasCookies = !!cookies.access_token;
  // console.log(hasCookies);
  //default states
  const defaultId = "64bad48e38f3cbbee41def65";
  const defaultUser = "User";

  const [userId, setUserId] = useState(defaultId);
  const [user, setUser] = useState(defaultUser); //get username for plaid link
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const theme = useMemo(() => createTheme(customTheme), []);

  //1. we only update default values if cookies is changed. so if user logs in or out, but no change if page refresh since cookies is still active!

  //2. we can store the cookies in our user database and use that to reference to the current user signed in

  //3. store the username in localstorage and call the getuser(username) to set data
  useEffect(() => {
    const loadCurrentUser = async (cookies) => {
      try {
        if (cookies === "" || !cookies.access_token) {
          console.log("no cookes");
          setUserId(defaultId);
          setUser(defaultUser);
        } else {
          const name = localStorage.getItem("username");
          const response = await getUserDataWithName(name);
          setUserId(response.data._id);
          setUser(response.data.username);
          console.log("yes cookies");
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadCurrentUser(cookies);
  }, [cookies]);

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/*nav and side bar will be on every child element*/}
            <Route
              element={
                <Layout
                  userId={userId}
                  setUserId={setUserId}
                  setUser={setUser}
                  currentPage={currentPage}
                />
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/connect-a-bank-account"
                element={<BankViews user={user} />}
              />
              <Route
                path="/manage-account"
                element={<Auth setUser={setUser} setUserId={setUserId} />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
{
  /* <Navigate to="/dashboard" replace /> */
}
