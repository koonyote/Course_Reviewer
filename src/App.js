import * as React from "react";
import { useState, useEffect } from "react";
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { signInWithGoogle } from "./services/firebase";
import { ProductLink } from ".";

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

export default function SignInSide() {
  const [click, setClick] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithGoogle();
    setClick(false);
  };

  function Button_Login() {
    if (click) {
      return (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          <Avatar
            alt="Goole"
            src="https://media.discordapp.net/attachments/1048126600367067211/1055139308530569348/pngegg.png?width=895&height=671"
            sx={{ bgcolor: "white" }}
          />
          &nbsp;&nbsp; Sign In With Google
        </Button>
      );
    } else {
      return (
        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          <CircularProgress color="inherit" />
        </Button>
      );
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://images-ext-1.discordapp.net/external/eASVOC4hqs5PmEJr2Z4Xl_IXdFLwcLVdChvVdgeCQVs/https/www.innolifethailand.com/online/wp-content/uploads/2021/03/motoso__16.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 25,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // px: 5
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {Button_Login()}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
