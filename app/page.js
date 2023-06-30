"use client"
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Header from "./component/header";
import SideBar from "./component/sidebar";
import { AuthContext } from "./context/AuthContext";
import { auth } from "./firebase";
// import { AppProvider } from "./context/AppContext";
// import { AuthProvider } from "./context/AuthContext";
export default function Home() {
  const { currentUser } = useContext(AuthContext);
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
      </main>
      <SideBar />
    </>
  );
}
