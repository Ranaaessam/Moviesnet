import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/users");
      const userData = response.data;

      const userWithEmail = userData.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (!userWithEmail) {
        setError("Email not found");
        return;
      }

      if (userWithEmail.password !== password) {
        setError("Incorrect password");
        return;
      }

      setError("");
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      
      <Grid container component="main" sx={{ height: "100vh"}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://i.pinimg.com/564x/af/b9/0f/afb90f58ff0f72f68009e7fbfd323fd1.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#d32f2f",
            backgroundSize: "100% 100%",

          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#66bb6a", width: 80, height: 80 }}>
              <LoginIcon  sx={{ fontSize: "2.5rem"} } ></LoginIcon>
            </Avatar>
<Typography component="h1" variant="h5" sx={{ color: "#66bb6a", marginRight: "390px", marginTop: "20px" }}>
  Login
</Typography>


            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
              
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#66bb6a",
                  },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: "#66bb6a",
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#66bb6a",
                  },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: "#66bb6a",
                  },
                }}
              />
              {error && (
                <Typography variant="body2" color="error" sx={{ marginTop: "10px" }}>
                  {error}
                </Typography>
              )}
              {success && (
                <Typography variant="body2" color="#66bb6a">
                  Sign in successful! Redirecting...
                </Typography>
              )}

<div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  width="100%"
                  variant="contained"
                  sx={{ mt: 5, mb: 2, bgcolor: "#66bb6a", "&:hover": { bgcolor: "#4caf50" },width:"200px" ,marginTop:"40px",marginBottom:"20px"}}
                >
                 Login
                </Button>
              </div>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" sx={{ color: "#66bb6a" }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2" sx={{ color: "#66bb6a" }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
