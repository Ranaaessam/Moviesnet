import React, { useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PersonIcon from '@mui/icons-material/Person';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };
  
    switch (name) {
      case "email":
        newErrors.email = value.includes("@")
          ? ""
          : "Please enter a valid email address.";
        break;
      case "password":
        newErrors.password =
          value.length >= 6
            ? ""
            : "Password must be at least 6 characters long.";
        break;
      case "confirmPassword":
        newErrors.confirmPassword =
          value === signupData.password ? "" : "Passwords do not match.";
        break;
      default:
        break;
    }
  
    setErrors(newErrors);
    setSignupData({ ...signupData, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple email validation
    if (!signupData.email.includes("@")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    // Simple password length validation
    if (signupData.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long.",
      }));
      return;
    }

    // Password confirmation validation
    if (signupData.password !== signupData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    // Clear error messages on successful submission
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Proceed with signup
    try {
      const response = await axios.post(
        "http://localhost:3001/users",
        signupData
      );
      console.log("New user added:", response.data);
      alert("Signup successful! Redirecting to login page...");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(15px)", // Increased blur effect
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "0",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
            backgroundImage:
              'url("https://i.pinimg.com/236x/13/01/05/130105446517355c281022a2fcd435a7.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",

          }}
        >
          {/* The loginForm itself */}
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "10px",
              borderRadius: "10px",
              width: "750px",
              height: "700px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(20px)", 
              zIndex: "1",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "#43a047",
                margin: "auto", // Center the Avatar horizontally
                marginBottom: "20px", // Add margin bottom for spacing
                marginTop: "25px", // Adjust margin top to center vertically
                width: "75px", // Reduce icon size
                height: "75px" // Reduce icon size
              }}
            >
              <GroupAddIcon sx={{ fontSize: "3rem" }}></GroupAddIcon>
              {/* <PersonIcon sx={{ fontSize: "3rem" }}></PersonIcon> */}
            </Avatar>

            <Typography component="h1" variant="h5" sx={{ marginLeft: "25px" ,color:"#66bb6a"}}>
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, padding: "20px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    value={signupData.firstName}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d32f2f", // Change border color to green when focused
                      },
                      "& .MuiInputLabel-outlined.Mui-focused": {
                        color: "#d32f2f", // Change placeholder color to green when focused
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="family-name"
                    name="lastName"
                    value={signupData.lastName}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#66bb6a", // Change border color to green when focused
                      },
                      "& .MuiInputLabel-outlined.Mui-focused": {
                        color: "#d32f2f", // Change placeholder color to green when focused
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d32f2f", // Change border color to green when focused
                      },
                      "& .MuiInputLabel-outlined.Mui-focused": {
                        color: "#d32f2f", // Change placeholder color to green when focused
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="new-password"
                    name="password"
                    value={signupData.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d32f2f", // Change border color to green when focused
                      },
                      "& .MuiInputLabel-outlined.Mui-focused": {
                        color: "#d32f2f", // Change placeholder color to green when focused
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="new-password"
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d32f2f", // Change border color to green when focused
                      },
                      "& .MuiInputLabel-outlined.Mui-focused": {
                        color: "#d32f2f", // Change placeholder color to green when focused
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="I agree to the terms and conditions."
                    name="agreedToTerms"
                    checked={signupData.agreedToTerms}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  width="50%"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "#d32f2f", "&:hover": { bgcolor: "#f44336" } }} 
                >
                  Sign Up
                </Button>
              </div>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2" sx={{ color: "#d32f2f" }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
