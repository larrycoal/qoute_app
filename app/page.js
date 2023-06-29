import Header from "./component/header";
import SideBar from "./component/sidebar";
import { AppProvider } from "./context/AppContext";
export default function Home() {
  return (
    <>
      <AppProvider>
        <Header />
        <main>
          <p>Home Page</p>
        </main>
        <SideBar />
      </AppProvider>
    </>
  );
}
