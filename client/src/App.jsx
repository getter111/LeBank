import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { customTheme } from "./theme.js";
import Auth from "./views/Auth/index.jsx";
import BankViews from "./views/Bankviews/index.jsx";
import Dashboard from "./views/dashboard/index.jsx";
import Layout from "./views/layout/index.jsx";

function App() {
  const [userId, setUserId] = useState("64bad48e38f3cbbee41def65");
  const [user, setUser] = useState("User"); //get username for plaid link
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const theme = useMemo(() => createTheme(customTheme), []);
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
