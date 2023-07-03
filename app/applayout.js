import React from "react";
import Header from "./component/header";
import SideBar from "./component/sidebar";

const Applayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <SideBar />
    </>
  );
};

export default Applayout;
