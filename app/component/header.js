"use client"
import React,{useContext} from 'react';
import { FaBarsStaggered, FaBars } from "react-icons/fa";
import {  BsChatQuote } from "react-icons/bs";
import style from "./header.module.css"
import { AppContext } from '../context/AppContext';
const Header = () => {
    const {SideBarToggle} = useContext(AppContext)
    return (
      <header className={style.headerWrapper}>
        <h1>
          <BsChatQuote />
          <span>uoted</span>
        </h1>
        <div>
          <FaBars onClick={SideBarToggle} />
        </div>
      </header>
    );
};

export default Header;