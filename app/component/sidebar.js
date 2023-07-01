"use client";
import React, { useContext, useEffect } from "react";
import style from "./sidebar.module.css";
import Image from "next/image"
import { AiOutlineCloseCircle, AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsFillPersonFill, BsPersonBoundingBox } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
const SideBar = () => {
  const { showSideBar, SideBarToggle } = useContext(AppContext);
  const { handleSignOut,currentUser } = useContext(AuthContext);
  const router = useRouter();
  const handleLogUserOut = () => {
    handleSignOut();
    SideBarToggle();
    router.push("/login");
  };

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
          <Image
            src={auth.currentUser ? auth.currentUser.photoURL : ""}
            height="100"
            width="100"
          />
          <div>
            <p>
              {auth.currentUser && auth.currentUser.displayName?.split(" ")[0]}
            </p>
            <p>{auth.currentUser && auth.currentUser.email}</p>
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
          <div onClick={handleLogUserOut}>
            <BiLogOut />
            Logout
          </div>
        </section>
      </aside>
    </>
  );
};

export default SideBar;
