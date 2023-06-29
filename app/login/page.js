"use client"
import Link from "next/link";
import React from "react";
import { Button, TextInput, PasswordInput } from "../component/inputs";
import style from "./login.module.css";
const Login = () => {
  return (
    <div className={style.loginWrapper}>
      <h3>Welcome to Quote</h3>
      <p>Give your inner voice a platform</p>
      <h1>Login</h1>
      <form>
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
        <Button text="Submit" onclick={(e) => console.log(e.target.value)} />
        <p>
          Dont have an account? <Link href="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
