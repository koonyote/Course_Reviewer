import React, { useEffect, useRef, useState } from "react";
import config from "../config.json";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Navbar from "./Navbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ProductLink } from "..";

const classes = {
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  paper: {
    padding: 20,
    textAlign: "center",
    color: "white",
    fontFamily: "Roboto",
    height: "100%",
  },
};

export default function Course_detail() {
  const token = localStorage.getItem("token");
  function get_path_from_url() {
    let course_code = window.location.pathname.split("/");
    // return course_code[2]
    return course_code[3] // production
    // Production return because it has prefix
  }
  const path = get_path_from_url()
  let [data_api, set_data_api] = React.useState();
  const [loading, set_loading] = React.useState(true);

  function Loading_data() {
    return loading ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          justifySelf: "center",
        }}
      >
        <CircularProgress />{" "}
      </Box>
    ) : (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          justifySelf: "center",
          fontSize: 30,
        }}
      >
        {" "}
        "วิชานี้ไม่เปิดการสอนในภาคการศึกษานี้"
      </Box>
    );
  }

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

      if (data !== "") {
        if (data.CODE && data.NAME_TH && data.UNIT) {
          set_data_api(data);
        } else {
          set_loading(false);
          console.log(data);
        }
      }

      //   console.log(data_api);
    };
    // api()
    window.setTimeout(() => {
      api();
    }, 1000);
  }, []);
  //
  const [openD, setOpenD] = React.useState(true);

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    window.location.replace(ProductLink.home);
    setOpenD(false);
  };

  return (
    <>
      <Navbar />

      <div>
        <Dialog
          open={openD}
          onClose={handleCloseD}
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
            {data_api ? (
              <p>
                <Typography variant="h3" component="h2" sx={{ mt: 6 }}>
                  {data_api.CODE}
                  <br />{" "}
                </Typography>
                <Typography variant="h5" component="h5">
                  {data_api.NAME_TH}
                  <br />
                  {data_api.NAME_EN}
                  <br />
                </Typography>

                <Typography
                  color="#D7D7D7"
                  variant="h6"
                  gutterBottom
                  sx={{ mt: 3 }}
                >
                  หน่วยกิต: {data_api.UNIT} &nbsp; ภาษาที่เรียน:{" "}
                  {data_api.LANGUAGE}
                  <br />
                  เกี่ยวกับ: {data_api.CLASSNOTE}
                  <br />
                  เวลา : {data_api.TIMEFROM} - {data_api.TIMETO}
                  <br />
                  จำนวนกลุ่มที่เปิดสอน: {data_api.SECTION}
                  <br />
                  ผู้สอน : {data_api.PREFIXNAME}
                  {data_api.OFFICERNAME} {data_api.OFFICERSURENAME}
                </Typography>
              </p>
            ) : (
              <Loading_data />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseD}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
