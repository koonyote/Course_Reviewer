import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/profile";
import List_Course from "./components/list_course";
import Comment_page from "./components/comment";
import Rating_page from "./components/rating";
import reportWebVitals from "./reportWebVitals";
import Admin_Home from "./admin/Dashbaoad";
import Admin_Table from "./admin/Table";
import Favorite_page from "./components/Favorite";
import Histrory_Page from "./components/History";
import Course_detail from "./components/Course_Detail";
import Lecturer_List from "./lecturer/Lecturer_List";
import ChartDashboardPublic from "./chart_public/chart_dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
const localPath = { 
  default : "/",
  home : "/home",
  register : "/register",
  comment : "/comment",
  rating : "/rating",
  profile : "/profile",
  history : "/history",
  favorite : "/favorite",
  lecturer: "/lecturer",
  chart: "/chart",
  admin : "/admin",
  admin_table : "/admin/dashboard/table",
}
const hostFoder = "/prj65_03"
export const ProductLink = { 
  default : hostFoder+localPath.default,
  home : hostFoder+localPath.home,
  register : hostFoder+localPath.register,
  comment : hostFoder+localPath.comment,
  rating : hostFoder+localPath.rating,
  profile : hostFoder+localPath.profile,
  history : hostFoder+localPath.history,
  favorite : hostFoder+localPath.favorite,
  lecturer: hostFoder+localPath.lecturer,
  chart: hostFoder+localPath.chart,
  admin : hostFoder+localPath.admin,
  admin_table : hostFoder+localPath.admin_table,

  credit : "https://github.com/koonyote/Course_Reviewer",
}

root.render(
  <BrowserRouter basename="/prj65_03">
    {/* <BrowserRouter >  */} 
    <Routes>
      <Route path={localPath.default} element={<App />} />
      <Route path={localPath.home} element={<Home />} />
      <Route path={localPath.register} element={<Register />} />
      <Route path={localPath.comment + "/*"} element={<Comment_page />} />
      <Route path={localPath.rating + "/*"} element={<Rating_page />} />
      <Route path={localPath.profile} element={<Profile />} />
      <Route path={localPath.history} element={<Histrory_Page />} />
      <Route path={localPath.favorite} element={<Favorite_page />} />
      <Route path={localPath.chart} element={<ChartDashboardPublic />} />
      <Route path={localPath.lecturer} element={<Lecturer_List />} />
      <Route path={localPath.admin} element={<Admin_Home />} />
      <Route path={localPath.admin_table + "/*"} element={<Admin_Table />} />
      {/* debug */}
      {/* <Route path="/list" element={<List_Course />} /> */}
      {/* <Route path="/course-detail/*" element={<Course_detail />} /> */}
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
