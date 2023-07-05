"use client";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { Button } from "./inputs";
import style from "./modal.module.css";
const QuoteModal = () => {
  const [quote, setQuote] = useState(null);

  const {
    showQuoteModal,
    handleShowModal,
    createQuote,
    fetchAllQoutes,
    modalMode,
  } = useContext(AppContext);
  // const { currentUser } = useContext(AuthContext);
  const handleQuoteChange = (e) => {
    setQuote(() => e.target.value);
  };
  const handleCreateQuote = async () => {
    if (quote && quote.trim() !== "") {
      const newQuote = {
        quote: quote,
        authorId: auth.currentUser.uid,
        likes: 0,
        createdOn: Date.now(),
      };
      createQuote(newQuote);
      fetchAllQoutes();
      setQuote(null);
      handleShowModal();
    }
  };
  useEffect(() => {
    setQuote("");
    if (modalMode && modalMode[0] === "Edit") {
      setQuote(modalMode[1]?.quote);
    }
  }, [showQuoteModal]);
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
        value={quote}
        defaultValue={quote}
        placeholder="Give us a memorable quote"
      ></textarea>
      <div className={style.btnWrapper}>
        <Button text="cancel" variant="secondary" onclick={handleShowModal} />
        <Button
          text={modalMode[0] === "Edit" ? "Edit quote" : "quote"}
          variant="primary"
          onclick={handleCreateQuote}
        />
      </div>
    </div>
  );
};

export default QuoteModal;
