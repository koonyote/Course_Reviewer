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
import config from "../config.json";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import { Hidden } from "@mui/material";
import { ProductLink } from "..";

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

export default function Profile() {
  const token = localStorage.getItem("token");
  const [dataApi, setDataApi] = useState();
  const [username, setUsername] = useState();
  const [effect, setEffect] = useState(0);
  useEffect(() => {
    const api = async () => {
      const API = await fetch(`${config.domain}/my-profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "*",
          "User-Agent": "Custom",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST",
        },
      });
      const data = await API.json();
      if (API.status === 200) {
        setDataApi({
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          gender: data.user_sex,
          date_of_brith: data.birth_date,
        });
        setUsername(data.username);
      }
    };
    window.setTimeout(() => {
      api();
    }, 1000);
  }, [effect]);

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
  const handleClose_Confirm = async () => {
    setOpen(false);
    const API = await fetch(`${config.domain}/my-profile`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    if (API.status == 200) {
      Swal.fire({
        icon: "success",
        title: "แก้ไข Username สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      setEffect(effect + 1);
    } else {
      Swal.fire({
        icon: "error",
        title: "แก้ไข Username สำไม่เร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setEffect(effect + 1);
  };

  const handleChange_username = (event) => {
    setUsername(event.target.value);
  };
  const Swal = require("sweetalert2");
  return (
    <>
      <Navbar />

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Hidden only={["xl", "lg"]}>
            <Box
              sx={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                boxShadow: 3,
                // border: 2,
                borderRadius: 6,
                p: 2,
                backgroundColor: "#F0F0F0",
              }}
            >
              <Avatar
                src={localStorage.getItem("profilePic")}
                sx={{ m: 2, width: 150, height: 150 }}
              >
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                align="center"
                color="#173F5F"
                gutterBottom
              >
                My Profile
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                {dataApi ? (
                  <React.Fragment>
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
                          error={username.length < 6 ? true : false}
                          helperText={
                            username.length < 6
                              ? "กรุณากรอกให้ครบหรือมากกว่า 6 ตัว"
                              : false
                          }
                          // fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <DriveFileRenameOutlineRoundedIcon />
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
                      <Grid item xs={12} sm={6}>
                        <Box
                          maxHeight
                          sx={{
                            color: "#174468",
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
                            color: "text.secondary",
                            textAlign: "center",
                            border: 0,
                            borderRadius: 6,
                            bgcolor: "white",
                            p: 1,
                          }}
                        >
                          {" "}
                          {dataApi.firstname}{" "}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box
                          maxHeight
                          sx={{
                            color: "#174468",
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
                            color: "text.secondary",
                            textAlign: "center",
                            border: 0,
                            borderRadius: 6,
                            bgcolor: "white",
                            p: 1,
                          }}
                        >
                          {dataApi.lastname}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box
                          maxHeight
                          sx={{
                            color: "#174468",
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
                            color: "text.secondary",
                            textAlign: "center",
                            border: 0,
                            borderRadius: 6,
                            bgcolor: "white",
                            p: 1,
                          }}
                        >
                          {dataApi.gender}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box
                          maxHeight
                          sx={{
                            color: "#174468",
                            textAlign: "left",
                            border: 0,
                            p: 1,
                            paddingLeft: 3,
                          }}
                        >
                          Date of birth
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box
                          maxHeight
                          sx={{
                            color: "text.secondary",
                            textAlign: "center",
                            border: 0,
                            borderRadius: 6,
                            bgcolor: "white",
                            p: 1,
                          }}
                        >
                          {dataApi.date_of_brith}
                        </Box>
                      </Grid>
                    </Grid>

                    <Button
                      disabled={username.length < 6 ? true : false}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{
                        maxWidth: "350px",
                        maxHeight: "30px",
                        minWidth: "30px",
                        minHeight: "40px",
                      }}
                    >
                      Comfirm
                    </Button>
                  </React.Fragment>
                ) : (
                  <CircularProgress size={100} />
                )}
                <Grid container justifyContent="flex-end"></Grid>
              </Box>
            </Box>
          </Hidden>

          <Hidden only={["xs", "sm", "md"]}>

            <Box
              sx={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 3,
                borderRadius: 6,
                p: 2,
                backgroundColor: "#F1F1F1",
                width: 800,
                ml: -25
              }}
            >
              <Avatar
                src={localStorage.getItem("profilePic")}
                sx={{ m: 2, width: 150, height: 150 }}
              >
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="#173F5F"
                gutterBottom
              >
                My Profile
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: 400 }}
              >
                {dataApi ? (
                  <React.Fragment>
                    <TextField
                      required
                      error={username.length < 6 ? true : false}
                      helperText={
                        username.length < 6
                          ? "กรุณากรอกให้ครบหรือมากกว่า 6 ตัว"
                          : false
                      }
                      // fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DriveFileRenameOutlineRoundedIcon />
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
                      sx={{ ml: 5, width: 330 }}
                    />

                    <Box
                      maxHeight
                      sx={{
                        color: "#174468",
                        textAlign: "left",
                        border: 0,
                        p: 1,
                        paddingLeft: 3,
                        fontSize: 16,
                        mt: 2
                      }}
                    >
                      First Name
                    </Box>

                    <Box
                      maxHeight
                      sx={{
                        color: "text.secondary",
                        textAlign: "center",
                        border: 0,
                        borderRadius: 6,
                        bgcolor: "white",
                        fontSize: 14,
                        p: 1,
                      }}
                    >
                      {" "}
                      {dataApi.firstname}{" "}
                    </Box>

                    <Box
                      maxHeight
                      sx={{
                        color: "#174468",
                        textAlign: "left",
                        border: 0,
                        p: 1,
                        paddingLeft: 3,
                        fontSize: 16
                      }}
                    >
                      Last Name
                    </Box>

                    <Box
                      maxHeight
                      sx={{
                        color: "text.secondary",
                        textAlign: "center",
                        border: 0,
                        borderRadius: 6,
                        bgcolor: "white",
                        fontSize: 14,
                        p: 1,
                      }}
                    >
                      {dataApi.lastname}
                    </Box>

                    <Box
                      maxHeight
                      sx={{
                        color: "#174468",
                        textAlign: "left",
                        border: 0,
                        p: 1,
                        paddingLeft: 3,
                        fontSize: 16
                      }}
                    >
                      Gender
                    </Box>

                    <Box
                      maxHeight
                      sx={{
                        color: "text.secondary",
                        textAlign: "center",
                        border: 0,
                        borderRadius: 6,
                        bgcolor: "white",
                        fontSize: 14,
                        p: 1,
                      }}
                    >
                      {dataApi.gender}
                    </Box>

                    <Box
                      maxHeight
                      sx={{
                        color: "#174468",
                        textAlign: "left",
                        border: 0,
                        p: 1,
                        paddingLeft: 3,
                        fontSize: 16
                      }}
                    >
                      Date of birth
                    </Box>

                    <Box
                      maxHeight
                      sx={{
                        color: "text.secondary",
                        textAlign: "center",
                        border: 0,
                        borderRadius: 6,
                        bgcolor: "white",
                        p: 1,
                        fontSize: 14
                      }}
                    >
                      {dataApi.date_of_brith}
                    </Box>

                    <Button
                      disabled={username.length < 6 ? true : false}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, ml: 3 }}
                      style={{
                        maxWidth: "350px",
                        maxHeight: "30px",
                        minWidth: "30px",
                        minHeight: "40px",
                      }}
                    >
                      Comfirm
                    </Button>
                  </React.Fragment>
                ) : (
                  <CircularProgress size={100} sx={{ ml: 18 }} />
                )}
              </Box>
            </Box>
          </Hidden>
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

      <Copyright sx={{ mt: 3 }} />
    </>
  );
}
