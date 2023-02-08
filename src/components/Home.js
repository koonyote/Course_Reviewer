import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import List_Course from "./list_course";

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
