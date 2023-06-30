"use client";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { Button, TextInput } from "../component/inputs";
import style from "./register.module.css";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
const Register = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState([]);
  const [imageurl, setimageurl] = useState(null);
  const { currentUser, handleCreateUser, errorCreatingUser } =
    useContext(AuthContext);
  const router = useRouter();
  const handleInputChange = ({ name, value }) => {
    setUser(() => ({
      ...user,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmpassword) {
      setError([true, "password do not match"]);
      return;
    }
    const profilePicRef = ref(storage, "profilepic/default_profilepic.png");
    getDownloadURL(profilePicRef).then((url) => {
      setimageurl(url);
    });
    const newUserProfile = {
      firstname: user.firstname,
      lastname: user.lastname,
      profilePicURL: imageurl,
    };
    handleCreateUser(user.email, user.password, newUserProfile);
  };
  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);
  useEffect(() => {
    const profilePicRef = ref(storage, "profilepic/default_profilepic.png");
    getDownloadURL(profilePicRef).then((url) => {
      setimageurl(url);
    });
  }, []);
  return (
    <div className={style.registerWrapper}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Enter your firstname"
          label="First Name"
          name="firstname"
          onchange={handleInputChange}
        />
        <TextInput
          type="text"
          placeholder="Enter your lastname"
          label="Last Name"
          name="lastname"
          onchange={handleInputChange}
        />
        <TextInput
          type="email"
          placeholder="Enter your email"
          label="Email"
          name="email"
          onchange={handleInputChange}
        />
        <TextInput
          type="password"
          placeholder="Enter your password"
          label="Password"
          name="password"
          onchange={handleInputChange}
        />
        <TextInput
          type="password"
          placeholder="Enter your password"
          label="Retype Password"
          name="confirmpassword"
          onchange={handleInputChange}
        />
        <Button text="Register" onclick={(e) => console.log(e.target.value)} />
        <p>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
        <p className={style.error}>{error[0] && error[1]}</p>
        <p className={style.error}>
          {errorCreatingUser && errorCreatingUser.message}
        </p>
      </form>
    </div>
  );
};

export default Register;
