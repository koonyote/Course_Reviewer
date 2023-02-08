import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from '@mui/material/CardHeader';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import config from "../config.json";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from '@mui/material/LinearProgress';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Navbar from "../components/Navbar";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Box from "@mui/joy/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Edit } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import MediaCourseDetail from "./CardDetail";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Swal from 'sweetalert2';

//Dialog Sort Option
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import Paper from "@mui/material/Paper";

const options = ["เรียงลำดับปกติ", "เรียงตามจำนวนถูกใจ", "เรียงตามจำนวนการสนับสนุน"];


export default function Comment_page() {
  let [comment_api, set_comment_api] = React.useState();
  
  let [effect, set_effect] = React.useState(0);
  let [frist_time, set_first_time] = React.useState(true);
  const token = localStorage.getItem("token");
  function get_path_from_url() {
    let course_code = window.location.pathname.split("/");
    // return course_code[2]
    return course_code[3] // production
    // Production return because it has prefix
  }
  const path = get_path_from_url()
  const [add_comment, set_add_Comment] = React.useState();
  const [checkDisplayName, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange_add_comment = (event) => {
    set_add_Comment(event.target.value);
  };

  const [Edit_comment, set_Edit_Comment] = React.useState();
  const handleChange_edit_comment = (event) => {
    set_Edit_Comment(event.target.value);
  };



  useEffect(() => {
    const api = async () => {
      const API = await fetch(`${config.domain}/list-comment/${path}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "*",
          "User-Agent": "Custom",
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST",
        },
      });
      const data = await API.json();
      if (API.status === 200) {
        if (frist_time) {
          window.setTimeout(() => {
            set_first_time(false);
            set_comment_api(data);
          }, 1000);
        } else {
          set_comment_api(data);
        }
      }
    };
    api();
  }, [effect]); // call api | useEffect will trigger whenever variable is different.


  async function Onclick_Like(event, param_comment_id, available) {
    // หาก True ให้ไป Like | หาก false ให้ไป Delete
    if (available) {
      await fetch(`${config.domain}/add-like`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "*",
          "User-Agent": "Custom",
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          comment_id: param_comment_id,
        }),
      });
      set_effect(effect + 1);
    } else {
      await fetch(`${config.domain}/delete-like`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "*",
          "User-Agent": "Custom",
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          comment_id: param_comment_id,
        }),
      });
      set_effect(effect + 1);
    }
  }

  const [alertSwtich, setAlert] = useState(false)
  async function API_Add_Comment(event) {
    const send = await fetch(`${config.domain}/add-comment`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        course_id: path,
        message: add_comment,
        identify: checkDisplayName,
      }),
    });
    // console.log(send.status)
    if (send.status === 200) {
      setAlert(true)
      window.setTimeout(() => {
        setAlert(false)
        set_add_Comment("")
      }, 1500);
    }
    set_effect(effect + 1);
  }

  async function API_Delect_Comment(param_comment_id) {
    const API = await fetch(`${config.domain}/delete-comment`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        course_id: path,
        comment_id: param_comment_id,
      }),
    });
    if (API.status === 200) {
      Swal.fire({
        icon: "success",
        title: "ลบ Comment สำเร็จ",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "ลบ Comment ไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    set_effect(effect + 1);
  }

  const [dialogLoading, setDialogLoading] = React.useState(false)
  async function API_Update_Comment() {
    const API = await fetch(`${config.domain}/update-comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: Edit_comment,
        course_id: tempEditComment.course_id,
        comment_id: tempEditComment.comment_id,
      }),
    });

    if (API.status === 200) {
      setOpenDialogChangeComment(false)
      setDialogLoading(false)
      Swal.fire({
        icon: 'success',
        title: 'อัพเดทสำเร็จ',
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      setDialogLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'อัพเดทไม่สำเร็จ',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    set_effect(effect + 1);
  }

  async function Onclick_Aprove(code, option, permission) {
    if (permission) {
      if (option == true) {
        await fetch(`${config.domain}/add-approve`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "*",
            "User-Agent": "Custom",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            comment_id: code,
          }),
        });
      } else if (option == false) {
        await fetch(`${config.domain}/delete-approve`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "*",
            "User-Agent": "Custom",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            comment_id: code,
          }),
        });
      }
      set_effect(effect + 1);
    }
  }

  const [openDialogChangeComment, setOpenDialogChangeComment] = React.useState(false);
  const [tempEditComment, setTempEditComment] = React.useState();
  const handleOpenDialogChengeComment = (parameter) => {
    console.log(parameter)
    setTempEditComment(parameter)
    setOpenDialogChangeComment(true);
  };

  const handleCloseDialogComment = () => {
    setOpenDialogChangeComment(false);
  };

  const [courseDetail, setCourseDetail] = useState()
  useEffect(() => {
    const api = async () => {
      const token = localStorage.getItem("token");
      const API = await fetch(`${config.domain}/course-detail/${path}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "*",
          "User-Agent": "Custom",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST",
        },
      });
      const data = await API.json();

      if (data.CODE && data.NAME_TH && data.UNIT) {
        setCourseDetail(data);
      } else {
        setCourseDetail({ CODE: data.CODE })
      }
    };
    window.setTimeout(() => {
      api()
    }, 500);
  }, []);
  const Swal = require('sweetalert2')

  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // const [test, setTest] = React.useState(true);
  
  const optionMethod = (index) => {
    // setTest(false);
    const data = comment_api;
    let results;
    if (index == 1) {
      results = data.sort((a, b) => {
        if (a.like > b.like) {
          return -1;
        }
      });
    } else if (index == 2) {
      results = data.sort((a, b) => {
        if (a.approve > b.approve) {
          return -1;
        }
      });
    } else if (index == 0) {
      // results = comment_api_temp;
      // comment_id
      results = data.sort((a, b) => {
        if (a.comment_id < b.comment_id) {
          return -1;
        }
      });
      // set_effect(effect + 1);
      // console.log("index 0")
    }
    set_comment_api(results);
  };

  const handleMenuItemClick = (event, index) => {
    // console.log("Your Click %s",index)
    // console.log(options[index])
    optionMethod(index);
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleOpenMenuSort = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCloseMenuSort = (value) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return; } 
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <CssBaseline />
      {/* Hero unit ส่วนหัวด้านบน */}
      {/* <Box
        sx={{
          bgcolor: "background.paper",
          pt: 1,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            รหัสวิชา : {path}
          </Typography>
        </Container>
      </Box> */}
      <Container
        sx={{
          py: 2,
          borderRadius: 3,
          boxShadow: 10,
          marginBottom: 5,
          marginTop: 12,
        }}
        style={{ backgroundColor: "rgb(241, 241, 241)" }}
        maxWidth="md"
      >
        {/* Grid ในส่วนของ Course Detail  */}
        <Grid sx={{ marginBottom: 1 }}>
          {/* <Card sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  alignItems: 'center'
                }} > */}
          {/* <CircularProgress size={300}/>  */}
          <MediaCourseDetail data={courseDetail} />
          {/* </Card> */}
        </Grid>
        {/* Grid ในส่วนของ Input Comment  */}
        <Grid container spacing={1}>
          {comment_api ?
            <Grid item xs={12} sm={12} md={12} >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  shadows: 0,
                  border: 0,
                  borderRadius: 3,
                  padding: 2
                }}
              >
                <Card sx={{ borderRadius: 3 }}>
                  <FormControl
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 3,
                    }}
                  >
                    <Textarea
                      // 💭 🗨 👁️‍🗨️ 
                      placeholder="เพิ่มความคิดเห็น"
                      value={add_comment}
                      onChange={handleChange_add_comment}
                      minRows={2}
                      sx={{
                        border: "0px ",
                        borderRadius: 15,
                      }}
                      color="primary" //success primary
                      size="sm"
                    />
                  </FormControl>
                  <Collapse in={alertSwtich}>
                    <Alert severity="success"  >Comment success — check it out!</Alert>
                  </Collapse>
                </Card>
                <Box
                  sx={{
                    display: "flex",
                    gap: "var(--Textarea-paddingBlock)",
                    pt: "var(--Textarea-paddingBlock)",
                    borderTop: "0px solid",
                    borderColor: "divider",
                    flex: "auto",
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 0.5, border: 0, pl: 2 }}>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox checked={checkDisplayName}
                        onChange={handleChange} size="small" />}
                        label="แสดงชื่อผู้ใช้" sx={{ color: 'text.secondary' }} />
                    </FormGroup>
                  </Box>
                  <Button sx={{ ml: "auto", border: 0, pr: 2 }} size="sm" onClick={API_Add_Comment} endIcon={<SendIcon fontSize="" />} >
                    Comment
                  </Button>
                </Box>
              </Card>
            </Grid>
            : ''
          }
          {comment_api ?
            <Grid item xs={12} sm={12} md={12} >
              {/* <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  shadows: 0,
                  border: 0,
                  borderRadius: 3,
                  padding: 0,
                  pl: 4
                }}
              > */}
              <Container sx={{ display: 'flex', flexDirection: "row", justifyContent:'flex-end'}}>
                <Typography  >การเรียงลำดับความคิดเห็น</Typography>
                <Link underline="hover" sx={{ pl: 1 }} onClick={handleOpenMenuSort} ref={anchorRef} > {options[selectedIndex]} </Link>
              </Container>
              <Popper
                sx={{
                  zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseMenuSort}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              // disabled={index === 2}
                              selected={index === selectedIndex}
                              onClick={(event) => handleMenuItemClick(event, index)}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              {/* </Card> */}
            </Grid> : ''
          }
          {/* Grid ในส่วนของ list Comment  */}
          {comment_api ? (
            comment_api.map((data) => (
              <Grid item key={data} xs={12} sm={12} md={12}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    background: () => { if (data.officer_comment) return 'linear-gradient(to right bottom, #ee9342, #ff7518)'; return '' }
                  }}
                >
                  <CardHeader avatar={
                    <Avatar>
                      {/* <AccountCircleIcon sx={{ color: () => { if (data.officer_comment) return 'gold'; return 'white' } }} /> */}
                      <PersonIcon fontSize="medium" />
                    </Avatar>
                  }
                    // sx={{backgroundColor: '#5F9EA0'}}
                    title={
                      (!data.officer_comment) ?
                        <Link href={`#`} underline="hover" sx={{ fontSize: 18 }}> {data.username} </Link>
                        :
                        <Link href={`#`} underline="hover" sx={{
                          fontSize: 18, color: '#363636',
                          border: 0, borderRadius: 2, px: 2, backgroundColor: '#f4b781'
                        }}> {data.username} </Link>
                    }
                    subheader={<Typography
                      sx={{ textAlign: "right", pr: 2 }}
                      color="text.secondary"
                      variant="caption"
                    >
                      {!data.update_time
                        ? `แสดงความคิดเห็น : ${data.create_time.substring(0, 10)}`
                        : `แก้ไขเมื่อ : ${data.create_time.substring(0, 10)}`}
                    </Typography>}
                    action={
                      <>
                        {data.owner_comment ? (
                          <Button
                            size="small"
                            color={"error"}
                            onClick={(e) => {
                              API_Delect_Comment(data.comment_id);
                            }}
                          >
                            <DeleteOutlineIcon fontSize="small" sx={{ mb: 0.65 }} />
                          </Button>

                        ) : (
                          ""
                        )}

                        {data.owner_comment ? (
                          <Button
                            size="small"
                            color={"info"}
                            onClick={() => {
                              handleOpenDialogChengeComment({
                                course_id: data.course_code,
                                comment_id: data.comment_id,
                                message: data.message
                              })
                            }}
                          >
                            <EditIcon fontSize="small" sx={{ mb: 0.65 }} />
                          </Button>
                        ) : (
                          ""
                        )}
                      </>
                    }
                  />

                  <CardContent sx={{ borderRadius: 3, boxShadow: 1, pl: 4, my: -2, py: 1, background: () => { if (data.officer_comment) return 'linear-gradient(to right , #f09f56, #ed872d)'; return '' } }}> {data.message} </CardContent>
                  <CardActions disableSpacing sx={{ justifyContent: "left", pl: 3, border: 0, pt: 2, mb: -1 }} >
                    <Button
                      size="small"
                      onClick={(e) => {
                        Onclick_Like(e, data.comment_id, data.can_like);
                      }}
                    >
                      {" "}
                      {data.can_like ? (
                        <ThumbUpOffAltIcon sx={{ mb: 0.65 }} />
                      ) : (
                        <ThumbUpAltIcon sx={{ mb: 0.65 }} />
                      )}{" "}
                      &nbsp;({data.like})
                    </Button>
                    <Button
                      size="small"
                      sx={{ alignContent: "center" }}
                      color={"success"}
                      onClick={(e) => {
                        if (data.permission_approve) Onclick_Aprove(data.comment_id, data.can_approve, data.permission_approve)
                      }}
                      disabled={(data.approve == 0 && data.permission_approve == false) ? true : false}
                    >
                      <AddTaskIcon fontSize="small" sx={{ mb: 0.65 }} /> &nbsp;
                      ({data.approve})
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item key={[1, 2, 3, 4, 5]} xs={12} sm={12} md={12}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  shadows: 0,
                  border: 0,
                  borderRadius: 3,
                  marginTop: 1,
                }}
                style={{ backgroundColor: "#F1F1F1" }}
              >
                <CardContent>
                  <Card
                    sx={{
                      borderRadius: 3,
                    }}
                    style={{ backgroundColor: "white" }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      textAlign={"left"}
                      style={{ color: "grey" }}
                    >
                      <AccountCircleIcon sx={{ mt: 1, ml: 1 }} />
                      {" Profile "}
                      <LinearProgress />

                    </Typography>
                    <Typography
                      sx={{ pl: 2, pt: 1, pb: 1, ml: 4, mt: -1 }}
                      style={{ color: "grey" }}
                    >
                      {" loading... "}
                    </Typography>
                  </Card>
                </CardContent>
                {/* <CircularProgress size={100} sx={{ margin: 2 }} /> */}
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
      <Dialog
        open={openDialogChangeComment}
        onClose={handleCloseDialogComment}
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
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'left', mb: -1 }}>แก้ไขคอมเมนท์</DialogTitle>
        <DialogContent >
          <Grid container spacing={1} >
            <Grid xs={12}>
              {
                tempEditComment ?
                  <Textarea
                    autoFocus
                    defaultValue={tempEditComment.message}
                    onChange={handleChange_edit_comment}
                    minRows={3}
                    fullwidth
                    sx={{
                      backgroundColor: "#F5F5F5",
                      borderColor: "#EBEBEB",
                      mt: 1,
                    }}
                  /> : ''
              }
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mt: -2 }}>
          <Button
            onClick={handleCloseDialogComment}
            variant="outlined"
            color="error"
            sx={{ width: 'auto' }}
          >
            cancle
          </Button>
          <Button
            // onClick={(e) => {
            // API_Update_Comment(data.comment_id);
            // tempEditComment ? API_Update_Comment(API_Update_Comment.comment_id)
            // }}
            // onClick={API_Update_Comment}
            onClick={() => {
              setDialogLoading(true)
              API_Update_Comment()
            }}
            disabled={Edit_comment ? false : true}
            variant="contained"
            sx={{ width: 'auto' }}
          >
            confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialogLoading}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent >
          <DialogContentText>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <CircularProgress size={100} />
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
