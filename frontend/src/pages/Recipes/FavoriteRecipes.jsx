/** @format */

import React, { useEffect, useState } from "react";
import { ArrowDown, Loader2, X } from "lucide-react";
import axios from "axios";
import { baseURL } from "../../assets/URL/BaseURL";
import { useSelector } from "react-redux";
import { API_KEY } from "../../assets/URL/API_KET/API_KEY";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../utils/toast";
import { Link } from "react-router-dom";

const FavoriteRecipes = () => {
  let [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [reLoad, setReLoad] = useState(false);

  let { token } = useSelector((store) => store.user);

  let getUser = () => {
    setIsLoading(true);
    axios
      .get(`${baseURL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let ids = res.data.favRecipes.join();
        // console.log("==>", ids);

        axios
          .get(
            `https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY}&ids=${ids}`
          )
          .then((res) => {
            setIsLoading(false);
            // console.log(res);
            setData(res.data);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
            TOAST_ERROR(err.response.data.message);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  let handleDelete = (id) => {
    axios
      .post(
        `${baseURL}/recipes/removeFavorite`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setReLoad(!reLoad);
        TOAST_SUCCESS("Successfully deleted");
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, [reLoad]);

  return isLoading ? (
    <div className="flex justify-center items-center text-center h-screen">
      <Loader2 className="motion-safe:animate-spin text-gray-500 " size={100} />
    </div>
  ) : !data.length ? (
    <div className=" h-screen">
      <h1 className=" text-2xl md:text-3xl   text-center font-bold">
        No Seved Items are avalabe! <br />
      </h1>
      <Link to={"/recipes"} className=" flex justify-center text-center ">
        <span className=" font-bold text-center border-b-2  border-blue-700 text-blue-400">
          Go to Recipes page
        </span>
      </Link>
    </div>
  ) : (
    <div className="mx-auto my-4 max-w-4xl md:my-6 min-h-screen">
      <div className="overflow-hidden rounded-xl border border-gray-100 shadow">
        <div className="grid grid-cols-1 ">
          {" "}
          {/**md:grid-cols-2 */}
          {/* Product List */}
          <div className="px-5 py-6 md:border-r md:border-r-gray-200 md:px-8">
            <div className="flow-root">
              <ul className="-my-7 divide-y divide-gray-200">
                {data.map((ele, i) => (
                  <li
                    key={Math.random()}
                    className="flex items-stretch justify-between space-x-5 py-7"
                  >
                    <div className="flex flex-1 items-stretch">
                      <div className="flex-shrink-0">
                        <img
                          className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                          src={ele.image}
                          alt={ele.title}
                        />
                      </div>

                      <div className="ml-5 flex flex-col justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">
                            {ele.title}
                          </p>
                          <p className="mt-1.5 text-sm font-medium text-gray-600">
                            {ele.sourceName}
                          </p>
                        </div>
                        <p className="mt-4 text-sm font-medium text-gray-500">
                          x 1
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col items-end justify-between">
                      <p className="text-right text-sm font-bold text-gray-900">
                        {"Remove"}
                      </p>
                      <button
                        onClick={() => handleDelete(ele.id)}
                        type="button"
                        className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      >
                        <span className="sr-only">Remove </span>
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {/* <hr className="mt-6 border-gray-200" />
              <ul className="mt-6 space-y-3">
                <li className="flex items-center justify-between">
                  <p className="text-sm font-medium">Sub total</p>
                  <p className="text-sm font-medium">₹1,14,399</p>
                </li>
                <li className="flex items-center justify-between">
                  <p className="text-sm font-medium ">Total</p>
                  <p className="text-sm font-bold ">₹1,14,399</p>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteRecipes;
