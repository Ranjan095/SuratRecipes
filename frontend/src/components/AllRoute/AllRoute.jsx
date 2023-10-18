/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Recipes from "../../pages/Recipes/Recipes";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import About from "../../pages/About/About";
import Contact from "../../pages/Contact/Contact";

const AllRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </div>
  );
};

export default AllRoute;
