import * as React from "react";
import { useRef, useState } from "react";
import { useEffect } from "react";

import Navbar from "../components/Navbar";
import Textarea from "@mui/joy/Textarea";
import Box from "@mui/joy/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import config from "../config.json";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

// async function call_api(c_id, c_name_th, c_name_en, c_des) {
//   const token = localStorage.getItem("token");
//   // let param = {
//   //   id: c_id,
//   //   name_th: c_name_th,
//   //   name_en: c_name_en,
//   //   discription: c_des,
//   // };

//   console.log(c_id);
//   //const body = JSON.stringify(param);

//   // const API = await fetch(`${config.domain}/register`, {
//   //   method: "POST",
//   //   headers: {
//   //     Authorization: `Bearer ${token}`,
//   //     "ngrok-skip-browser-warning": "*",
//   //     "User-Agent": "Custom",
//   //     "Content-Type": "application/json",
//   //     Accept: "application/json",
//   //     "Access-Control-Allow-Origin": "*",
//   //     "Access-Control-Allow-Methods": "GET, POST",
//   //   },
//   //   body,
//   // });

//   // if (API.status === 200) {
//   //   window.location.replace(`/home`);
//   //   alert("สมัครสมาชิกสำเร็จ");
//   // } else {
//   //   alert("กรุณากรอกข้อมูลให้ครบ");
//   // }
//   //console.log(body);
//   //const jsonData = await API.json();
// }


export default function LecturerAdd() {
  const token = localStorage.getItem("token");

  async function call_api() {
    let param = {
      id: c_id,
      name_th: c_name_th,
      name_en: c_name_en,
      discription: c_des,
    };

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
      body:body1,
    });

    if (API.status == 200) {
      alert("สำเร็จ");
    } else {
      alert("ไม่สำเร็จ");
      console.log(body1)
    }

    console.log(API.status, body1);
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
    console.log(event.target.value);
  };

  const [c_name_en, setCEN] = useState();
  const handleChange_c_name_en = (event) => {
    setCEN(event.target.value);
    console.log(event.target.value);
  };

  const [c_des, set_c_des] = React.useState();
  const handleChange_c_des = (event) => {
    set_c_des(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {}, []);

  return (
    <>
      
      <Box
        sx={{
          py: 5,
          display: "grid",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
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
                      "& .MuiInputLabel-root": { color: "#CCCCCC" }, //styles the label
                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "#474747"},
                      },
                      "& .MuiInputBase-root": {
                        color: "primary.contrastText",
                      },
                      p: 1,
                      width: "80%",
                      mt:2
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
                      "& .MuiInputLabel-root": { color: "#CCCCCC" }, //styles the label
                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "#474747" },
                      },
                      "& .MuiInputBase-root": {
                        color: "primary.contrastText",
                      },
                      p: 1,
                      width: "80%",
                      mt:2
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
                      "& .MuiInputLabel-root": { color: "#CCCCCC" }, //styles the label
                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "#474747" },
                      },
                      "& .MuiInputBase-root": {
                        color: "primary.contrastText",
                      },
                      p: 1,
                      width: "80%",
                      mt:2
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
                      backgroundColor:"#7C7C7C",
                      borderColor:"#A1A1A1",
                      p: 1,
                      mt:4,
                      height:150
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
        </div>
      </Box>
    </>
  );
}
