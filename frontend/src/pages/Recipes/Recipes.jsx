/** @format */

import React, { useState } from "react";
import axios from "axios";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// console.log(token);
const Recipes = () => {
  let navigate = useNavigate();

  let { token } = useSelector((store) => store.user);
  // console.log(token);

  let handleClick = () => {
    axios
      .get("http://localhost:8080/recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        TOAST_SUCCESS("success");
        console.log(res.data);
      })
      .catch((err) => {
        // TOAST_ERROR(err.response.data.message);
        TOAST_ERROR("please login first");
        // window.location.href = "/login";
        navigate("/login");
        console.log(err);
      });
  };
  return (
    <div className=" h-screen items-center text-center">
      <h1 className="text-3xl font-bold">Recipes page</h1>
      <button
        onClick={handleClick}
        className=" px-2 py-2 rounded-lg mt-2 bg-green-400 text-white font-bold"
      >
        Like recipes
      </button>
    </div>
  );
};

export default Recipes;
