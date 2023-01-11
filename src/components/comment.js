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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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

export default function Comment_page() {
  let [comment_api, set_comment_api] = React.useState();
  let [call_api, set_call_api] = React.useState(false);
  let [frist_time, set_first_time] = React.useState(true);
  const token = localStorage.getItem("token");
  const path = window.location.pathname.split("/");
  const [add_comment, set_add_Comment] = React.useState();
  const handleChange_add_comment = (event) => {
    set_add_Comment(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    const api = async () => {
      const API = await fetch(`${config.domain}/list-comment/${path[2]}`, {
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
    set_call_api(false);
  }, [call_api]); // call api | useEffect will trigger whenever variable is different.
  async function API_Add_Like(event, param_comment_id, available) {
    // หาก True ให้ไป Like | หาก false ให้ไป Delete
    if (available) {
      await fetch(`${config.domain}/add-like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "*",
          "User-Agent": "Custom",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          comment_id: param_comment_id,
        }),
      });
      set_call_api(true);
    } else {
      await fetch(`${config.domain}/delete-like`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "*",
          "User-Agent": "Custom",
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          comment_id: param_comment_id,
        }),
      });
      set_call_api(true);
    }
  }

  async function API_Add_Comment(event) {
    // หาก True ให้ไป Like | หาก false ให้ไป Delete

    await fetch(`${config.domain}/add-comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        course_id: path[2],
        message: add_comment,
        identify: true,
      }),
    });
    set_call_api(true);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar></Navbar>
      <Container
        sx={{
          py: 8,
          border: 0,
          borderRadius: 3,
          boxShadow: 10,
          marginBottom: 10,
          marginTop: 2,
          borderRadius: 3,
        }}
        style={{ backgroundColor: "#ADD3F3" }}
        maxWidth="md"
      >
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          textAlign={"center"}
          href="#"
          color={"black"}
          sx={{
            fontWeight: "bold",
            mt: -4,
          }}
          style={{ color: "white" }}
        >
          Comment Student
        </Typography>
        <Grid>
          {" "}
          <FormLabel>Your comment</FormLabel>
          <FormControl
            sx={{
              backgroundColor: "white",
              borderRadius: "20px",
            }}
          >
            <Textarea
              placeholder="คอมเมนท์เกี่ยวกับวิชานี้"
              value={add_comment}
              onChange={handleChange_add_comment}
              minRows={3}
              sx={{
                border: "0px ",
              }}
              endDecorator={
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
                  <Button sx={{ ml: "auto" }} onClick={API_Add_Comment}>
                    Send
                  </Button>
                </Box>
              }
            />
          </FormControl>
        </Grid>
        <Grid container spacing={4}>
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
                      >
                        <AccountCircleIcon sx={{ mt: 1, ml: 1 }} />{" "}
                        {/* เอาลงมาไม่ได้จ้า */}
                        <Link href={`#`} underline="hover" sx={{ pl: 1.2 }}>
                          {data.username}
                        </Link>
                      </Typography>
                      <Typography
                        sx={{ pl: 2, pt: 1, pb: 1, ml: 4, mt: -2 }}
                        style={{ color: "grey" }}
                      >
                        {data.message}{" "}
                        {data.owner_comment ? (
                          <Button
                            size="small"
                            color={"info"}
                            onClick={(e) => {
                              alert("ยังไม่มีฟังก์ชั่นเปลี่ยน และ API จ้า");
                            }}
                          >
                            
                            <EditIcon fontSize="small" sx={{ mb: 0.65 }} />
                           
                          </Button>
                          
                        ) : (
                          ""
                        )}
                         
                      </Typography>
                    </Card>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "left", pl: 3 }}>
                    <Button
                      size="small"
                      onClick={(e) => {
                        API_Add_Like(e, data.comment_id, data.available);
                      }}
                    >
                      {" "}
                      {!data.available ? (
                        <ThumbUpAltIcon sx={{ mb: 0.65 }} />
                      ) : (
                        <ThumbUpOffAltIcon />
                      )}{" "}
                      &nbsp;({data.like})
                    </Button>
                    <Button
                      size="small"
                      sx={{ alignContent: "center" }}
                      color={"success"}
                    >
                      <AddTaskIcon fontSize="small" sx={{ mb: 0.65 }} /> &nbsp;
                      (0)
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
                  justifyItems: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <CardContent>
                  <Card>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      href="#"
                    >
                      <AccountCircleIcon size="large" />
                    </Typography>
                  </Card>
                </CardContent>
                <CircularProgress size={100} sx={{ margin: 2 }} />
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
