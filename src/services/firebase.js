import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, getRedirectResult, signInWithRedirect, signOut} from "firebase/auth";
import { ProductLink } from "..";
import config from "../config.json";

const firebaseSDK = {
  apiKey: "AIzaSyDRVXWLSz006JDqpe1OqZOLVPoziYYBLoc",
  authDomain: "course-reviewer-53b18.firebaseapp.com",
  projectId: "course-reviewer-53b18",
  storageBucket: "course-reviewer-53b18.appspot.com",
  messagingSenderId: "953013270613",
  appId: "1:953013270613:web:86fcec58059cf707277cdc",
};

const app = initializeApp(firebaseSDK);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const GetCurrentUeser = () => {
  getAuth().currentUser.getIdToken(true)
    .then(function (idToken) {
      console.log("Get Current User: getIdToken OK!")
      localStorage.setItem("token", idToken)
    }).catch(function (error) {
      console.log(error)
      alert('Error, refresh token.')
    });
}

export const signInWithGoogle = () => {
  if (localStorage.getItem("email") !== null && localStorage.getItem("isMember") == true) {
    window.location.href = ProductLink.home ;
  } else if (localStorage.getItem("isMember") == false) {
    window.location.href = ProductLink.register ;
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
      }
    });
    const jsonData = await API.json();

    if (jsonData.isMember) {
      window.location.href = ProductLink.home ;
      localStorage.setItem("isMember", true)
      localStorage.setItem("api_expire", jsonData.expire_th)
      localStorage.setItem("Role", jsonData.permission)
      console.log('isMember')
    } else {
      localStorage.setItem("isMember", false)
      window.location.href = ProductLink.register ;
    }
  }

  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const token = result.user.accessToken;
      const expTimestamp = result.user.stsTokenManager.expirationTime;

      localStorage.setItem("expTimestamp", expTimestamp);
      localStorage.setItem("expDateTime", new Date(expTimestamp).toLocaleString());
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("token", token)
      call_api_check_member(token);
    })
    .catch((error) => console.log(error));
};

export const SignOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });
}