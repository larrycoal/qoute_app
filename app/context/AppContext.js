"use client";
import React, { Children, createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const SideBarToggle = () => {
    setShowSideBar(!showSideBar);
  };
  const handleShowModal = () => {
    setShowQuoteModal(!showQuoteModal);
  };
  return (
    <AppContext.Provider value={{ showSideBar, SideBarToggle, showQuoteModal,handleShowModal }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
