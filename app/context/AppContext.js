"use client";
import React, { createContext, useState } from "react";
import { collection, getDocs,doc,setDoc } from "firebase/firestore";
import { db } from "../firebase";
import {v4} from "uuid"
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [allQuotes,setAllQuotes] = useState([])

  const SideBarToggle = () => {
    setShowSideBar(!showSideBar);
  };
  const handleShowModal = () => {
    setShowQuoteModal(!showQuoteModal);
  };
  const fetchAllQoutes = async () => {
    const querySnapshot = await getDocs(collection(db, "quotes"));
    const tempQuotes = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const tempDoc = doc.data()
     tempQuotes.push({
        quoteId:doc.id,
        ...tempDoc
     })
     console.log(tempQuotes)
      setAllQuotes(tempQuotes)
    });
  };
  const createQuote = async (newQuote) => {
    const cityRef = doc(db, "quotes", v4());
    setDoc(cityRef, newQuote, { merge: true })
      .then(() => {
        console.log("document set");
      })
      .catch((err) => console.log("error setting data"));
  };
  return (
    <AppContext.Provider
      value={{
        showSideBar,
        SideBarToggle,
        showQuoteModal,
        handleShowModal,
        fetchAllQoutes,
        createQuote,
        allQuotes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
