import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function HomePage() {
  function Logout() {
    return localStorage.clear();
  }
  return (
    <div className="text-center">
      <Navbar />
      <div>
      </div>
      <Link to="/" onClick={Logout}>
        <button className="primary-button">Log out</button>
      </Link>
    </div>
  );
}
