/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../utils/toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RecipesCard from "./RecipesCard";
import { getRecipesData } from "../../Redux/slices/recipeSlice";
import { Loader, Loader2 } from "lucide-react";
import { API_KEY } from "../../assets/URL/API_KET/API_KEY";

// console.log(token);
const Recipes = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [input, setInput] = useState(""); //searchParams.get("query") ||
  let [cuisine, setCuisine] = useState(searchParams.get("cuisine") || "");
  let [toggle, setToggle] = useState(false);
  let navigate = useNavigate();

  // if (cuisine) console.log(cuisine);
  // console.log(input);
  let dispatch = useDispatch();

  let { token } = useSelector((store) => store.user);
  let { data, isLoading } = useSelector((store) => store.recipes);
  // console.log(data.results, isLoading);

  // console.log(data);

  let handleSearchedInput = () => {
    setToggle(!toggle);
    // setSearchParams({ query: input });
  };

  let handleCuisine = (e) => {
    setCuisine(e.target.value);
  };

  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&query=${input}`;

  useEffect(() => {
    let params = {};
    cuisine && (params.cuisine = cuisine);
    input && (params.query = input);
    setSearchParams(params);
    dispatch(getRecipesData(url));
  }, [cuisine, toggle]);

  return isLoading ? (
    <div className="flex justify-center items-center text-center h-screen">
      <Loader2 className="motion-safe:animate-spin text-gray-500 " size={100} />
    </div>
  ) : (
    <div>
      <div className=" flex justify-center ml-2 mr-2 md:mr-6 md:sticky top-16 sm:top-1 z-30 ">
        <div className="mt-2 flex w-full max-w-sm items-center space-x-2 rounded px-2 py-2 bg-gray-200">
          <div>
            <span className=" font-bold">Cuisine</span>
            <select
              value={cuisine}
              onChange={handleCuisine}
              className="flex text-center  items-center justify-center bg-gray-200 rounded text-sm font-semibold"
            >
              <option
                value={""}
                className=" bg-green-500 font-semibold text-white"
              >
                Select
              </option>
              <option value={"indian"}>Indian</option>
              <option value={"french"}>French</option>
              <option value={"chinese"}>Chinese</option>
              <option value={"japanese"}>Japanese</option>
              <option value={"italian"}>Italian</option>
              <option value={"american "}>American</option>
              <option value={"greek"}>Greek</option>
              <option value={"spanish"}>Spanish</option>
              <option></option>
            </select>
          </div>
          <input
            onChange={(e) => setInput(e.target.value)}
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="email"
            placeholder="What are you looking for?"
          ></input>
          <button
            disabled={input ? false : true}
            onClick={handleSearchedInput}
            type="button"
            className={`${!input && "hover:cursor-not-allowed"} ${
              !input && "hover:peer-placeholder-shown:"
            } rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
          >
            Search
          </button>
        </div>
      </div>
      {data && !data.totalResults && (
        <h1 className=" text-2xl md:text-3xl flex justify-center items-center text-center h-screen">
          No data are avalabe please search Diffrent
        </h1>
      )}
      <div className="mt-2 mx-2 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {data?.results?.map((ele, i) => (
          // {recipes.results.map((ele, i) => (
          <RecipesCard {...ele} key={ele.id} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
