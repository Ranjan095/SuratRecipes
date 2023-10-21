/** @format */

import React, { useEffect, useState } from "react";
import { Star, ChevronDown, Loader2, Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../../assets/URL/API_KET/API_KEY";
import { useDispatch, useSelector } from "react-redux";
import { TOAST_ERROR } from "../../utils/toast";
import { addFavorite } from "../../Redux/slices/recipeSlice";

export default function ProductDetails() {
  let params = useParams();
  let { id } = params;
  let [data, setData] = useState({});
  let [isLoading, setIsLoading] = useState(false);
  let dispatch = useDispatch();
  let { token } = useSelector((store) => store.user);
  let navigate = useNavigate();

  let getData = () => {
    setIsLoading(true);
    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      )
      .then((res) => {
        setIsLoading(false);
        setData(res.data);
        // console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  let handleFavoriteRecipes = (id) => {
    if (!token) {
      TOAST_ERROR("Please login");
      navigate("/login");
      return;
    }
    // TOAST_SUCCESS(`item has been added to favorite list ${id}`);
    dispatch(addFavorite({ productId: id, token }));
  };

  useEffect(() => {
    getData();
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center text-center h-screen">
      <Loader2 className="motion-safe:animate-spin text-gray-500 " size={100} />
    </div>
  ) : (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
          <img
            alt="Nike Air Max 21A"
            className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
            src={data.image}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500">
              {id}
            </h2>
            <h1 className="my-4 text-3xl font-semibold text-black">
              {data.title}
            </h1>

            <p className="leading-relaxed">{data.summary}</p>
            <div className="mb-5 mt-6 flex items-end justify-end border-b-2 border-gray-100 pb-5">
              <span
                onClick={() => handleFavoriteRecipes(id)}
                className=" relative top-2 right-2 block h-10 w-10 rounded-full hover:cursor-pointer bg-orange-600 "
              >
                <Heart
                  className={` absolute   top-2 right-2  block text-white`}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
