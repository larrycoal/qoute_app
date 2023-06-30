"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Button, TextInput, PasswordInput } from "../component/inputs";
import { AuthContext } from "../context/AuthContext";
import style from "./login.module.css";
const Login = () => {
  const [user, setUser] = useState({});
  const { handleUserSignIn, currentUser,errorSigningUser } = useContext(AuthContext);
  const router = useRouter();
  const handleInputChange = ({ name, value }) => {
    setUser(() => ({
      ...user,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserSignIn(user.email, user.password);
  };
  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);
  return (
    <div className={style.loginWrapper}>
      <h3>Welcome to Quote</h3>
      <p>Give your inner voice a platform</p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <Button text="Submit" />
        <p>
          Dont have an account? <Link href="/register">Sign up</Link>
        </p>
        <p className={style.error}>
          {errorSigningUser && errorSigningUser.message}
        </p>
      </form>
    </div>
  );
};

export default Login;
