import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import App from "../App";
import Register from "./Register";
import Admin_List from "../admin/Admin_List";
import Admin_Add from "../admin/Admin_Add";
import Lecturer_List from "../lecturer/Lecturer_List";
import comment from "./comment.js";
import List_Course from "./list_course";
import Student_List from "../student/Student_List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import config from "../config.json";
import axios from "axios";


export default function HomePage() {
  return (
    <div>
      <Navbar> </Navbar>
      <div>
        <List_Course /> 
      </div>
    </div>
  );
}
