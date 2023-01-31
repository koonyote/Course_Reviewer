import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import "rsuite/dist/rsuite.css";
import Drawer from "@mui/material/Drawer";
import DehazeIcon from "@mui/icons-material/Dehaze";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from "react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";

import config from "../config.json";
export default function PersistentDrawerLeft() {
  const [data_api, set_data_api] = React.useState();

  function Logout() {
    return localStorage.clear();
  }

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    const api = async () => {
      const token = localStorage.getItem("token");
      const API = await fetch(`${config.domain}/login`, {
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
      });
      const data = await API.json();

      if (data !== "") {
        if (data.permission == "officer") {
          set_data_api(data.permission);
        } else {
          set_data_api("");
        }
      }

      //set_data_api(data.permission);

      //console.log(data);
    };

    window.setTimeout(() => {
      api();
    }, 1000);
  }, []);

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 270,
        backgroundColor: "#39998E",
        color: "white",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ marginTop: "5%" }}>
        <ListItem disablePadding>
          <Grid container justifyContent="center">
            <Avatar
              alt="Remy Sharp"
              src={localStorage.getItem("profilePic")}
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
        </ListItem>

        <ListItemText>
          <Grid container justifyContent="center">
            {localStorage.getItem("name")}
          </Grid>
          <Grid container justifyContent="center">
            {localStorage.getItem("email")}
          </Grid>
        </ListItemText>
      </List>

      <Divider />
    </Box>
  );
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const drawerWidth = 300;

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{background:"#2B4D59"}}>
          <Toolbar>
            {["lefdf"].map((anchor) => (
              <React.Fragment key={anchor}>
                <MenuIcon onClick={toggleDrawer(anchor, true)} />

                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                  <List
                    sx={{
                      // selected and (selected + hover) states
                      "&& .Mui-selected, && .Mui-selected:hover": {
                        bgcolor: "red",
                        "&, & .MuiListItemIcon-root": {
                          color: "pink",
                        },
                      },
                      // hover states
                      "& .MuiListItemButton-root:hover": {
                        bgcolor: "#FFAA67",
                        "&, & .MuiListItemIcon-root": {
                          color: "#FFDC7C",
                        },
                      },
                    }}
                  >
                    <ListItem>
                      <ListItemButton to="/home">
                        <HomeOutlinedIcon />
                        <ListItemText sx={{ ml: 2 }}>
                          <label className="primary-button">Home</label>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton to="/favorite">
                        <BookmarkBorderRoundedIcon />
                        <ListItemText sx={{ ml: 2 }}>
                          <label className="primary-button">Favorite</label>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>

                    {data_api ? (
                      <ListItem>
                        <ListItemButton to="/l_list">
                          <ListAltRoundedIcon />
                          <ListItemText sx={{ ml: 2 }}>
                            <label className="primary-button">Lecturer</label>
                          </ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ) : (
                      ""
                    )}

                    <ListItem>
                      <ListItemButton to="/" onClick={Logout}>
                        <LogoutRoundedIcon />
                        <ListItemText sx={{ ml: 2 }}>
                          <label className="primary-button">Log out</label>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Drawer>
              </React.Fragment>
            ))}

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
