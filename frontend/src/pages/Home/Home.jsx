/** @format */

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

let arr = [
  {
    name: "img1",
    src: "https://spoonacular.com/recipeImages/715446-312x231.jpg",
  },
  {
    name: "Kidney",
    src: "https://spoonacular.com/recipeImages/782601-312x231.jpg",
  },
  {
    name: "Fajita",
    src: "https://spoonacular.com/recipeImages/795751-312x231.jpg",
  },
  {
    name: "Hummus",
    src: "https://spoonacular.com/recipeImages/766453-312x231.jpg",
  },
  {
    name: "Hummus",
    src: "https://spoonacular.com/recipeImages/766453-312x231.jpg",
  },
];

const Home = () => {
  let images = [
    "https://spoonacular.com/recipeImages/715446-312x231.jpg",
    "https://spoonacular.com/recipeImages/782601-312x231.jpg",
    "https://spoonacular.com/recipeImages/795751-312x231.jpg",
    "https://spoonacular.com/recipeImages/766453-312x231.jpg",
    "https://spoonacular.com/recipeImages/795751-312x231.jpg",
    "https://spoonacular.com/recipeImages/78201-312x231.jpg",
  ];
  let value = Math.floor(Math.random() * images.length);
  return (
    <div className=" space-y-10">
      {/* Hero Section */}
      <div className="relative w-full bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
            <Link to={"/recipes"}>
              <img
                className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
                src={images[value]}
                alt=""
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
            <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
              <p className="text-sm font-medium">
                Welcome to Surat Recipes &rarr;
              </p>
            </div>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-black md:text-3xl lg:text-4xl">
              We Care About Your Health, Prioritizing Wellness and Well-being
            </h1>
            <p className="mt-8 text-lg text-gray-700">
              Discover a world of culinary delights with our recipes. From quick
              and easy weeknight dinners to gourmet feasts, we offer a variety
              of dishes for every taste and skill level. Enjoy the art of
              cooking, create memorable meals, and savor the satisfaction of
              each bite.
            </p>

            <div className=" flex justify-center">
              <Link to={"/recipes"}>
                {" "}
                <span className=" relative top-2 right-2 block h-10 w-10 rounded-full hover:cursor-pointer bg-orange-600 ">
                  <Search
                    className={` absolute   top-2 right-2  block text-white`}
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className=" text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Explore our recipes collection, From savory classics to exotic flavors!
        </p>
      </div>

      <div className="mb-6">
        <Slider {...settings}>
          {arr.map((ele, i) => {
            return (
              <Link to={"/recipes"}>
                <div key={i} className="rounded-lg border border-solid">
                  <img
                    alt="Mandir"
                    className="max-h-[200px] md:max-h-[300px] lg:max-h-[350px] object-cover"
                    src={ele.src}
                  />
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
