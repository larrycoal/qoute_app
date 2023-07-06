"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import style from "./sidebar.module.css";
import Image from "next/image";
import { AiOutlineCloseCircle, AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsFillPersonFill, BsPersonBoundingBox } from "react-icons/bs";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import Link from "next/link";
import { ProfilePhoto } from "./inputs";
const SideBar = () => {
  const { showSideBar, SideBarToggle, getUser, allQuotes } =
    useContext(AppContext);
  const { handleSignOut } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();
  const handleLogUserOut = () => {
    handleSignOut();
    SideBarToggle();
    router.push("/login");
  };
  const fetchUser = useCallback(async () => {
    if (auth.currentUser) {
      const temp = await getUser(auth.currentUser?.uid);
      setUserDetails(temp);
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
          <ProfilePhoto
            src={userDetails?.profilePic}
            alt={userDetails?.firstName + "profile pic"}
            height="100"
            width="100"
          />
          <div>
            <p>{userDetails?.firstName}</p>
            <p>
              Total quote:
              {allQuotes.filter(
                (quote) => quote.authorId === auth.currentUser.uid
              ).length}
            </p>
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
