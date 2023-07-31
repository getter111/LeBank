import { grey, orange } from "@mui/material/colors";

export const customTheme = {
  palette: {
    primary: {
      main: "#FF9900", // Orange color
    },
    secondary: {
      main: "#292929", // Dark grey color
    },
    text: {
      primary: "#FFFFFF", // Light text color
      secondary: "#000000", // Dark text color
    },
  },

  // styling for <Typography/>
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
      fontWeight: "bold",
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: grey[200],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: grey[300],
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: grey[500],
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 10,
      color: grey[700],
    },
  },
};
