"use client";
import React, { useCallback, useState, useEffect, useContext } from "react";
import style from "./profile.module.css";
import Applayout from "../applayout";
import { auth } from "../firebase";
import { AppContext } from "../context/AppContext";
import Quote from "../component/quote";
import { Button, ProfilePhoto } from "../component/inputs";
import QuoteModal from "../component/modal";
import Link from "next/link";
import { AiOutlineCalendar } from "react-icons/ai";
import { useRouter } from "next/navigation";
const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userQuotes, setUserQuotes] = useState();
  const { getUser, allQuotes, fetchAllQoutes } = useContext(AppContext);
  const currentUser = auth.currentUser;
  const router = useRouter();
  const fetchUser = useCallback(async (id) => {
    if (id) {
      const temp = await getUser(id);
      setUserDetails(temp);
    }
  }, []);
  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else {
      fetchUser(currentUser.uid);
      fetchAllQoutes();
    }
  }, [currentUser]);

  useEffect(() => {
    if (allQuotes) {
      const tempQuotes = allQuotes.filter(
        (quote) => quote.authorId === currentUser.uid
      );
      setUserQuotes([...tempQuotes]);
    }
  }, [allQuotes]);

  return (
    <Applayout>
      <div className={style.profileWrapper}>
        <div className={style.top}>
          <ProfilePhoto
            src={userDetails?.profilePic}
            alt={userDetails?.firstName}
            height="150"
            width="150"
          />
          <div className={style.userProfile}>
            <div>
              <p className={style.name}>
                {userDetails?.firstName} {userDetails?.firstName}
              </p>
              <p className={style.bio}>
                {userDetails?.bio !== "" ? userDetails?.bio : "No bio"}
              </p>
              <p className={style.date}>
                <AiOutlineCalendar />
                Joined: {new Date(userDetails?.joined).toLocaleDateString()}
              </p>
            </div>
            <Link href="/profile/edit">
              <Button
                text="Edit Profile"
                styleopt={{
                  alignItems: "flex-end",
                  fontSize: ".8rem",
                  fontWeight: "normal",
                }}
              />
            </Link>
          </div>
        </div>
        <div className={style.bottom}>
          <h3>Your Quotes</h3>
          {userQuotes ? (
            userQuotes.map((quote) => <Quote quote={quote} />)
          ) : (
            <p>You do not have any quotes yet</p>
          )}
        </div>
        <QuoteModal />
      </div>
    </Applayout>
  );
};

export default ProfilePage;
