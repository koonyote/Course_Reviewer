import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import domain_server from "../config.json";
import Navbar from "./Navbar"
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
const columns = [
    { id: 'course_id', label: 'Course', minWidth: 60, align: 'justify' },
    { id: 'course_name_en', label: 'Name TH', minWidth: 100, align: 'justify' },
    { id: 'message', label: 'Message', minWidth: 100, align: 'justify' },
    { id: 'identify', label: 'Identity', minWidth: 50, align: 'center' },
    { id: 'create_at', label: 'Date', minWidth: 50, align: 'center' },
];

function TableHistory() {
    const [data_api, set_data_api] = React.useState()
    const [rows, setRows] = React.useState();
    useEffect(() => {
        const api = async () => {
            const token = localStorage.getItem("token");
            const API = await fetch(`${domain_server.domain}/my-history`, {
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
            if (API.status === 200) {
                set_data_api(data);
                setRows(data)
            }
        };
        // api()
        window.setTimeout(() => {
            api();
        }, 1000);
    }, []);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        console.log(newPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 650 }}>

                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth , backgroundColor:"#39998E",color:"white",fontWeight:'bold'}}
                                    >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows ? rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                        <Link href={`${ProductLink.comment}/${row.course_id}`} underline="hover" color="#174468"> {row.course_id} </Link>
                                        </TableCell>
                                        <TableCell align="justify">
                                        <Link href={`${ProductLink.comment}/${row.course_id}`} underline="hover" color="#174468"> {row.course_name_th} </Link> 
                                        </TableCell>
                                        <TableCell align="justify" sx={{ color: "#174468"}}>{row.message}</TableCell>
                                        <TableCell align="center">
                                            { (typeof row.identify == 'boolean' && row.identify == true)  ? '✅' : '❌' }
                                        
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: "#174468"}}>{row.create_at}</TableCell>
                                    </TableRow>
                                );
                            }) :
                            <TableRow sx={{ align: 'center' }}>

                                <TableCell align='center' colSpan={5}>
                                    <Box >
                                        <CircularProgress size={100} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {typeof data_api !== 'undefined' && (
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data_api.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            )}
        </Paper>
    );
}

export default function Histrory_Page() {
    return (
        <>
        <Navbar />
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
                        color="#173F5F"
                        gutterBottom
                    // sx={{ fontWeight: 'medium'  }}
                    >
                        My History
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
                <TableHistory />
                {/* <Typography variant="h6" align="center" gutterBottom>
                    "Empty"
                </Typography> */}


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

