"use client";
import React, { useContext } from "react";
import { FaBarsStaggered, FaBars } from "react-icons/fa";
import { BsChatQuote } from "react-icons/bs";
import style from "./header.module.css";
import { AppContext } from "../context/AppContext";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
const Header = () => {
  const { SideBarToggle } = useContext(AppContext);
  const {handleSignOut} =useContext(AuthContext)
  const router = useRouter()
   const handleLogUserOut = () => {
     handleSignOut();
     router.push("/login");
   };
  return (
    <header className={style.headerWrapper}>
      <h1>
        <BsChatQuote />
        <span>uoted</span>
      </h1>
      <div className={style.mobileHamburger}>
        <FaBars onClick={SideBarToggle} />
      </div>
      <ul className={style.desktopHeader}>
        <li>
          <AiOutlineHome />
          <Link href="/">Home</Link>
        </li>
        <li>
          <BsFillPersonFill />
          <Link href="/profile">Profile</Link>
        </li>
        <li onClick={handleLogUserOut}>
          <BiLogOut />
          Logout
        </li>
      </ul>
    </header>
  );
};

export default Header;
