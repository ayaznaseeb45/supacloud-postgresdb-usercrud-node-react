import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import UsersPage from "./pages/UsersPage";
import AboutPage from "./pages/AboutPage";

// The URL hash decides which page is displayed.
function getCurrentPage() {
  return window.location.hash === "#/about" ? "about" : "home";
}

function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    function handlePageChange() {
      setCurrentPage(getCurrentPage());
      window.scrollTo(0, 0);
    }

    window.addEventListener("hashchange", handlePageChange);
    return () => window.removeEventListener("hashchange", handlePageChange);
  }, []);

  return (
    <>
      <Navbar currentPage={currentPage} />
      <main className="app-main">
        {currentPage === "about" ? <AboutPage /> : <UsersPage />}
      </main>
      <footer className="site-footer">SupaCloud - Node.js + React CRUD Project</footer>
    </>
  );
}

export default App;

