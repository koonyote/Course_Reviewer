import React, { useEffect, useRef, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { InputAdornment } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Navbar from "../components/Navbar";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Course Reviewer</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();

export default function Profile() {
  const datafromapi = {
    username: "anan",
    firstname: "Ananda",
    lastname: "Prabdee",
    gender: "male",
    date_of_brith: "12/02/2544",
  };
  const [username_pull, setUsername_pull] = useState(true);
  // UseEffect ทำทุกครั้งที่กดจ้า
  useEffect(() => {
    // ดึงจาก object มาใส่ลงใน text input ก่อน
    if (datafromapi.username && username_pull) {
      setUsername(datafromapi.username);
      setUsername_pull(false);
    }
  });
  const [username, setUsername] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClickOpen();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Confirm สุดท้ายถึงจะทำ
  const handleClose_Confirm = () => {
    setOpen(false);
    console.log("Comfirm Success!");
    console.log("Confirm Change Username: %s", username);
  };

  const handleChange_username = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <Navbar />

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "background.paper",
              boxShadow: 1,
              // border: 2,
              borderRadius: 5,
              p: 2,
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              My Profile
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {/* ส่่วนของ Username */}
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <TextField
                    required
                    // fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ManageAccountsIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    color="secondary" // success warning secondary
                    label="username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={handleChange_username}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6} >
                                <Box maxHeight  sx={{ color: 'text.secondary',border: 0, p: 1 , minHeight: 1, textAlign: 'left' , paddingTop: 1.6 ,paddingLeft: 3}}  >User Name</Box>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    // id="username"
                                    label="username"
                                    name="username"
                                    autoComplete="username"
                                    value={username}
                                    onChange={handleChange_username}
                                />
                            </Grid> */}
                <Grid item xs={12} sm={6}>
                  <Box
                    maxHeight
                    sx={{
                      color: "text.secondary",
                      textAlign: "left",
                      border: 0,
                      p: 1,
                      paddingLeft: 3,
                    }}
                  >
                    First Name
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    maxHeight
                    sx={{
                      color: "",
                      textAlign: "center",
                      border: 0,
                      borderRadius: 1,
                      bgcolor: "#E0BBE4",
                      p: 1,
                    }}
                  >
                    {" "}
                    {datafromapi.firstname}{" "}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    maxHeight
                    sx={{
                      color: "text.secondary",
                      textAlign: "left",
                      border: 0,
                      p: 1,
                      paddingLeft: 3,
                    }}
                  >
                    Last Name
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    maxHeight
                    sx={{
                      color: "",
                      textAlign: "center",
                      border: 0,
                      borderRadius: 1,
                      bgcolor: "#E0BBE4",
                      p: 1,
                    }}
                  >
                    {datafromapi.lastname}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    maxHeight
                    sx={{
                      color: "text.secondary",
                      textAlign: "left",
                      border: 0,
                      p: 1,
                      paddingLeft: 3,
                    }}
                  >
                    Gender
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    maxHeight
                    sx={{
                      color: "",
                      textAlign: "center",
                      border: 0,
                      borderRadius: 1,
                      bgcolor: "#E0BBE4",
                      p: 1,
                    }}
                  >
                    {datafromapi.gender}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    maxHeight
                    sx={{
                      color: "text.secondary",
                      textAlign: "left",
                      border: 0,
                      p: 1,
                      paddingLeft: 3,
                    }}
                  >
                    date of birth
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    maxHeight
                    sx={{
                      color: "",
                      textAlign: "center",
                      border: 0,
                      borderRadius: 1,
                      bgcolor: "#E0BBE4",
                      p: 1,
                    }}
                  >
                    {datafromapi.date_of_brith}
                  </Box>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // disabled={!checked}
              >
                Comfirm
              </Button>
              <Grid container justifyContent="flex-end"></Grid>
            </Box>
          </Box>
        </Container>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please decide before making any changes to your information.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose_Confirm} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>

      <Copyright sx={{ mt: 15 }} />
    </>
  );
}
