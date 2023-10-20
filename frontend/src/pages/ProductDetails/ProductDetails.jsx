/** @format */

import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  let params = useParams();
  let { id } = params;
  return (
    <div className=" h-screen">
      <h1 className=" text-3xl font-bold">ProductDetails {id}</h1>
    </div>
  );
};

export default ProductDetails;
