/** @format */

import React, { useState } from "react";
import axios from "axios";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../utils/toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronDown, Heart } from "lucide-react";

// console.log(token);
const Recipes = () => {
  let [input, setInput] = useState("");
  let [cuisine, setCuisine] = useState("");
  let navigate = useNavigate();

  if (cuisine) console.log(cuisine);

  let { token } = useSelector((store) => store.user);
  // console.log(token);

  let recipes = {
    results: [
      {
        id: 782585,
        title: "Cannellini Bean and Asparagus Salad with Mushrooms",
        image: "https://spoonacular.com/recipeImages/782585-312x231.jpg",
        imageType: "jpg",
      },
      {
        id: 716426,
        title: "Cauliflower, Brown Rice, and Vegetable Fried Rice",
        image: "https://spoonacular.com/recipeImages/716426-312x231.jpg",
        imageType: "jpg",
      },
      {
        id: 715497,
        title: "Berry Banana Breakfast Smoothie",
        image: "https://spoonacular.com/recipeImages/715497-312x231.jpg",
        imageType: "jpg",
      },
      {
        id: 715415,
        title: "Red Lentil Soup with Chicken and Turnips",
        image: "https://spoonacular.com/recipeImages/715415-312x231.jpg",
        imageType: "jpg",
      },
      {
        id: 716406,
        title: "Asparagus and Pea Soup: Real Convenience Food",
        image: "https://spoonacular.com/recipeImages/716406-312x231.jpg",
        imageType: "jpg",
      },
      {
        id: 644387,
        title: "Garlicky Kale",
        image: "https://spoonacular.com/recipeImages/644387-312x231.jpg",
        imageType: "jpg",
      },
      {
        id: 715446,
        title: "Slow Cooker Beef Stew",
        image: "https://spoonacular.com/recipeImages/715446-312x231.jpg",
        imageType: "jpg",
      },
      {
        id: 782601,
        title: "Red Kidney Bean Jambalaya",
        image: "https://spoonacular.com/recipeImages/782601-312x231.jpg",
        imageType: "jpg",
      },
      {
        id: 795751,
        title: "Chicken Fajita Stuffed Bell Pepper",
        image: "https://spoonacular.com/recipeImages/795751-312x231.jpg",
        imageType: "jpg",
      },
      {
        id: 766453,
        title: "Hummus and Za'atar",
        image: "https://spoonacular.com/recipeImages/766453-312x231.jpg",
        imageType: "jpg",
      },
    ],
    offset: 0,
    number: 10,
    totalResults: 5220,
  };

  let handleFavoriteRecipes = (id) => {
    if (!token) {
      TOAST_ERROR("Please login");
      navigate("/login");
      return;
    }
    TOAST_SUCCESS(`item has been added to favorite list ${id}`);
  };

  let handleSearchedInput = () => {
    console.log(input);
  };

  return (
    <div>
      <div className=" flex justify-center ml-2 mr-2 md:mr-6 md:sticky top-16 sm:top-1 z-30 ">
        <div className="mt-2 flex w-full max-w-sm items-center space-x-2 rounded px-2 py-2 bg-gray-200">
          <div>
            <span className=" font-bold">Cuisine</span>
            <select
              onChange={(e) => setCuisine(e.target.value)}
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
      <div className="mt-2 mx-2 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {recipes.results.map((ele, i) => (
          <div
            key={i}
            className="flex justify-center text-center items-center hover:text-red-500"
          >
            {" "}
            <div className="w-[150px] md:w-[300px] rounded-md border">
              <div className="flex justify-center">
                {" "}
                <span className="relative inline-block">
                  <Link to={`/recipes/${ele.id}`}>
                    <img
                      src={
                        ele.image
                          ? ele.image
                          : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                      }
                      alt={ele.name}
                      className={` h-[150px] md:h-[300px] w-full rounded-md object-cover `}
                    />
                  </Link>
                  <span
                    onClick={() => handleFavoriteRecipes(ele.id)}
                    className="absolute top-2 right-2 block h-10 w-10 rounded-full hover:cursor-pointer bg-orange-600 "
                  >
                    <Heart className="absolute top-2 right-2 block text-white" />
                  </span>
                </span>
              </div>
              <Link to={`/recipes/${ele.id}`}>
                <div className="p-4">
                  <h1 className="text-lg font-bold ">{ele.title}</h1>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
