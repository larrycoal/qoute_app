"use client";
import React, { useRef } from "react";
import style from "./input.module.css";

const TextInput = ({ label, type, placeholder, onchange, name, value }) => {
  const handlechange = (e) => {
    onchange({ name: e.target.name, value: e.target.value });
  };
  return (
    <div className={style.inputContainer}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handlechange}
        value={value}
        required
      />
    </div>
  );
};

const TextBox = ({ label, placeholder, onchange, name,value }) => {
  const handlechange = (e) => {
    onchange({ name: e.target.name, value: e.target.value });
  };
  return (
    <div className={style.textBoxContainer}>
      <label>{label}</label>
      <textarea
        rows="10"
        name={name}
        value={value}
        onChange={handlechange}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

const Button = ({ text, onclick, variant, icon, styleopt }) => {
  return (
    <div
      className={style.buttonWrapper + " " + style[variant]}
      style={styleopt}
    >
      <button onClick={onclick}>
        {text && text}
        {icon && icon}
      </button>
    </div>
  );
};
const FileUploader = ({ text, icon, onchange }) => {
  const fileUploaderRef = useRef(null);
  const handleClick = () => {
    fileUploaderRef.current.click();
  };
  const handleChange = (e) => {
    if (e.target.files[0]) onchange(e.target.files[0]);
  };
  return (
    <div className={style.fileUploader}>
      <Button text={text} icon={icon} onclick={handleClick} />
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileUploaderRef}
        onChange={handleChange}
      />
    </div>
  );
};
export { Button, TextInput, TextBox, FileUploader };
