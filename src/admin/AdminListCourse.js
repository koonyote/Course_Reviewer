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
import domain_server from "../config.json";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const columns = [
    { id: 'course_id', label: 'Course\u00a0Code', minWidth: 60, align: 'center' },
    { id: 'name_th', label: 'Name\u00a0TH', minWidth: 100, align: 'left' },
    { id: 'name_en', label: 'Name\u00a0EN', minWidth: 100, align: 'left' },
    { id: 'description', label: 'Discription', minWidth: 150, align: 'center' },
];

export default function TableListCourse() {
    const [data_api, set_data_api] = React.useState()
    useEffect(() => {
        const api = async () => {
            const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1NWU0ZDkxOGE0ODY0YWQxMzUxMDViYmRjMDEwYWY5Njc5YzM0MTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY291cnNlLXJldmlld2VyLTUzYjE4IiwiYXVkIjoiY291cnNlLXJldmlld2VyLTUzYjE4IiwiYXV0aF90aW1lIjoxNjczNzc3NTU1LCJ1c2VyX2lkIjoicTZyYnhtaUd5cmNnNkVPcWdzWFVLZ3lpZGNCMiIsInN1YiI6InE2cmJ4bWlHeXJjZzZFT3Fnc1hVS2d5aWRjQjIiLCJpYXQiOjE2NzM3Nzc1NTUsImV4cCI6MTY3Mzc4MTE1NSwiZW1haWwiOiJ0ZXN0MDFAbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDAxQG1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Xhhm0WVdTT9lDxQodGSVavj48HNrmCNCIdb7qkTXF46GVN3Tkq7vPug5efIFiRNV_I4WzFTOYjuFNtSMil9TuoCbbQAO9g2Qt8XlE800K0t5xS3FOQYQrGzEbSBqItCJbJyT-QsaD5i2zNbmoBzcCVaAB8k3C8SXFM0MtrL9lO1uWggLMsmj0iufgOG7peOyW8wLJ-Xra18EO-jSRweKLU3oLvCPkm4bRqeJo6yKgxT_1V9p8xF_G7ayxY-WMblmjS_a74Hj74bGwhV0uDi-uHTvIIsmj4BdhFahjcYJcDgb8M6QssrhoIuo8VQPTuXEq-qDmQk9DEj7DSVlJ8iq_g'
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
            <TableContainer sx={{ maxHeight: 440 }}>
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
            {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data_api.length 
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
        </Paper>
    );
}