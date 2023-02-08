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
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Dialog
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { blue, grey } from "@mui/material/colors";
import { async } from "@firebase/util";

import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
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

const theme_favorite = createTheme({
  typography: {
    button: {
      fontSize: "1rem",
    },
  },
});

const options = [
  "เรียงลำดับปกติ",
  "เรียงตามจำนวนคอมเมนต์",
  "เรียงตามจำนวนคะแนน",
];
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
            <ListItemButton
              onClick={() => handleListItemClick(email)}
              key={email}
            >
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

var images = [
  'https://img.freepik.com/free-photo/abstract-studio-background-texture-light-blue-gray-gradient-wall-flat-floor-product_1258-88339.jpg?w=1060&t=st=1675763801~exp=1675764401~hmac=e98c16a4855dcb8d6ed6796e1d75df08f2f01947d1d4f2f428b0566a542af8c3',
  'https://img.freepik.com/free-photo/abstract-blur-empty-green-gradient-studio-well-use-as-background-website-template-frame-business-report_1258-52616.jpg?w=740&t=st=1675763824~exp=1675764424~hmac=137ff51d8a0b65c286dc8f97b28b955b6fa5bd5b2b9c88e29a1a5696c139fa59',
  'https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-88586.jpg?w=1060&t=st=1675763843~exp=1675764443~hmac=4a01818b1c03c57344bdebac58661b523b85f3dd4e25393039928a248b4b7431',
  'https://img.freepik.com/free-photo/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product_1258-56060.jpg?w=1060&t=st=1675763865~exp=1675764465~hmac=65ac4d22112f0c1c69171a26301f0a87daf3f589d1d02fc08354b2111bd9a793',
  'https://img.freepik.com/free-photo/gold-shiny-background-with-variating-hues_1258-85534.jpg?w=740&t=st=1675763886~exp=1675764486~hmac=c3b35322167e50e8f265fdb368e12fe57d2ec51390a6a08ec9c80ffe047a17e5',
  'https://img.freepik.com/free-photo/abstract-empty-smooth-light-pink-studio-room-background-use-as-montage-product-displaybannertemp_1258-107802.jpg?w=1060&t=st=1675763910~exp=1675764510~hmac=2e91a3456f5492ee886b066cc3383e780fec6732927105e046c90b4ca5373829',
  'https://img.freepik.com/free-photo/green-light-green-blur-gradient-background_1258-85446.jpg?w=740&t=st=1675764112~exp=1675764712~hmac=11f634f30594497b240087e85875305699bd9b4a240460b986ead2e64a04ae8f',
  'https://img.freepik.com/free-photo/abstract-luxury-gold-yellow-gradient-studio-wall-well-use-as-background-layout-banner-product-presentation_1258-56105.jpg?w=1060&t=st=1675764144~exp=1675764744~hmac=b1f59aa2fbc79e5ba3b1bb6fcc8206c53a138627496ee18ebb14f12b796da3a5',
  'https://img.freepik.com/free-photo/empty-green-studio-well-use-as-background-website-template-frame-business-report_1258-71742.jpg?w=1380&t=st=1675764312~exp=1675764912~hmac=934de7c8de60e48c31dc52a47b24e84310d35f6e7ae53e8f542e6cebf72d78e3',
  'https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30621.jpg?w=1060&t=st=1675764775~exp=1675765375~hmac=93eef79ca4f57486717560c517eee4442e0de064cc7da4fe9ef4c7d06bc112ef',
'https://img.freepik.com/free-photo/studio-background-concept-abstract-empty-light-gradient-purple-studio-room-background-product_1258-67806.jpg?w=996&t=st=1675764402~exp=1675765002~hmac=699c820d078f500e1095e2a806713caaf5cac23e0e7fcf69cfc14f4c765d83cd',
];

// imges[0]

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
        set_api_course_data(data);
        setRows(data);
      }
    };
    // api()
    window.setTimeout(() => {
      api();
    }, 500);
  }, [effect]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const Swal = require("sweetalert2");
  async function swalApiSendLoading(status, message) {
    if (status) {
      Swal.fire({
        icon: "success",
        title: `${message}รายการโปรดสำเร็จ`,
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: `${message}รายการโปรดไม่สำเร็จ`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }

  async function API_Add_Favorite(code) {
    const send = await fetch(`${config.domain}/add-favorite`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        course_id: code,
      }),
    });
    const status = send.status === 200 ? true : false;
    swalApiSendLoading(status, "เพิ่ม");
    return status;
  }

  async function API_Delete_Favorite(code) {
    const send = await fetch(`${config.domain}/delete-favorite`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        course_id: code,
      }),
    });
    const status = send.status === 200 ? true : false;
    swalApiSendLoading(status, "ลบ");
    return status;
  }

  async function handle_bt_favorite(event, course_id, switchcheck) {
    set_dialog(true);
    let status;
    if (!switchcheck) status = await API_Add_Favorite(course_id);
    else status = await API_Delete_Favorite(course_id);
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
    let searchedVal = event.target.value;
    // console.log(searchedVal)
    setSearched(searchedVal);
    const filter = api_course_data.filter((row) => {
      return (
        row.course_id.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.course_name_th.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.course_name_en.toLowerCase().includes(searchedVal.toLowerCase())
      );
      // if (selectedValue === options[0]) return row.course_id.toLowerCase().includes(searchedVal.toLowerCase());
      // else if (selectedValue === options[1]) return row.course_name_th.toLowerCase().includes(searchedVal.toLowerCase());
      // else if (selectedValue === options[2]) return row.course_name_en.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filter);
  };
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [refash, setRefash] = React.useState(true);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const optionMethod = (index, source) => {
    setRefash(false);
    const data = source;
    let results;
    if (index == 1) {
      results = data.sort((a, b) => {
        if (a.comment > b.comment) {
          return -1;
        }
      });
    } else if (index == 2) {
      results = data.sort((a, b) => {
        if (a.score > b.score) {
          return -1;
        }
      });
    } else if (index == 0) {
      results = data.sort((a, b) => {
        if (a.course_id < b.course_id) {
          return -1;
        }
      });
    }
    // console.log(source)
    setRows(results);
    window.setTimeout(() => {
      setRefash(true);
    }, 500);
  };

  const handleMenuItemClick = (event, index) => {
    // console.log("Your Click %s",index)
    // console.log(options[index])
    optionMethod(index,api_course_data);
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (value) => {
    setOpen(false);
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
            color="#173F5F"
            gutterBottom
            sx={{ mt: 2 }}
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
          width: "80%",
        }}
        // maxWidth="md"
        style={{ backgroundColor: "#F1F1F1" }}
      >
        <Paper
          component="form"
          sx={{
            borderRadius: 3,
            p: "2px 4px",
            width: "auto",
            border: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            marginBottom: 1,
          }}
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
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleToggle}
            ref={anchorRef}
          >
            <FilterAltRoundedIcon sx={{ color: "#647C90" }} />
          </IconButton>
        </Paper>
        {/*  */}

        <Popper
          sx={{
            zIndex: 1,
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        // disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        {/* End hero unit */}
        {api_course_data && refash ? (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {rows.map((data, index) => (
              <Grid item key={data} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    shadows: 1,
                    borderRadius: 6,
                    maxWidth: 300,
                  }}
                >
                 
                    <img
                      style={{
                        width: '100%',
                        height: '100%',
                        maxHeight:20,
                        opacity:0.4
                      }}
                      src={images[index % 10]}
                    ></img>
                
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      textAlign={"center"}
                    >
                      <Link
                        href={`${ProductLink.comment}/${data.course_id}`}
                        underline="hover"
                        color="#174468"
                      >
                        {data.course_id}
                      </Link>
                    </Typography>
                    <Typography textAlign={"center"} color={"#174468"}>
                      {" "}
                      {data.course_name_th}{" "}
                    </Typography>
                    <Typography textAlign={"center"} color={"#174468"}>
                      {" "}
                      {data.course_name_en}{" "}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <ThemeProvider theme={theme_favorite}>
                      {/* <Button>font-size: 1rem</Button> */}
                      <IconButton
                        sx={{
                          color: "action",
                          ":hover": {
                            backgroundColor: "#FFC0CB",
                          },
                          mt: -3,
                        }}
                        onClick={(e) => {
                          handle_bt_favorite(e, data.course_id, data.favorite);
                        }}
                      >
                        {/* <FavoriteBorderIcon /> */}
                        {data.favorite ? (
                          <FavoriteIcon sx={{ color: "#FFC0CB" }} />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </ThemeProvider>
                  </CardActions>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      href={`${ProductLink.rating}/${data.course_id}`}
                     
                    >
                      <Rating
                        name="half-rating-read"
                        size="small"
                        // defaultValue={()=> { console.log(data.score); return(data.score)}}
                        value={data.score}
                        precision={0.5}
                        readOnly
                        sx={{ paddingBottom: 0.5, mr: 0.5 }}
                      />
                      ({data.score_total})
                    </Button>
                    <Button
                      size="small"
                      sx={{ alignContent: "center" }}
                      href={`${ProductLink.comment}/${data.course_id}`} 
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
