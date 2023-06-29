"use client";
import Link from "next/link";
import React from "react";
import { Button, TextInput, PasswordInput } from "../component/inputs";
import style from "./register.module.css";
const Register = () => {
  return (
    <div className={style.registerWrapper}>
      <h1>Register</h1>
      <form>
        <TextInput
          type="text"
          placeholder="Enter your fullname"
          label="Full Name"
          onchange={(e) => console.log(e.target.value)}
        />
        <TextInput
          type="email"
          placeholder="Enter your email"
          label="Email"
          onchange={(e) => console.log(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="Enter your password"
          label="Password"
          onchange={(e) => console.log(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="Enter your password"
          label="Retype Password"
          onchange={(e) => console.log(e.target.value)}
        />
        <Button text="Register" onclick={(e) => console.log(e.target.value)} />
        <p>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
