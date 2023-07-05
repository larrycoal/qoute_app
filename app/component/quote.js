import Image from "next/image";
import React, { useContext, useState } from "react";
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
const Quote = ({ quote }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { handleShowModal, deleteQuote, fetchAllQoutes } =
    useContext(AppContext);
  const currentUser = JSON.parse(window.localStorage.getItem("user"));

  const handleEditQuote = () => {
    setShowOptions(!showOptions);
    handleShowModal("Edit", quote);
  };
  const handleDeleteQuote = () => {
    setShowOptions(!showOptions);
    deleteQuote(quote.quoteId);
    fetchAllQoutes()
  };
  return (
    <div className={style.quoteWrapper}>
      <div className={style.top}>
        <span>
          <Image src={quote.profilePic} height="50" width="50" />
        </span>
        <span>{quote.firstName}</span>
        {quote?.authorId === currentUser?.uid && (
          <SlOptionsVertical onClick={() => setShowOptions(!showOptions)} />
        )}
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
        <AiOutlineCalendar /> <span>1h ago</span>
        <AiOutlineHeart /> <span>{quote.likes} likes</span>
      </div>
    </div>
  );
};

export default Quote;
