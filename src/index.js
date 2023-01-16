import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin_List from "./admin/Admin_List";
import Admin_Add from "./admin/Admin_Add"
import Lecturer_List from "./lecturer/Lecturer_List";
import Student_List from "./student/Student_List";
import Home from "./components/Home";
import Profile from "./components/profile";
import List_Course from "./components/list_course";
import Comment_page from "./components/comment";
import Rating_page from "./components/rating";
import Add_com from "./components/Add_com";
import Course_Detail from "./components/Course_Detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="admin_list" element={<Admin_List />} />
      <Route path="comment/*" element={<Comment_page />} />
      <Route path="rating/*" element={<Rating_page/>} />
      <Route path="profile" element={<Profile />} />
      <Route path="list" element={<List_Course />} />
      <Route path="add_com" element={<Add_com />} />
      <Route path="course-detail/*" element={<Course_Detail />} />
    </Routes>
  </BrowserRouter>
  /*<React.StrictMode>
    <App />
  </React.StrictMode>
  */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
