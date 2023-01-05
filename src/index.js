import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Profile from "./components/profile";
import List_Course from "./components/lsit_course";
import Comment_page from "./components/comment";
import Rating_page from "./components/rating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="card" element={<List_Course />} />
      <Route path="comment/*" element={<Comment_page/>} />
      <Route path="rating/*" element={<Rating_page/>} />
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
