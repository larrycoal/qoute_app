"use client"
import React from "react";
import style from "./input.module.css";

const TextInput = ({ label, type, placeholder, onchange }) => {
  return (
    <div className={style.inputContainer}>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} onChange={onchange} />
    </div>
  );
};

const Button = ({ text, onclick }) => {
  return (
    <div className={style.buttonWrapper}>
      <button onClick={onclick}>{text}</button>
    </div>
  );
};
export {  Button, TextInput };
