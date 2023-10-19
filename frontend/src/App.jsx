/** @format */

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavBar from "./components/NavBar/NavBar";
import AllRoute from "./components/AllRoute/AllRoute";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <NavBar />
      <AllRoute />
      <Footer />
    </div>
  );
}

export default App;
