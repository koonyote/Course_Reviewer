import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";
import domain_server from "../../config.json";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Textarea from "@mui/joy/Textarea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Swal from 'sweetalert2';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

const columns = [
  { id: "course_id", label: "Course\u00a0Code", minWidth: 60, align: "center" },
  { id: "name_th", label: "Name\u00a0TH", minWidth: 100, align: "left" },
  { id: "name_en", label: "Name\u00a0EN", minWidth: 100, align: "left" },
  { id: "description", label: "Discription", minWidth: 150, align: "center" },
  { id: "edit", label: "", minWidth: 30, align: "center" },
];

export default function TableCourse() {
  let [effect, set_effect] = React.useState(0);
  const [data_api, set_data_api] = React.useState();


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
          Accept: "application/json",
        },
      });
      const data = await API.json();
      console.log(data);
      if (API.status === 200) {
        set_data_api(data);
        setRows(data);
      }
    };
    // api()
    window.setTimeout(() => {
      api();
    }, 1000);
  }, [effect]);
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
    let searchedVal = event.target.value;
    console.log(searchedVal);

    setSearched(searchedVal);
    const filter = data_api.filter((row) => {
      return (
        row.name_en.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.name_th.includes(searchedVal) ||
        row.course_id.includes(searchedVal)
      );
    });
    setRows(filter);
  };

  const [open, setOpen] = React.useState(false);

  const [openDis, setOpenDis] = React.useState(false);
  const [courseIdFromTable, setCourseIdFromTable] = React.useState();
  const handleClickOpenDis = (params) => {
    setCourseIdFromTable(params);
    setOpenDis(true);
  };

  const handleCloseDis = () => {
    setOpenDis(false);
  };
  //
  const [courseDesFromTable, setCourseDesFromTable] = React.useState();
  const [openUpdateDescription, setOpenUpdateDescription] =
    React.useState(false);
  const handleClickOpenUpdateDescription = (code, desc) => {
    setCourseIdFromTable(code);
    setCourseDesFromTable(desc);

    setOpenUpdateDescription(true);
  };

  const handleCloseUpdateDescription = () => {
    setOpenUpdateDescription(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // add course
  async function call_api() {
    const token = localStorage.getItem("token");
    let param = {
      id: c_id,
      name_th: c_name_th,
      name_en: c_name_en,
      discription: c_des,
    };
   
    const body1 = JSON.stringify(param);
    console.log(body1);
    const API = await fetch(`${domain_server.domain}/add-course`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: body1,
    });

    if (API.status == 200) {
      Swal.fire({
        icon: 'success',
       title: 'เพิ่มรายวิชาสำเร็จ',
       showConfirmButton: false,
       timer: 1500,
     })
      
    } else {
      Swal.fire({
        icon: 'error',
       title: 'เพิ่มรายวิชาไม่สำเร็จ',
       showConfirmButton: false,
       timer: 1500,
     })
      
    }
 
    console.log(API.status, body1);
    const jsonData = await API.json();
  }

  //add description
  async function call_api_add() {
    const token = localStorage.getItem("token");
    let param2 = {
      course_id: courseIdFromTable,
      discription: add_c_des,
    };
    setOpenDis(false);
    const body2 = JSON.stringify(param2);
    console.log(body2);
    const API = await fetch(`${domain_server.domain}/add-course-discription`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: body2,
    });

    if (API.status == 200) {
      Swal.fire({
        icon: 'success',
       title: 'เพิ่มรายละเอียดวิชาสำเร็จ',
       showConfirmButton: false,
       timer: 1500,
     })
      
    } else {
      Swal.fire({
        icon: 'error',
       title: 'เพิ่มรายละเอียดวิชาไม่สำเร็จ',
       showConfirmButton: false,
       timer: 1500,
     })
     
    }

    console.log(API.status, body2);
    const jsonData = await API.json();
  }
  //useEffect(() => {},[]);
  //update description
  async function call_api_update_des() {
    
    const token = localStorage.getItem("token");
    let param3 = {
      course_id: courseIdFromTable,
      discription: up_c_des,
    };
    setOpenUpdateDescription(false);
    const body3 = JSON.stringify(param3);
    console.log(body3);
    const API = await fetch(`${domain_server.domain}/add-course-discription`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: body3,
    });
    

    if (API.status == 200) {
      Swal.fire({
        icon: 'success',
        title: 'อัพเดทละเอียดวิชาสำเร็จ',
        showConfirmButton: false,
        timer: 1500,
      })    
      set_effect(effect + 1);
    } else {
      Swal.fire({ 
        icon: 'error',
       title: 'อัพเดทละเอียดวิชาไม่สำเร็จ',
       showConfirmButton: false,
       timer: 1500,
     })
    
    }

    console.log(API.status, body3);
    const jsonData = await API.json();
  }






  const [c_id, setCID] = useState();
  const handleChange_c_id = (event) => {
    setCID(event.target.value);
    //console.log(event.target.value);
  };

  const [c_name_th, setCTH] = useState();
  const handleChange_c_name_th = (event) => {
    setCTH(event.target.value);
   
  };

  const [c_name_en, setCEN] = useState();
  const handleChange_c_name_en = (event) => {
    setCEN(event.target.value);
  
  };

  const [c_des, set_c_des] = React.useState();
  const handleChange_c_des = (event) => {
    set_c_des(event.target.value);
   
  };
  //console.log("sadsa", data_api);

  //add dis
  const [add_c_id, setCID_ADD] = useState();
  const handleChange_add_c_id = (event) => {
    setCID_ADD(event.target.value);
  
  };
  const [add_c_des, set_c_des_add] = React.useState();
  const handleChange_add_c_des = (event) => {
    set_c_des_add(event.target.value);
  
  };

  //
  const [up_c_des, set_up_c_des] = React.useState();
  const handleChange_up_c_des = (event) => {
    set_up_c_des(event.target.value);
   
  };

  const Swal = require('sweetalert2')


  //delete course
  async function call_api_delete(code_delete) {
    const token = localStorage.getItem("token");
    let param_delete = {
      course_id: code_delete,     
    };
 
    const body_delete = JSON.stringify(param_delete);
    Swal.fire({
        title: 'Are you sure to delete Course?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            
            console.log(param_delete);
            const API =  fetch(`${domain_server.domain}/delete-course`, {
              method: "delete",
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "*",
                "User-Agent": "Custom",
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: body_delete,
            });
              Swal.fire({
                icon: 'success',
                title: 'ลบวิชาสำเร็จ',
                showConfirmButton: false,
                timer: 1500,
              })    
              
           
            set_effect(effect + 1);
            
            const jsonData =  API.json();
        }
      })

    
  }
 
  return (
    <>
      {/* <Navbar></Navbar> */}
      <center>
        <Paper
          sx={{ width: "100%", overflow: "hidden", mt: -6 }}
          style={{
            backgroundColor:"#F9F9F9"
          }}
          
        >
          {/* จัดให้ไปอยู่ทางขวา */}
          {/* <Box margin={2} border={2} >  */}
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              width: "auto",
              border: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
              marginBottom: 1,
            }}
          >
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
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          {/* </Box> */}

          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow> 
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth,backgroundColor:"#39998E",color:"white" }}
                      sx={{ fontWeight: 'bold' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.course_id}
                        >
                          <TableCell>{row.course_id}</TableCell>
                          <TableCell>{row.name_th}</TableCell>
                          <TableCell>{row.name_en}</TableCell>
                          <TableCell>
                            {row.description === ""
                              ? "ไม่มีข้อมูล"
                              : row.description}
                          </TableCell>
                          <TableCell>
                              <Button variant={"outlined"} color="error"
                              onClick={() => {
                                console.log(row.course_id)
                                call_api_delete(row.course_id)
                            //   handleClickOpenDis(row.course_id);
                            }}>
                                <DeleteOutlineRoundedIcon
                              />
                              </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  // 'Error'
                  <TableRow sx={{ align: "center" }}>
                    <TableCell align="center" colSpan={5}>
                      <Box>
                        <CircularProgress size={100} />
                      </Box>
                    </TableCell>
                  </TableRow>
                  
                )}
              </TableBody>
            </Table>
           
          </TableContainer>
          <Box sx={{ display: 'flex' }}>
         
          {typeof data_api !== "undefined" && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data_api.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            
          )}
           
          </Box>
          
          
        </Paper>
      </center>

    </>
  );
}
