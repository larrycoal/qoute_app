"use client"
import React from "react";
import style from "./input.module.css";

const TextInput = ({ label, type, placeholder, onchange,name }) => {
    const handlechange = (e)=>{
     onchange({name:e.target.name,value:e.target.value})
    }
  return (
    <div className={style.inputContainer}>
      <label>{label}</label>
      <input type={type} name={name} placeholder={placeholder} onChange={handlechange} required/>
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
