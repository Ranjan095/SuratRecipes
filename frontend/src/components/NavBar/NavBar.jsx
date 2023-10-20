/** @format */

import React, { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SuratRecipes from "../../assets/images/SuratRecipes.png";
import loginLogo from "../../assets/images/loginLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/slices/userSlice";
import Modal from "../modal/Modal";

const menuItems = [
  // {
  //   name: "Home",
  //   href: "/",
  // },
  {
    name: "Recipes",
    href: "/recipes",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /** for logout modal */
  let [isOpen, setIsOpen] = useState(false);

  let { token, userName } = useSelector((store) => store.user);
  let dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let handleLogoutModal = () => {
    // dispatch(logout());
    setIsOpen(true);
    toggleMenu();
  };

  return (
    <div className=" w-full bg-white border-b sticky top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Link to={"/"}>
              <img className=" w-16 h-16 " src={SuratRecipes} />
            </Link>
          </span>
          {/* <span className="font-bold">Surat Recipes</span> */}
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                  <span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {token ? (
          <div className=" hidden lg:block">
            {" "}
            <div className="ml-3 mt-4 flex items-center space-x-2">
              <span className="relative inline-block">
                <img
                  className="h-10 w-10 rounded-full ring ring-green-200"
                  src={loginLogo}
                  alt="user"
                />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {userName}
                </span>
                <button
                  onClick={handleLogoutModal}
                  className=" bg-red-500 text-white rounded-md font-semibold px-2"
                >
                  logout
                </button>
              </span>
            </div>
          </div>
        ) : (
          <div className="hidden space-x-2 lg:block">
            <Link to={"/signup"}>
              <button
                type="button"
                className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Sign Up
              </button>
            </Link>
            <Link to={"/login"}>
              <button
                type="button"
                className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Log In
              </button>
            </Link>
          </div>
        )}

        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <Link to={"/"} onClick={toggleMenu}>
                    <div className="inline-flex items-center space-x-2">
                      <span>
                        <img className=" w-16 h-16 " src={SuratRecipes} />
                      </span>
                      <span className="font-bold">Surat Recipes</span>
                    </div>
                  </Link>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        onClick={toggleMenu}
                        key={item.name}
                        to={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                        <span>
                          <ChevronRight className="ml-3 h-4 w-4" />
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
                {token ? (
                  <div className="ml-3 mt-4 flex items-center space-x-2">
                    <span className="relative inline-block">
                      <img
                        className="h-10 w-10 rounded-full ring ring-green-200"
                        src={loginLogo}
                        alt="user"
                      />
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {userName}
                      </span>
                      <button
                        onClick={handleLogoutModal}
                        className=" bg-red-500 text-white rounded-md font-semibold px-2"
                      >
                        logout
                      </button>
                    </span>
                  </div>
                ) : (
                  <div className="mt-2 space-y-2">
                    <button
                      type="button"
                      className="w-full rounded-md border border-black text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <Link
                        className=" block w-full px-3 py-2  "
                        to={"/signup"}
                      >
                        {" "}
                        Sign Up
                      </Link>
                    </button>

                    <button
                      onClick={toggleMenu}
                      type="button"
                      className="w-full rounded-md bg-black text-sm font-semibold text-white hover:text-black shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <Link className=" block w-full px-3 py-2  " to={"/login"}>
                        Log In
                      </Link>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <LogOutModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default NavBar;





let LogOutModal = ({ isOpen, setIsOpen }) => {
  let dispatch = useDispatch();

  let handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };
  return (
    <div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              {/* <span className="sr-only">Close modal</span> */}
            </button>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to logout?
              </h3>
              <button
                onClick={handleLogout}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setIsOpen(false)}
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
