import * as React from 'react';
import { useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import domain_server from "../../config.json";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const columns = [
    { id: 'email', label: 'Email', minWidth: 60, align: 'justify' },
    { id: 'username', label: 'Username', minWidth: 100, align: 'justify' },
    { id: 'name', label: 'Name', minWidth: 100, align: 'justify' },
    { id: 'gender', label: 'Gender', minWidth: 50, align: 'center' },
    { id: 'role', label: 'Status', minWidth: 50, align: 'center' },
];

export default function TableMember() {
    const [data_api, set_data_api] = React.useState()
    useEffect(() => {
        const api = async () => {
            const token = localStorage.getItem("token");
            const API = await fetch(`${domain_server.domain}/admin-list-member`, {
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
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    //  ---------------------------------------------- Search Section 
    const [rows, setRows] = React.useState();
    const [searched, setSearched] = React.useState("");

    const requestSearch = (event) => {
        //  น่าจะใส่ Option Search ตรงนี้ได้ 
        let searchedVal = event.target.value
        console.log(searchedVal)
        setSearched(searchedVal)
        const filter = data_api.filter((row) => {
            // return row.name.toLowerCase().includes(searchedVal.toLowerCase());
            return (
                row.email.toLowerCase().includes(searchedVal.toLowerCase()) || 
                row.username.toLowerCase().includes(searchedVal.toLowerCase()) || 
                row.name.toLowerCase().includes(searchedVal.toLowerCase()) || 
                row.gender.toLowerCase().includes(searchedVal.toLowerCase()) || 
                row.role.toLowerCase().includes(searchedVal.toLowerCase()) 
            )
        });;
        setRows(filter)
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {/* จัดให้ไปอยู่ทางขวา */}
            {/* <Box margin={2} border={2} >  */}
            <Paper
                component="form"
                sx={{ p: '2px 4px', width: 'auto' , border: 0 , display: 'flex', alignItems: 'center', justifyContent: 'right' , marginBottom: 1}}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <InputBase
                    value={searched}
                    onChange={requestSearch}
                    // onChange={ (e) => {
                    //     e.target.value ? requestSearch(e.target.value) : cancelSearch()
                    // }}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    // inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            {/* </Box> */}
            

            <TableContainer sx={{ maxHeight: 650 }}>

                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.course_id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {/* {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value} */}
                                                    {value === '' ? 'ไม่มีข้อมูล' : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            }) :
                            // 'Error'
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

