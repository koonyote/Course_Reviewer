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

const columns = [
    { id: 'course_id', label: 'Course\u00a0Code', minWidth: 60, align: 'center' },
    { id: 'name_th', label: 'Name\u00a0TH', minWidth: 100, align: 'left' },
    { id: 'name_en', label: 'Name\u00a0EN', minWidth: 100, align: 'left' },
    { id: 'description', label: 'Discription', minWidth: 150, align: 'center' },
];

export default function TableCourse() {
    const [data_api, set_data_api] = React.useState()
    useEffect(() => {
        const api = async () => {
            const token = localStorage.getItem("token");
            const API = await fetch(`${domain_server.domain}/admin-list-course`, {
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
            if (API.status === 200) set_data_api(data);
            //   else alert('Get API Error')
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

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                        {data_api ? data_api
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
                                                    {value == '' ? 'ไม่มีข้อมูล' : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            }) :
                            // 'Error'
                            <TableRow sx={{ align: 'center' }}>

                                <TableCell align='center' colSpan={4}>
                                    <Box >
                                        <CircularProgress size={100} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            { typeof data_api!=='undefined'&&( 
                 <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data_api.length} 
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage} /> 
                ) }
        </Paper>
    );
}