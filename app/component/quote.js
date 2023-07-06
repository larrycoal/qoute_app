import React, { useContext, useState, useEffect } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import {
  AiOutlineCalendar,
  AiOutlineHeart,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import style from "./quote.module.css";
import { AppContext } from "../context/AppContext";
import { ProfilePhoto } from "./inputs";
import { auth } from "../firebase";
const Quote = ({ quote }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [quoteTime, setQuoteTime] = useState(null);
  const { handleShowModal, deleteQuote, fetchAllQoutes, likeQuote } =
    useContext(AppContext);
  const currentUser = auth.currentUser;

  const handleEditQuote = () => {
    setShowOptions(!showOptions);
    handleShowModal("Edit", quote);
  };
  const handleDeleteQuote = () => {
    setShowOptions(!showOptions);
    deleteQuote(quote.quoteId);
    fetchAllQoutes();
  };

  const handleQuoteLike = (quoteId) => {
    likeQuote(quoteId,currentUser.uid);
    fetchAllQoutes();
  };
  useEffect(() => {
    const month =
      new Date(Date.now()).getMonth() - new Date(quote.createdOn).getMonth();
    const day =
      new Date(Date.now()).getDay() - new Date(quote.createdOn).getDay();
    const hrs =
      new Date(Date.now()).getHours() - new Date(quote.createdOn).getHours();
    const minute =
      new Date(Date.now()).getMinutes() -
      new Date(quote.createdOn).getMinutes();
    const secs = new Date(quote.createdOn).getSeconds();
    if (month > 0) {
      setQuoteTime(month + "month");
      return;
    } else if (day > 0) {
      setQuoteTime(day + "d");
    } else if (hrs > 0) {
      setQuoteTime(hrs + "h");
    } else if (minute > 0) {
      setQuoteTime(minute + "m");
    } else {
      setQuoteTime(secs + "s");
    }
  }, [quote]);
  return (
    <div className={style.quoteWrapper}>
      <div className={style.top}>
        <span>
          <ProfilePhoto
            src={quote.profilePic}
            alt="quote author"
            height="50"
            width="50"
          />
        </span>
        <span>{quote.firstName}</span>
        <span>{quoteTime} ago</span>
        <span>
          {quote?.authorId === currentUser?.uid && (
            <SlOptionsVertical onClick={() => setShowOptions(!showOptions)} />
          )}
        </span>
        <ul
          className={style.optWrapper}
          style={{ display: showOptions ? "block" : "none" }}
        >
          <li onClick={handleEditQuote}>
            <AiOutlineEdit />
            Edit
          </li>
          <li onClick={handleDeleteQuote}>
            <AiOutlineDelete />
            Delete
          </li>
        </ul>
      </div>
      <div className={style.middle}>
        <BiSolidQuoteAltLeft />
        <span>{quote.quote}</span>
        <BiSolidQuoteAltRight />
      </div>
      <div className={style.bottom}>
        <AiOutlineCalendar />
        <span>{new Date(quote.createdOn).toLocaleDateString()}</span>
        <span onClick={()=>handleQuoteLike(quote.quoteId)}>
          <AiOutlineHeart /> {quote?.likes} likes
        </span>
      </div>
    </div>
  );
};

export default Quote;
