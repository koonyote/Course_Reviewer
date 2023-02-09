import React, { useRef, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import config from "../config.json";
import { ProductLink } from "..";
const Swal = require('sweetalert2')
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
{"Copyright © "}
            <Link color="inherit" href={ProductLink.credit}>
                Course Reviewer
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
    </Typography>
  );
}
const theme = createTheme();

async function call_api_check_member(
  username,
  gender,
  f_name,
  l_name,
  birthdate
) {
  const token = localStorage.getItem("token");
  let param = {
    username: username,
    firstname: f_name,
    lastname: l_name,
    birthdate: birthdate,
    sex: gender,
  };

  const body = JSON.stringify(param);

  const API = await fetch(`${config.domain}/register`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "*",
      "User-Agent": "Custom",
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST",
    },
    body,
  });
  if (API.status == 200) {
    
    Swal.fire({
      icon: 'success',
     title: 'สมัครสมาชิกสำเร็จ',
     showConfirmButton: false,
     timer: 2000,
   }).then(function() {
    window.location.replace(ProductLink.home);
})
  } else {
    Swal.fire({
      icon: 'error',
       title: 'สมัครสมาชิกไม่สำเร็จ',
       showConfirmButton: false,
       timer: 1500,
     }).then(function() {
      window.location.replace(ProductLink.register);
  })
  
  }
  console.log({ body });
  const jsonData = await API.json();
}

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    call_api_check_member(username, gender, f_name, l_name, birthdate);
  };
  const [username, setUsername] = useState();
  const [gender, setGender] = useState();
  const [f_name, setFname] = useState();
  const [l_name, setLname] = useState();

  const [birthdate, setBirthdate] = useState();
  const dateInputRef = useRef(null);

  const handleChange_gender = (event) => {
    setGender(event.target.value);
  };
  const handleChange_user = (event) => {
    setUsername(event.target.value);
  };
  const handleChange_Fname = (event) => {
    setFname(event.target.value);
  };
  const handleChange_Lname = (event) => {
    setLname(event.target.value);
  };

  const handleChange_Bdate = (e) => {
    setBirthdate(e.target.value);
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange_Checkbox = (event) => {
    setChecked(event.target.checked);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={handleChange_user}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={f_name}
                  onChange={handleChange_Fname}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={l_name}
                  onChange={handleChange_Lname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    required
                    fullWidth
                    label="Gender"
                    id="gender"
                    value={gender}
                    onChange={handleChange_gender}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="date"
                  label="day"
                  type="date"
                  // value={birthdate}
                  onChange={handleChange_Bdate}
                  defaultValue=""
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allow"
                      id="allow"
                      color="primary"
                      checked={checked}
                      onChange={handleChange_Checkbox}
                    />
                  }
                  label="I accept the terms of agreement."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!checked}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
