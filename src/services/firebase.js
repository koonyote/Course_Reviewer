import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig";
import React, { useEffect } from "react";
import config from "../config.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const GetCurrentUeser = () => {
  getAuth().currentUser.getIdToken(true)
  .then(function(idToken) {
    console.log("Get Current User: getIdToken OK!")
  // console.log(idToken)
  localStorage.setItem("token",idToken)
  }).catch(function(error) {
    console.log(error)
    alert('Error, refresh token.')
  });
}

export const signInWithGoogle = () => {
  if (localStorage.getItem("email") !== null && localStorage.getItem("isMember") == true  ) {
    console.log('check')
    window.location.href = "/home";
  } else if (localStorage.getItem("isMember") == false ) {
    window.location.href = "/register"
  } 
  
  async function call_api_check_member(token) {
    const API = await fetch(`${config.domain}/login`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "*",
        "User-Agent": "Custom",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
      // body : {}
    });
    const jsonData = await API.json();

    if (jsonData.isMember) {
      window.location.href = "/home";
      // console.log(jsonData)
      localStorage.setItem("isMember",true)
      localStorage.setItem("api_expire",jsonData.expire_th)
      localStorage.setItem("Role",jsonData.permission)
      console.log('isMember')
    } else {
      localStorage.setItem("isMember",false)
      window.location.href = "/register";
    }
  }

  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const token = result.user.accessToken;
      const expTimestamp = result.user.stsTokenManager.expirationTime;
      // console.log(token);
      localStorage.setItem("expTimestamp", expTimestamp);
      localStorage.setItem("expDateTime", new Date(expTimestamp).toLocaleString());
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("token",token)
      call_api_check_member(token);
    })
    .catch((error) => console.log(error));
};
