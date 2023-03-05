import React from "react";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";

const Header = () => {
  function logoutUser() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <>
      <div className="navbar  z-10 flex justify-between  bg-base-100 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn-primary drawer-button btn lg:hidden"
          >
            <Bars3Icon className="inline-block h-5 w-5" />
          </label>
          <h1 className="ml-2 text-2xl font-semibold">{"abc"}</h1>
        </div>

        <div className="order-last">
          <div className="dropdown-end dropdown ml-4">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
