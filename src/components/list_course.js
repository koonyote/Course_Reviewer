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
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Paper from '@mui/material/Paper';
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Dialog
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { blue, grey } from '@mui/material/colors';
import { async } from "@firebase/util";


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

const options = ['รหัสวิชา', 'ชื่อวิชาภาษาไทย', 'ชื่อวิชาภาษาอังกฤษ'];
function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Options</DialogTitle>
      <List sx={{ pt: 0 }}>
        {options.map((email) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
              <ListItemAvatar>
                {/* Example Icon Style */}
                {/* <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar> */}
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <SettingsIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function List_Course() {
  const [dialog_loading, set_dialog] = React.useState(false);
  let [api_course_data, set_api_course_data] = React.useState();
  const token = localStorage.getItem("token");
  const [effect, setEffect] = React.useState(0); 
  useEffect(() => {
    const api = async () => {
      const API = await fetch(`${config.domain}/list-course-favorite`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "*",
          "User-Agent": "Custom",
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST",
        },
      });
      const data = await API.json();
      //console.log(data);
      if (API.status === 200) {
        set_api_course_data(data);
        setRows(data)
      }
    };
    // api()
    window.setTimeout(() => {
      api();
    }, 500);
  }, [effect]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const Swal = require('sweetalert2')
  async function swalApiSendLoading(status){
    if (status) {
      Swal.fire({
        icon: 'success',
       title: 'เพิ่มรายการโปรดสำเร็จ',
       showConfirmButton: false,
       timer: 1000,
     })
      
    } else {
      Swal.fire({
        icon: 'error',
       title: 'เพิ่มรายการโปรดไม่สำเร็จ',
       showConfirmButton: false,
       timer: 1000,
     })
    }
  }

  async function API_Add_Favorite(code) {
    const send = await fetch(`${config.domain}/add-favorite`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        course_id: code,
      }),
    });
    const status = send.status === 200 ? true : false;
    swalApiSendLoading(status)
    return status
  }

  async function API_Delete_Favorite(code) {
    const send = await fetch(`${config.domain}/delete-favorite`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "*",
            "User-Agent": "Custom",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            course_id: code,
        }),
    });
    const status = send.status === 200 ? true : false;
    swalApiSendLoading(status)
    return status
}

  async function handle_bt_favorite(event, course_id , switchcheck ) {
    set_dialog(true);
    let status 
    if ( !switchcheck ) status = await API_Add_Favorite(course_id)
    else status =  await API_Delete_Favorite(course_id)
    if (status) {
      setEffect(effect + 1);
      // window.setTimeout(() => {
      //   set_dialog(false);
      // }, 500);
      // set_dialog(false);
    }
  }

  //  ---------------------------------------------- Search Section 
  const [rows, setRows] = React.useState();
  const [searched, setSearched] = React.useState("");

  const requestSearch = (event) => {
    let searchedVal = event.target.value
    console.log(searchedVal)
    setSearched(searchedVal)
    const filter = api_course_data.filter((row) => {
      return(
        row.course_id.toLowerCase().includes(searchedVal.toLowerCase()) || row.course_name_th.toLowerCase().includes(searchedVal.toLowerCase()) || row.course_name_en.toLowerCase().includes(searchedVal.toLowerCase())
      );
      // if (selectedValue === options[0]) return row.course_id.toLowerCase().includes(searchedVal.toLowerCase());
      // else if (selectedValue === options[1]) return row.course_name_th.toLowerCase().includes(searchedVal.toLowerCase());
      // else if (selectedValue === options[2]) return row.course_name_en.toLowerCase().includes(searchedVal.toLowerCase());
    });;
    setRows(filter)
  }
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(options[0]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };


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
            Course
          </Typography>
          
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
          py: 2,
          border: 0,
          borderRadius: 3,
          boxShadow: 10,
          marginBottom: 10,
        }}
        maxWidth="md"
        style={{ backgroundColor: "#F1F1F1" }}
      >
        <Paper
          component="form"
          sx={{borderRadius:3, p: '2px 4px', width: 'auto', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'right', marginBottom: 1 }}
        >
         
          <InputBase
            value={searched}
            onChange={requestSearch}
            // onChange={ (e) => {
            //     e.target.value ? requestSearch(e.target.value) : cancelSearch()
            // }}
            sx={{ ml: 1, flex: 1 }}
            placeholder={`ค้นหาด้วย รหัสวิชาหรือชื่อวิชา`}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        {/* End hero unit */}
        {api_course_data ? (
          <Grid container spacing={4}>
            {rows.map((data) => (
              <Grid item key={data} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    shadows: 1,
                    borderRadius:6,
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
                      <IconButton sx={{
                        color: "action",
                        ":hover": {
                          backgroundColor: "#FFC0CB",
                        },
                      }}
                        onClick={(e) => {
                          handle_bt_favorite(e, data.course_id,data.favorite);
                        }}>
                        {/* <FavoriteBorderIcon /> */}
                        {
                          (data.favorite) ? <FavoriteIcon sx={{color: '#FFC0CB'}} /> : <FavoriteBorderIcon />
                        }
                      </IconButton>
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
                        sx={{ paddingBottom: 0.5, mr: 0.5 }}
                      />
                      ({data.score_total})
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
        // open={dialog_loading}
        // onClose={dialog_loading}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">
          {"Please wait ..."}
        </DialogTitle> */}
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
