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
import Admin_Dashboard from "./dashbard_coponents/Dashboard_Component";
// Table Import
import TableCourse from "./table_components/table_course";
import TableMember from "./table_components/table_user";
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

export default function Admin_Table( ) {
    function get_path_from_url() {
        let path = window.location.pathname.split("/");
        // return path[4]
        
        return path[5] // production
        // Production return because it has prefix
         
    }
    const path_url = get_path_from_url()
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
                        // sx={{ fontWeight: 'medium'  }}
                    >
                                            { path_url == 'course' ? 'Course Table' : 
                        path_url == 'member' ? 'Member Table' : 
                        'Error' }
                    </Typography>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    ></Stack>
                </Container>
            </Box>
            {/* End hero unit */}
            {/* Content */}
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
                    { path_url == 'course' ? <TableCourse/> : 
                        path_url == 'member' ? <TableMember/> : 
                        'Error' }
            </Container>
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
