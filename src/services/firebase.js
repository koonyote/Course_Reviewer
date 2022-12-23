import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig";
import React, { useEffect } from "react";
import config from "../config.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
let token = "";
export const signInWithGoogle = () => {
  if (localStorage.getItem("email") !== null) {
    window.location.href = "/home";
  }

  async function call_api_check_member(token) {
    const API = await fetch(`${config.domain}/login`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      },
      // body : {}
    });
    const jsonData = await API.json();

    if (jsonData.isMember) {
      window.location.href = "/home";
    } else {
      window.location.href = "/register";
    }
  }

  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      token = result.user.accessToken;
      //console.log(token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("token",token)
      call_api_check_member(token);
    })
    .catch((error) => console.log(error));
};
