import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "./firebaseConfig ";
import axiosInstancePublic from "../AxiosAPI/axiosInstance";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //creat email pass sing in
  const singupWithEmalPass = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };
  //singIN
  const loginEmPAss = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };
  //goggle sing is
  const googleSing = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  //user aute state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        //crete
        const userInfo = { email: currentUser.email };
        console.log("TOKEN WILL BE SET SOON");
        axiosInstancePublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            console.log("TOKEN SET ON APPLICATION");
            setLoading(false);
          }
        });
      } else {
        //do some thiks
        console.log("TOKEN REMOVED");
        localStorage.removeItem("access-token");
        setLoading(false);
      }

      //TODO - Token Work
      // const looggedEmail = { user: currentUser?.email };

      // if (currentUser) {
      //   // const looggedEmail = { user: currentUser.email };
      //   // console.log(currentUser);
      //   axios
      //     .post("/api/auth/access-token", looggedEmail)
      //     .then((res) => {
      //       console.log(res.data);
      //     });
      // } else {
      //   axios.post("/api/user/logout", looggedEmail).then((res) => {
      //     console.log(res.data);
      //   });
      // }
    });

    return () => {
      unSubscribe();
    };
  }, []);
  //sing Out
  const logOut = () => {
    setLoading(true);

    signOut(auth);
  };
  //update profile
  const updateProfiles = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const authInfo = {
    singupWithEmalPass,
    googleSing,
    user,
    logOut,
    loading,
    loginEmPAss,
    updateProfiles,
    setUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
