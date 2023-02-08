import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import config from "../config.json";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";

export default function TemporaryDrawer() {
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
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ marginTop: "10%" }}>
        <ListItem disablePadding>
          <Grid container justifyContent="center">
            <Avatar alt="Remy Sharp" src={localStorage.getItem("profilePic")} />
          </Grid>
        </ListItem>
        <ListItemText>
          <label>{localStorage.getItem("name")}</label>
          <br />
          <label>{localStorage.getItem("email")}</label>
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
        <AppBar position="static">
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
              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemText>
                      {" "}
                      <Link to="/home">
                        <label className="primary-button">home</label>
                      </Link>{" "}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemText>
                      {" "}
                      <Link to="/favorite">
                        <label className="primary-button">favorite</label>
                      </Link>{" "}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>

                {data_api ? (
                  <ListItem>
                    <ListItemButton>
                      <ListItemText>
                        {" "}
                        <Link to="/lecturer">
                          <label className="primary-button">Lecturer</label>
                        </Link>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ) : (
                  ""
                )}

                <ListItem>
                  <ListItemButton>
                    <ListItemText>
                      {" "}
                      <Link to="/" onClick={Logout}>
                        <label className="primary-button">Log out</label>
                      </Link>{" "}
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
