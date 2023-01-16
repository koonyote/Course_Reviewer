import React, { useEffect, useRef, useState } from "react";
import config from "../config.json";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Course_detail() {
  const token = localStorage.getItem("token");
  const path = window.location.pathname.split("/");
  let [data_api, set_data_api] = React.useState();
  const [loading, set_loading] = React.useState(true);

  function Loading_data() {
    return loading ? (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />{" "}
      </Box>
    ) : (
      "ไม่มีรายละเอียดข้อมูล"
    );
  }

  useEffect(() => {
    const api = async () => {
      const token = localStorage.getItem("token");
      const API = await fetch(`${config.domain}/course-detail/${path[2]}`, {
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

  return (
    <>
      {data_api ? (
        <p>
          รหัสวิชา: {data_api.CODE}
          <br />
          ชื่อวิชา:{data_api.NAME_TH}
          <br />
          Course Name:{data_api.NAME_EN}
          <br />
          หน่วย: {data_api.UNIT}
          <br />
          กลุ่ม:{data_api.SECTION}
          <br />
          ภาษาที่เรียน:{data_api.LANGUAGE}
          <br />
          เกี่ยวกับ:{data_api.CLASSNOTE}
          <br />
          เวลาเริ่มเรียน :{data_api.TIMEFROM}
          <br />
          เวลาสิ้นสุด :{data_api.TIMETO}
          <br />
          ผู้สอน: {data_api.PREFIXNAME}
          {data_api.OFFICERNAME} {data_api.OFFICERSURENAME}
        </p>
      ) : (
        <Loading_data />
      )}
      {/* {data_api ? (
        <p>
          รหัสวิชา: {data_api.CODE}
          <br />
          ชื่อวิชา:{data_api.NAME_TH}
          <br />
          Course Name:{data_api.NAME_EN}
          <br />
          หน่วย: {data_api.UNIT}
          <br />
          กลุ่ม:{data_api.SECTION}
          <br />
          ภาษาที่เรียน:{data_api.LANGUAGE}
          <br />
          เกี่ยวกับ:{data_api.CLASSNOTE}
          <br />
          เวลาเริ่มเรียน :{data_api.TIMEFROM}
          <br />
          เวลาสิ้นสุด :{data_api.TIMETO}
          <br />
          ผู้สอน: {data_api.PREFIXNAME}
          {data_api.OFFICERNAME} {data_api.OFFICERSURENAME}
        </p>
      ) : (
        "ไม่มีข้อมูลรายวิชานี้"
      )} */}
    </>
  );
}
