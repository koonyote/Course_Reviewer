import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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

export default function Comment_page() {
  let [comment_api, set_comment_api] = React.useState();
  let [effect, set_effect] = React.useState(0);
  let [frist_time, set_first_time] = React.useState(true);
  const token = localStorage.getItem("token");
  const path = window.location.pathname.split("/");
  const [add_comment, set_add_Comment] = React.useState();
  const [checkDisplayName, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked)
  };

  const handleChange_add_comment = (event) => {
    set_add_Comment(event.target.value);
    console.log(event.target.value);
  };

  const [Edit_comment, set_Edit_Comment] = React.useState();
  const handleChange_edit_comment = (event) => {
    set_Edit_Comment(event.target.value);
    console.log(Edit_comment);
  };

  useEffect(() => {
    const api = async () => {
      const API = await fetch(`${config.domain}/list-comment/${path[2]}`, {
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
        } else set_comment_api(data);
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

  async function API_Add_Comment(event) {
    // หาก True ให้ไป Like | หาก false ให้ไป Delete
    await fetch(`${config.domain}/add-comment`, {
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
        course_id: path[2],
        message: add_comment,
        identify: checkDisplayName,
      }),
    });
    set_effect(effect + 1);
  }

  async function API_Delect_Comment(param_comment_id) {
    await fetch(`${config.domain}/delete-comment`, {
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
        course_id: path[2],
        comment_id: param_comment_id,
      }),
    });
    set_effect(effect + 1);
  }

  async function API_Update_Comment(param_comment_id) {
    // หาก True ให้ไป Like | หาก false ให้ไป Delete
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
        course_id: path[2],
        comment_id: param_comment_id,
      }),
    });

    if (API.status === 200) {
      window.location.replace(`/comment/${path[2]}`);
      alert("อัพเดทสำเร็จ");
    } else {
      alert("อัพเดทไม่สำเร็จ")
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

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <CssBaseline />
      {/* Hero unit ส่วนหัวด้านบน */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 1,
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
            CODE : {path[2]}
          </Typography>
        </Container>
      </Box>
      <Container
        sx={{
          py: 5,
          borderRadius: 3,
          boxShadow: 10,
          marginBottom: 5,
          marginTop: 2,
        }}
        style={{ backgroundColor: "rgb(241, 241, 241)" }}
        maxWidth="md"
      >


        <Grid container spacing={4}>
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
                }}
              >
                <FormControl
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 3,
                  }}
                >
                  <Textarea
                    // 💭 🗨 👁️‍🗨️ 
                    placeholder="💭 :  เพิ่มความคิดเห็น"
                    value={add_comment}
                    onChange={handleChange_add_comment}
                    minRows={1}
                    sx={{
                      border: "0px ",
                      borderRadius: 15,
                    }}
                    color="primary" //success primary
                    size="sm"
                    endDecorator={
                      <Box
                        sx={{
                          display: "flex",
                          gap: "var(--Textarea-paddingBlock)",
                          pt: "var(--Textarea-paddingBlock)",
                          borderTop: "0px solid",
                          // border: 2,
                          borderColor: "divider",
                          flex: "auto",
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: 0.5, border: 0, ml: 3 }}>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox checked={checkDisplayName}
                              onChange={handleChange} size="small" />}
                              label="แสดงชื่อผู้ใช้" sx={{ color: 'text.secondary' }} />
                          </FormGroup>
                        </Box>
                        <Button sx={{ ml: "auto", border: 0 }} size="sm" onClick={API_Add_Comment} endIcon={<SendIcon fontSize="" />} >
                          Send
                        </Button>
                      </Box>
                    }
                  />
                </FormControl>
              </Card>
            </Grid> : ''
          }
          {comment_api ? (
            comment_api.map((data) => (
              <Grid item key={data} xs={12} sm={12} md={12}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    shadows: 0,
                    border: 0,
                    borderRadius: 3,
                    marginTop: 0,
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      textAlign={"start"}
                      href="#"
                      sx={{ position: 'relative', display: 'flex', alignItems: 'center', pl: 2, pt: 0.2 }}
                    >
                      <AccountCircleIcon sx={{ color: () => { if (data.officer_comment) return 'gold'; return 'silver' } }} />
                      <Link href={`#`} underline="hover" sx={{ pl: 1.2, color: () => { if (data.officer_comment) return 'gold'; return '' } }}> {data.username} </Link>
                    </Typography>
                    <Card
                      sx={{
                        borderRadius: 3,
                        marginLeft: 2,
                      }}
                      style={{ backgroundColor: "white" }}
                    >

                      <Typography
                        sx={{ pl: 1, pt: 0.2, pb: 1, ml: 1, mt: 1 }}
                        style={{ color: "grey" }}
                      >
                        {data.message}{" "}
                      </Typography>
                    </Card>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "left", pl: 3, my: -1.5 }}>
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
                    <Typography
                      sx={{ pl: 2, textAlign: "right", pr: 2 }}
                      color="text.secondary"
                    >
                      {!data.update_time
                        ? `แสดงความคิดเห็น : ${data.create_time.substring(
                          0,
                          10
                        )}`
                        : `แก้ไขเมื่อ : ${data.create_time.substring(0, 10)}`}

                      {/* เหลือส่วนบอกแก้ไข ตอนนี้ข้อมูลที่ออกมามีแต่ที่แก้ไขแล้ว */}
                    </Typography>

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
                        onClick={handleClickOpen}
                      >
                        <EditIcon fontSize="small" sx={{ mb: 0.65 }} />
                      </Button>
                    ) : (
                      ""
                    )}
                  </CardActions>
                </Card>
                <div>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>แก้ไขคอมเมนท์</DialogTitle>
                    <DialogContent>
                      <DialogContentText></DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id={data.message}
                        placeholder={data.message}
                        type="email"
                        onChange={handleChange_edit_comment}
                        fullWidth
                        variant="standard"
                      >
                        {data.message}
                      </TextField>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button
                        onClick={(e) => {
                          API_Update_Comment(data.comment_id);
                        }}
                        disabled={Edit_comment ? false : true}
                      >
                        Update
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
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
                  marginTop: 2,
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
                      href="#"
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
    </React.Fragment>
  );
}
