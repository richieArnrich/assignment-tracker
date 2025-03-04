import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "../pages/HomePage";

function Layout() {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
