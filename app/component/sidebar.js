"use client"
import React, { useContext } from "react";
import style from "./sidebar.module.css";
import { AiOutlineCloseCircle, AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsFillPersonFill, BsPersonBoundingBox } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { AppContext } from "../context/AppContext";
const SideBar = () => {
  const { showSideBar, SideBarToggle } = useContext(AppContext);

  return (
    <>
      <aside
        className={style.asideWrapper}
        style={{
          right: `${showSideBar ? "0" : "-800px"}`,
        }}
      >
        <section>
          <p>Account info</p>
          <AiOutlineCloseCircle onClick={SideBarToggle} />
        </section>
        <section>
          <BsPersonBoundingBox />
          <div>
            <p>First Name</p>
            <p>Username</p>
            <p>Total quote</p>
          </div>
        </section>
        <section>
          <div>
            <AiOutlineHome />
            Home
          </div>
          <div>
            <BsFillPersonFill />
            Profile
          </div>
          <div>
            <CiSettings />
            Settings
          </div>
          <div>
            <BiLogOut />
            Logout
          </div>
        </section>
      </aside>
    </>
  );
};

export default SideBar;
