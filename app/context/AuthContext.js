"use client";
import React, { Children, createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const user = window.localStorage.getItem("user")
    user && setCurrentUser(JSON.parse(user))
  },[])

  const handleCreateUser = (email, password, profileDetails) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setCurrentUser(auth.currentUser);
        updateProfile(auth.currentUser, {
          displayName: profileDetails.firstname + " " + profileDetails.lastname,
          photoURL: profileDetails.profilePicURL,
        })
          .then(() => {
            setError(null);
            window.localStorage.setItem("user",JSON.stringify(auth.currentUser))
            return currentUser;
          })
          .catch((err) => {
            console.log("something went wrong", err);
            setError(err);
          });
      })
      .catch((err) => {
        console.log("something went wrong creating user", err);
        setError(err);
      });
  };
  const handleUserSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setCurrentUser(auth.currentUser);
        window.localStorage.setItem("user", JSON.stringify(auth.currentUser));
        setError(null);
      })
      .catch((err) => {
        console.log("something went wrong", err);
        setError(err);
      });
  };
  const handleSignOut = ()=>{
    window.localStorage.clear("user")
    setCurrentUser(null)
    signOut(auth)
    return
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        handleCreateUser,
        errorCreatingUser: error,
        handleUserSignIn,
        errorSigningUser:error,
       handleSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
