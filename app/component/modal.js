"use client"
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Button } from './inputs';
import style from "./modal.module.css"
const QuoteModal = () => {
    const {showQuoteModal,handleShowModal} = useContext(AppContext)
    return (
      <div
        className={style.modalWrapper}
        style={{ display: `${showQuoteModal ? "block" : "none"}` }}
      >
        <h2>Write a quote</h2>
        <textarea
          rows="20"
          cols="44"
          placeholder="Give us a memorable quote"
        ></textarea>
        <div className={style.btnWrapper}>
          <Button text="cancel" variant="secondary" onclick={handleShowModal} />
          <Button text="quote" variant="primary" />
        </div>
      </div>
    );
};

export default QuoteModal;