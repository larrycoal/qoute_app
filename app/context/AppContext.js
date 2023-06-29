"use client"
import React,{Children, createContext,useState} from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [showSideBar,setShowSideBar] = useState(false)

    const SideBarToggle = ()=>{
        console.log("clicked")
        setShowSideBar(!showSideBar)
    }
  return (
    <AppContext.Provider value={{showSideBar, SideBarToggle}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };