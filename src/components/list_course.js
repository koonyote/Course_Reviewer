import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import config from "../config.json";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery"; // ตัวจัด Fullscreen
import Navbar from "../components/Navbar";
import TextField from "@mui/material/TextField";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Course Reviewer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const theme_favorite = createTheme({
  typography: {
    button: {
      fontSize: "1rem",
    },
  },
});

export default function List_Course() {
  const [dialog_loading, set_dialog] = React.useState(false);
  let [api_course_data, set_api_course_data] = React.useState();

  useEffect(() => {
    const api = async () => {
      const token = localStorage.getItem("token");
      const API = await fetch(`${config.domain}/list-course`, {
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
      console.log(data);
      if (API.status === 200) set_api_course_data(data);
    };
    // api()
    window.setTimeout(() => {
      api();
    }, 1000);
  }, []);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  function handle_bt_favorite(event, someParameter) {
    //do with event
    // console.log(event);
    set_dialog(true);
    console.log(someParameter);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <main> */}
      {/* Hero unit ส่วนหัวด้านบน */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 5,
          pb: 1,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            รายวิชา
          </Typography>
          <center>
            <TextField id="outlined-search" label="Search" type="search" />
            <ManageSearchIcon sx={{ fontSize: "50px" }} color="action" />
          </center>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
        </Container>
      </Box>

      {/* ---------------------------------------------------------------------------------- CONTAINER 
        เหลือเชื่อมลิ้งเข้าหน้าอื่นๆ */}

      <Container
        sx={{
          mt: -3,
          py: 8,
          border: 0,
          borderRadius: 3,
          boxShadow: 10,
          marginBottom: 10,
        }}
        maxWidth="md"
        style={{ backgroundColor: "#F1F1F1" }}
      >
        {/* End hero unit */}
        {api_course_data ? (
          <Grid container spacing={4}>
            {api_course_data.map((data) => (
              <Grid item key={data} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    shadows: 1,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      textAlign={"center"}
                      href="#"
                    >
                      <Link
                        href={`/course-detail/${data.course_id}`}
                        underline="hover"
                      >
                        {data.course_id}
                      </Link>
                    </Typography>
                    <Typography textAlign={"center"}>
                      {" "}
                      {data.course_name_th}{" "}
                    </Typography>
                    <Typography textAlign={"center"}>
                      {" "}
                      {data.course_name_en}{" "}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <ThemeProvider theme={theme_favorite}>
                      {/* <Button>font-size: 1rem</Button> */}
                      <Button
                        sx={{
                          flexDirection: "column",
                          ":hover": {
                            backgroundColor: "#FFC0CB",
                            color: "#fffff",
                          },
                        }}
                        onClick={(e) => {
                          handle_bt_favorite(e, data.course_id);
                        }}
                      >
                        {false ? (
                          <FavoriteIcon sx={{ color: "#FFC0CB" }} />
                        ) : (
                          <FavoriteBorderIcon color="action" />
                        )}
                      </Button>
                    </ThemeProvider>
                  </CardActions>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      onClick={() => window.open(`/rating/${data.course_id}`)}
                    >
                      <Rating
                        name="half-rating-read"
                        size="small"
                        defaultValue={data.score}
                        precision={0.5}
                        readOnly
                        sx={{ paddingBottom: 0.5 }}
                      />
                    </Button>
                    <Button
                      size="small"
                      sx={{ alignContent: "center" }}
                      onClick={() => window.open(`/comment/${data.course_id}`)}
                    >
                      <CommentIcon fontSize="small"></CommentIcon> &nbsp; (
                      {data.comment})
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <LinearProgress />
        )}
      </Container>
      {/* ---------------------------------------------------------------------------------- CONTAINER */}
      {/* </main> */}
      {/* Dialog */}
      <Dialog
        fullScreen={fullScreen}
        open={dialog_loading}
        // onClose={dialog_loading}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Please wait ..."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <CircularProgress size={100} />
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* Dialog */}
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          {/* Footer */}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {/* Something here to give the footer a purpose! */}
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
