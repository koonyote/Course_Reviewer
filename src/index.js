import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./components/Register";
import Admin_List from "./admin/Admin_List";
import Home from "./components/Home";
import Profile from "./components/profile";
import List_Course from "./components/list_course";
import Comment_page from "./components/comment";
import Rating_page from "./components/rating";
import Add_com from "./components/Add_com";
import reportWebVitals from "./reportWebVitals";
import Admin_Home from "./admin/Dashbaoad";
import Admin_Table from "./admin/Table";
import Favorite_page from "./components/Favorite";
import Histrory_Page from "./components/History";
import Lecturer_Add from "./lecturer/Lecturer_Add";
import Course_detail from "./components/Course_Detail";
import Lecturer_List from "./lecturer/Lecturer_List";
import ChartDashboardPublic from "./chart_public/chart_dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/prj65_03">
    {/* <BrowserRouter > */}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin_list" element={<Admin_List />} />
      <Route path="/comment/*" element={<Comment_page />} />
      <Route path="/rating/*" element={<Rating_page />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/list" element={<List_Course />} />
      <Route path="/course-detail/*" element={<Course_detail />} />
      <Route path="/add_com" element={<Add_com />} />
      <Route path="/history" element={<Histrory_Page />} />
      <Route path="/favorite" element={<Favorite_page />} />

      <Route path="/admin" element={<Admin_Home />} />

      <Route path="/l_list" element={<Lecturer_List />} />
      <Route path="/add-course" element={<Lecturer_Add />} />
      <Route path="/admin/dashboard/table/*" element={<Admin_Table />} />
      <Route path="/chart" element={<ChartDashboardPublic />} />
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
