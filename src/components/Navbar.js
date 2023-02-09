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
import Drawer from "@mui/material/Drawer";
import DehazeIcon from "@mui/icons-material/Dehaze";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from "react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import { SignOut } from "../services/firebase";
import PieChartOutlineRoundedIcon from "@mui/icons-material/PieChartOutlineRounded";
import Button from "@mui/material/Button";
import { ProductLink } from "..";
import config from "../config.json";
export default function PersistentDrawerLeft() {
  const [data_api, set_data_api] = React.useState();
  const [data_Role, set_data_role] = React.useState();
  const Role = localStorage.getItem("Role");

  function Logout() {
    SignOut();
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
    if (Role === "officer") {
      set_data_role(Role);
      console.log(data_Role);
    } else {
      set_data_role("");
      console.log(data_Role);
    }
  });

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 270,
        backgroundColor: "#779ECC",
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
      <Box sx={{ flexGrow: 1, my: 6 }}>
        <AppBar position="fixed" sx={{ background: "#779ECC" }}>
          <Toolbar>
            {["lefdf"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <MenuIcon sx={{ color: "white", fontSize: "30px" }} />
                </Button>
                <Box
                  component="span"
                  sx={{ display: { xs: "none", lg: "block", xl: "block" } }}
                >
                  <Button
                    onClick={() => {
                      window.location.replace(ProductLink.home);
                    }}
                  >
                    <img
                      style={{
                        width: 120,
                        height: 45,
                        marginLeft: 20,
                      }}
                      src="https://media.discordapp.net/attachments/1069520916326907934/1072556710314659911/1.png?width=1440&height=583"
                    ></img>
                  </Button>
                </Box>

                <Typography
                  component="h5"
                  variant="h5"
                  align="center"
                  color="white"
                  gutterBottom
                  sx={{ mt: 1, ml: 1, display: "flex" }}
                ></Typography>
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
                        bgcolor: "#FFB347",
                        "&, & .MuiListItemIcon-root": {
                          color: "white",
                        },
                      },
                    }}
                  >
                    <ListItem>
                      <ListItemButton to={ProductLink.home}>
                        <HomeOutlinedIcon />
                        <ListItemText sx={{ ml: 2 }}>
                          <label className="primary-button">Home</label>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton to={ProductLink.profile}>
                        <PermIdentityRoundedIcon />
                        <ListItemText sx={{ ml: 2 }}>
                          <label className="primary-button">Profile</label>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton to={ProductLink.chart}>
                        <PieChartOutlineRoundedIcon />
                        <ListItemText sx={{ ml: 2 }}>
                          <label className="primary-button">Chart</label>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>

                    {data_Role ? (
                      <ListItem>
                        <ListItemButton to={ProductLink.lecturer}>
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
                      <ListItemButton to={ProductLink.favorite}>
                        <BookmarkBorderRoundedIcon />
                        <ListItemText sx={{ ml: 2 }}>
                          <label className="primary-button">Favorite</label>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton to={ProductLink.history}>
                        <HistoryRoundedIcon />
                        <ListItemText sx={{ ml: 2 }}>
                          <label className="primary-button">History</label>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>

                    <ListItem>
                      <ListItemButton to={ProductLink.default} onClick={Logout}>
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
