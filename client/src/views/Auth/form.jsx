import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

export const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  formType,
  onSubmit,
  displayReset,
}) => {
  const theme = useTheme();

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <Grid>
        <Paper
          sx={{
            padding: 7,
            color: theme.palette.text.primary,
            bgcolor: "#878fff",
            height: "69vh",
            width: 500,
            margin: "6rem 8rem",
          }}
          elevation={10}
        >
          <Grid align="center">
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.text.secondary,
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography sx={{ marginTop: "2rem" }} variant="h2">
              {formType}
            </Typography>

            <TextField
              sx={{ marginTop: "2rem" }}
              className="field"
              variant="standard"
              label="Username"
              placeholder="Enter username"
              fullWidth
              required
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              sx={{ marginTop: "2rem" }}
              className="field"
              variant="standard"
              label="Password"
              placeholder="Enter password"
              fullWidth
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Button
            sx={{ marginTop: "4rem" }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {formType}
          </Button>
          {displayReset ? (
            <Typography sx={{ marginTop: "0.69rem" }}>
              <Link href="http://localhost:5173/dashboard">
                Forgot password?
              </Link>
            </Typography>
          ) : (
            <div></div>
          )}
        </Paper>
      </Grid>
    </form>
  );

  // return (
  //   <div className="auth-container">
  //     <form onSubmit={onSubmit}>
  //       <h1>{formType}</h1>
  //       <div className="form-group">
  //         <label htmlFor="username">Username:</label>
  //         <input
  //           type="text"
  //           id="username"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="password">Password:</label>
  //         <input
  //           type="password"
  //           id="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //       </div>

  //       <button type="submit">{formType}</button>
  //     </form>
  //   </div>
  // );
};
