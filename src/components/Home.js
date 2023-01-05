import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import App from "../App";
import Login from "./Login";
import Register from "./Register";
import Admin_List from "../admin/Admin_List";
import Admin_Add from "../admin/Admin_Add";
import Lecturer_List from "../lecturer/Lecturer_List";
import Student_List from "../student/Student_List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function HomePage() {
  return (
    <div>
      <Navbar></Navbar>
      <div>
          <Lecturer_List />
      </div>
    </div>
  );
}
