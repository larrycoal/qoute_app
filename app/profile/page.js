"use client";
import React, { useCallback, useState, useEffect, useContext } from "react";
import style from "./profile.module.css";
import Applayout from "../applayout";
import Image from "next/image";
import { auth } from "../firebase";
import { AppContext } from "../context/AppContext";
import Quote from "../component/quote";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userQuotes, setUserQuotes] = useState();
  const { getUser, allQuotes, fetchAllQoutes } = useContext(AppContext);
  const currentUser = JSON.parse(window.localStorage.getItem("user"));
  const fetchUser = useCallback(async (id) => {
    if (id) {
      const temp = await getUser(id);
      setUserDetails(temp);
    }
  }, []);

  useEffect(() => {
    fetchUser(currentUser.uid);
    fetchAllQoutes();
  }, []);
  useEffect(() => {
    if (allQuotes) {
      const tempQuotes = allQuotes.filter(
        (quote) => quote.authorId === currentUser.uid
      );
      setUserQuotes([ ...tempQuotes ]);
    }
  }, [allQuotes]);
  return (
    <Applayout>
      <div className={style.profileWrapper}>
        <div className={style.top}>
          <Image
            src={userDetails?.profilePic}
            alt="profile image"
            height="150"
            width="150"
          />
          <p>{userDetails?.firstName}</p>
          <p>No Bio</p>
          <p>joined on : date</p>
        </div>
        <div className={style.bottom}>
          <h3>Your Quotes</h3>
          {userQuotes ? (
            userQuotes.map((quote) => <Quote quote={quote} />)
          ) : (
            <p>You do not have any quotes yet</p>
          )}
        </div>
      </div>
    </Applayout>
  );
};

export default ProfilePage;
