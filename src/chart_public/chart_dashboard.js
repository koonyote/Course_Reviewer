import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery"; // ตัวจัด Fullscreen
import ChartPie from "./chart_piechart";
import ChartRadial from "./chart_radialbar";
import ChartBarFavourite from "./chart_barchatFavourite";
import domain_server from "../config.json";
import Chart from "../admin/dashbard_coponents/Chart";
import Navbar from "../components/Navbar";
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

export default function ChartDashboardPublic() {
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [data_api, set_data_api] = React.useState('')
    React.useEffect(() => {
        const api = async () => {
            const token = localStorage.getItem("token");
            const API = await fetch(`${domain_server.domain}/chart-public`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "*",
                    "User-Agent": "Custom",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            const data = await API.json();
            if (API.status == 200) set_data_api(data);
        };
        window.setTimeout(() => {
            api();
        }, 500);
    }, []);
    console.log(data_api)
    return (
        <>
        <Navbar />
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Hero unit ส่วนหัวด้านบน */}
            {/* <Box
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
                        Dashboard
                    </Typography>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    ></Stack>
                </Container>
            </Box> */}
            {/* End hero unit */}
            {/* Content */}
            <Container
                sx={{
                    mt: 12,
                    py: 3,
                    border: 0,
                    borderRadius: 3,
                    boxShadow: 10,
                    marginBottom: 10,
                }}
                maxWidth="md"
                style={{ backgroundColor: "#F1F1F1" }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{}}>
                        <Grid item xs={12} md={8} lg={8}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 240,
                                    // border: 2
                                }}
                            >
                                <ChartRadial data={data_api.score_detal} />
                                {/* <CircularProgress size={100} /> */}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 240,
                                }}
                            >
                                <ChartPie data={data_api.score_count}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 240,
                                }}
                            >
                                <Chart data={data_api.course_comment} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 240,
                                }}
                            >
                                <ChartBarFavourite data={data_api.course_favorite} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
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
        </>
    );
}
