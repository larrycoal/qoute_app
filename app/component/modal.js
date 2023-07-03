"use client";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { Button } from "./inputs";
import style from "./modal.module.css";
const QuoteModal = () => {
  const [quote, setQuote] = useState(null);
  const { showQuoteModal, handleShowModal, createQuote, fetchAllQoutes } =
    useContext(AppContext);
  const { currentUser } = useContext(AuthContext);
  const handleQuoteChange = (e) => {
    setQuote(() => ({
      [e.target.name]: e.target.value,
    }));
  };
  const handleCreateQuote = async () => {
    if (quote && quote.quote.trim() !== "") {
      const newQuote = {
        ...quote,
        authorId: auth.currentUser.uid,
        likes: 0,
        createdOn: Date.now(),
      };
      createQuote(newQuote);
      fetchAllQoutes()
      handleShowModal();
    }
  };
  return (
    <div
      className={style.modalWrapper}
      style={{ display: `${showQuoteModal ? "block" : "none"}` }}
    >
      <h2>Write a quote</h2>
      <textarea
        rows="20"
        cols="44"
        name="quote"
        onChange={handleQuoteChange}
        placeholder="Give us a memorable quote"
      ></textarea>
      <div className={style.btnWrapper}>
        <Button text="cancel" variant="secondary" onclick={handleShowModal} />
        <Button text="quote" variant="primary" onclick={handleCreateQuote} />
      </div>
    </div>
  );
};

export default QuoteModal;
