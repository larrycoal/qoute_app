"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button, TextInput, PasswordInput } from "../component/inputs";
import style from "./register.module.css";
const Register = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState([]);

  const handleInputChange = ({ name, value }) => {
    setUser(() => ({
      ...user,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password === user.confirmpassword) {
      setError([true, "password do not match"]);
      return;
    }
    console.log(user);
  };
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
        <p className={style.error}>{error[0] && error[1]}</p>
        <p>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
