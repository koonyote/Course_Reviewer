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
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import domain_server from "../config.json";
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
import config from "../config.json";
import Textarea from "@mui/joy/Textarea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Swal from 'sweetalert2';
import Link from "@mui/material/Link";
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

export default function LT_List_Page() {
  const columns = [
    { id: "course_id", label: "Course\u00a0Code", minWidth: 60, align: "left" },
    { id: "name_th", label: "Name\u00a0TH", minWidth: 100, align: "left" },
    { id: "name_en", label: "Name\u00a0EN", minWidth: 100, align: "left" },
    { id: "description", label: "Discription", minWidth: 150, align: "left" },
    { id: "edit", label: <Button variant="outlined" sx={{backgroundColor: '#ffffff'}} onClick={()=> {handleClickOpen()}} ><AddIcon/></Button> , minWidth: 30, align: "center" },
  ];
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
   setOpen(false);
    const body1 = JSON.stringify(param);
    console.log(body1);
    const API = await fetch(`${config.domain}/add-course`, {
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
     set_effect(effect + 1);
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
    const API = await fetch(`${config.domain}/add-course-discription`, {
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
    const API = await fetch(`${config.domain}/add-course-discription`, {
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
 
  return (
    <>
      <Navbar></Navbar>
      <center>
        <Paper
          sx={{ width: "100%", overflow: "hidden", mt: 10 }}
          style={{
            width: '80%',
            
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
                          <TableCell >
                            {row.description === ""
                              ? "ไม่มีข้อมูล"
                              : row.description}
                          </TableCell>
                          <TableCell align="center">
                            {row.description === "" ? (
                              <Button variant="outlined" color="success"
                              onClick={() => {
                                handleClickOpenDis(row.course_id);
                              }}>
                              <AddIcon
                              />
                              </Button>


                            ) : (
                              <Button variant="outlined" color="warning" 
                              onClick={() => {
                                handleClickOpenUpdateDescription(
                                  row.course_id,row.description
                                );
                              }}>
                              <EditIcon/>
                              </Button>
                            )}

                            <div>
                              <Dialog
                                open={openUpdateDescription}
                                onClose={handleCloseUpdateDescription}
                                align="center"
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                sx={{
                                  "& .MuiDialog-container": {
                                    "& .MuiPaper-root": {
                                      width: "100%",
                                      maxWidth: "700px", // Set your width here
                                    },
                                  },
                                }}
                              >
                                <DialogTitle id="alert-dialog-title"></DialogTitle>
                                <DialogContent key={row.course_id}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                      <h1>Update Discription</h1>
                                 
                                      
                                      <form noValidate autoComplete="off">
                                        <TextField
                                          id="Course_id"
                                          label="รหัสวิชา"
                                          value={courseIdFromTable}
                                          onChange={handleChange_add_c_id}
                                          disabled
                                          sx={{
                                            p: 1,
                                            width: "80%",
                                            mt: 2,
                                          }}
                                        />
                                      </form>
                                     
                                        <Textarea
                                          id="update_c_des"                               
                                          value={up_c_des}
                                          defaultValue={courseDesFromTable}
                                          onChange={handleChange_up_c_des}
                                          minRows={3}
                                          fullwidth
                                          sx={{
                                            backgroundColor: "#F5F5F5",
                                            borderColor: "#EBEBEB",
                                            p: 1,
                                            mt: 4,
                                            height: 150,
                                            width: "78%",
                                          }}
                                        > </Textarea>
                                      
                                      <Button
                                        onClick={call_api_update_des}
                                        variant="contained"
                                        sx={{ width: 300, mt: 3, mb: 2 }}
                                      >
                                        Update description
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleCloseUpdateDescription}>
                                    cancle
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>

                            <div>
                              <Dialog
                                open={openDis}
                                onClose={handleCloseDis}
                                align="center"
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                sx={{
                                  "& .MuiDialog-container": {
                                    "& .MuiPaper-root": {
                                      width: "100%",
                                      maxWidth: "700px", // Set your width here
                                    },
                                  },
                                }}
                              >
                                <DialogTitle id="alert-dialog-title"></DialogTitle>
                                <DialogContent key={row.course_id}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                      <h1>Add Discription</h1>
                                      
                                      <form noValidate autoComplete="off">
                                        <TextField
                                          id="Course_id"
                                          label="รหัสวิชา"
                                          value={courseIdFromTable}
                                          onChange={handleChange_add_c_id}
                                          disabled
                                          sx={{
                                            p: 1,
                                            width: "80%",
                                            mt: 2,
                                          }}
                                        />
                                      </form>
                                      <form noValidate autoComplete="off">
                                        <Textarea
                                          id="add_c_des"
                                          placeholder="รายละเอียดเกี่ยวกับวิชา"
                                          value={add_c_des}
                                          onChange={handleChange_add_c_des}
                                          minRows={3}
                                          fullwidth
                                          sx={{
                                            backgroundColor: "#F5F5F5",
                                            borderColor: "#EBEBEB",
                                            p: 1,
                                            mt: 4,
                                            height: 150,
                                            width: "80%",
                                          }}
                                        />
                                      </form>
                                      <Button
                                        onClick={call_api_add}
                                        variant="contained"
                                        sx={{ width: 300, mt: 3, mb: 2 }}
                                      >
                                        Add description
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleCloseDis}>
                                    cancle
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
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
          
          
        </Paper><Copyright sx={{ mt: 3 }} />
      </center>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          align="center"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "700px", // Set your width here
              },
            },
          }}
        >
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h1>Add Course</h1>

                <form noValidate autoComplete="off">
                  <TextField
                    id="c_id"
                    label="รหัสวิชา"
                    value={c_id}
                    onChange={handleChange_c_id}
                    sx={{
                      p: 1,
                      width: "80%",
                      mt: 2,
                    }}
                  />
                </form>
                <form noValidate autoComplete="off">
                  <TextField
                    id="c_name_th"
                    label="ชื่อวิชา"
                    value={c_name_th}
                    onChange={handleChange_c_name_th}
                    sx={{
                      p: 1,
                      width: "80%",
                      mt: 2,
                    }}
                  />
                </form>
                <form noValidate autoComplete="on">
                  <TextField
                    id="c_name_en"
                    label="Course name"
                    value={c_name_en}
                    onChange={handleChange_c_name_en}
                    sx={{
                      p: 1,
                      width: "80%",
                      mt: 2,
                    }}
                  />
                </form>
                <form noValidate autoComplete="off">
                  <Textarea
                    id="c_des"
                    placeholder="รายละเอียดเกี่ยวกับวิชา"
                    value={c_des}
                    onChange={handleChange_c_des}
                    minRows={3}
                    fullwidth
                    sx={{
                      backgroundColor: "#F5F5F5",
                      borderColor: "#EBEBEB",
                      p: 1,
                      mt: 4,
                      height: 150,
                      width: "80%",
                    }}
                  />
                </form>
                <Button
                  onClick={call_api}
                  variant="contained"
                  sx={{ width: 300, mt: 3, mb: 2 }}
                >
                  Add Course
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              cancle
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* Dialog Add course */}
    </>
  );
}
