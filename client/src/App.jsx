import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { customTheme } from "./theme.js";
import Dashboard from "./views/dashboard/index";
import Layout from "./views/layout/index";

function App() {
  const theme = useMemo(() => createTheme(customTheme), []);
  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/*nav and side bar will be on every child element*/}
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
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
