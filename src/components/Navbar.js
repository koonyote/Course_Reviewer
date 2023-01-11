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
import { Drawer, ButtonToolbar, Button, Placeholder } from "rsuite";
import DehazeIcon from "@mui/icons-material/Dehaze";
import MenuIcon from "@mui/icons-material/Menu";

export default function PersistentDrawerLeft() {
  const [openWithHeader, setOpenWithHeader] = React.useState(false);
  function Logout() {
    return localStorage.clear();
  }
  const drawerWidth = 240;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
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
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
               <MenuIcon onClick={() => setOpenWithHeader(true)} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
           
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
        <Drawer.Header>
          <Drawer.Title></Drawer.Title>
          <Drawer.Actions>
            <List style={{ marginTop: "20%" }}>
              <ListItem disablePadding>
                <Grid container justifyContent="center">
                  <Avatar
                    alt="Remy Sharp"
                    src={localStorage.getItem("profilePic")}
                  />
                </Grid>
              </ListItem>
              <ListItemText>
                <label>{localStorage.getItem("name")}</label>
                <br />
                <label>{localStorage.getItem("email")}</label>
              </ListItemText>
            </List>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
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
                  <Link to="/" onClick={Logout}>
                    <label className="primary-button">Log out</label>
                  </Link>{" "}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer.Body>
      </Drawer>
    </>
  );
}
