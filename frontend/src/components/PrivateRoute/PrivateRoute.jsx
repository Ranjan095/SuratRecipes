/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const PrivateRoute = ({ children }) => {
  let { token } = useSelector((store) => store.user);
  // console.log(location)
  return token ? children : <Navigate to="/login" />;
};
