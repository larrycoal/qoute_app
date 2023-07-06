"use client";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import Header from "./component/header";
import { Button } from "./component/inputs";
import SideBar from "./component/sidebar";
import { AuthContext } from "./context/AuthContext";
import { auth } from "./firebase";
import { AiOutlinePlus } from "react-icons/ai";
import QuoteModal from "./component/modal";
import { AppContext } from "./context/AppContext";
import Quote from "./component/quote";
import Applayout from "./applayout";
// import { AppProvider } from "./context/AppContext";
// import { AuthProvider } from "./context/AuthContext";
export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const { handleShowModal, fetchAllQoutes, allQuotes } = useContext(AppContext);
  const router = useRouter();
  useEffect(() => {
    if (!auth?.currentUser) {
      router.push("/login");
    }
  }, [auth?.currentUser]);

  const handleFetchQuotes = useCallback(async () => {
    try {
      fetchAllQoutes();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    handleFetchQuotes();
  },[]);
  return (
    <>
      <Applayout>
          {allQuotes &&
            allQuotes?.map((quote) => (
              <Quote key={quote.quoteId} quote={quote} />
            ))}
          <QuoteModal />
          <Button
            variant="circular_hover"
            icon={<AiOutlinePlus />}
            onclick={handleShowModal}
          />
      </Applayout>
    </>
  );
}
