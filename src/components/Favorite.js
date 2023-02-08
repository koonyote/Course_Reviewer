import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "@mui/material";
import FavoriteList from "./FavoriteListCourse";
import Navbar from "./Navbar";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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

export default function Favorite_page() {
    const [value, setValue] = React.useState(0);
    return (
        <ThemeProvider theme={theme}>
            <Navbar> </Navbar>
            <CssBaseline />
            {/* <main> */}
            {/* Hero unit */}
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
                    >
                        Favorite
                    </Typography>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    ></Stack>
                </Container>
            </Box>
            {/* Content */}
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
                <FavoriteList/>
            </Container>
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
                  
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
        
    );
}