"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Header from "./component/header";
import { Button } from "./component/inputs";
import SideBar from "./component/sidebar";
import { AuthContext } from "./context/AuthContext";
import { auth } from "./firebase";
import { AiOutlinePlus } from "react-icons/ai";
import QuoteModal from "./component/modal";
import { AppContext } from "./context/AppContext";
// import { AppProvider } from "./context/AppContext";
// import { AuthProvider } from "./context/AuthContext";
export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const {handleShowModal} = useContext(AppContext)
  const router = useRouter();
  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/login");
    }
    console.log(auth.currentUser);
  }, [auth.currentUser]);
  return (
    <>
      <Header />
      <main>
        <p>Home Page</p>
        <QuoteModal/>
        <Button variant="circular_hover" icon={<AiOutlinePlus />} onclick={handleShowModal} />
      </main>
      <SideBar />
    </>
  );
}
