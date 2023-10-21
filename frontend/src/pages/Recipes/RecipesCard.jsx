/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TOAST_ERROR } from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../Redux/slices/recipeSlice";
import { Heart } from "lucide-react";

const RecipesCard = ({ id, image, title }) => {
  let { token } = useSelector((store) => store.user);
  let { isFavLoading } = useSelector((store) => store.recipes);

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let handleFavoriteRecipes = (id) => {
    if (!token) {
      TOAST_ERROR("Please login");
      navigate("/login");
      return;
    }
    // TOAST_SUCCESS(`item has been added to favorite list ${id}`);
    dispatch(addFavorite({ productId: id, token }));
  };
  return (
    <div>
      <div
        key={id}
        className="flex justify-center text-center items-center hover:text-red-500"
      >
        {" "}
        <div className="w-[150px] md:w-[300px] rounded-md border">
          <div className="flex justify-center">
            {" "}
            <span className="relative inline-block">
              <Link to={`/recipes/${id}`}>
                <img
                  src={
                    image
                      ? image
                      : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  }
                  alt={"image"}
                  className={` h-[150px] md:h-[300px] w-full rounded-md object-cover `}
                />
              </Link>
              <span
                onClick={() => handleFavoriteRecipes(id)}
                className="absolute top-2 right-2 block h-10 w-10 rounded-full hover:cursor-pointer bg-orange-600 "
              >
                <Heart
                  className={`  absolute top-2 right-2  block text-white`}
                />
              </span>
            </span>
          </div>
          <Link to={`/recipes/${id}`}>
            <div className="p-4">
              <h1 className="text-lg font-bold ">{title}</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipesCard;
