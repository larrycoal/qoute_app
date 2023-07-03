"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import style from "./sidebar.module.css";
import Image from "next/image";
import { AiOutlineCloseCircle, AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsFillPersonFill, BsPersonBoundingBox } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import Link from "next/link";
const SideBar = () => {
  const { showSideBar, SideBarToggle, getUser } = useContext(AppContext);
  const { handleSignOut } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();
  const handleLogUserOut = () => {
    handleSignOut();
    SideBarToggle();
    router.push("/login");
  };
  const fetchUser = useCallback(async () => {
    console.log("called",auth.currentUser)
    if (auth.currentUser) {
      const temp = await getUser(auth.currentUser?.uid);
      setUserDetails(temp);
      console.log("current user form side bar", temp);
    }
  }, []);

 useEffect(() => {
   fetchUser();
 }, []);
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
            src={userDetails?.profilePic}
            alt="user profile pic"
            height="100"
            width="100"
          />
          <div>
            <p>{userDetails?.firstName}</p>
            <p>Total quote</p>
          </div>
        </section>
        <section>
          <div>
            <AiOutlineHome />
            <Link href="/" onClick={SideBarToggle}>
              Home
            </Link>
          </div>
          <div>
            <BsFillPersonFill />
            <Link href="/profile" onClick={SideBarToggle}>
              {" "}
              Profile
            </Link>
          </div>
          {/* <div>
            <CiSettings />
            Settings
          </div> */}
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
