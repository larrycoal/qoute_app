import Image from "next/image";
import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import { AiOutlineCalendar, AiOutlineHeart } from "react-icons/ai";
import style from "./quote.module.css";
const Quote = ({quote}) => {
    const currentUser = JSON.parse(window.localStorage.getItem("user"))
  return (
    <div className={style.quoteWrapper}>
      <div className={style.top}>
        <span>
          <Image src={quote.profilePic} height="50" width="50" />
        </span>
        <span>{quote.firstName}</span>
        {quote.authorId === currentUser.uid && <SlOptionsVertical />}
      </div>
      <div className={style.middle}>
        <BiSolidQuoteAltLeft />
        <span>{quote.quote}</span>
        <BiSolidQuoteAltRight />
      </div>
      <div className={style.bottom}>
        <AiOutlineCalendar /> <span>1h ago</span>
        <AiOutlineHeart /> <span>{quote.likes} likes</span>
      </div>
    </div>
  );
};

export default Quote;
