import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { LuTicket } from "react-icons/lu";
import { IoIosSettings } from "react-icons/io";

function Sidebar() {
  const dashLink = (
    <>
      <Link
        to="/profile"
        className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
      >
        <FaUser />
        <span className="mx-4 font-medium">My Profile</span>
      </Link>
      <Link
        to="/dashboard"
        className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
      >
        <MdDashboard />
        <span className="mx-4 font-medium">Dashboard</span>
      </Link>
    </>
  );
  return (
    <div>
      <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <Link to="/">
          <img
            className="w-auto h-6 sm:h-7"
            src="https://i.ibb.co/qnfmDWY/logo.png"
            alt=""
          />
        </Link>

        <div className="mt-7">
          <Link to="/" className="flex items-center px-4 -mx-2">
            <img
              className="object-cover mx-2 rounded-full h-9 w-9"
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              alt="avatar"
            />
            <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
              John Doe
              <span className="block">
                <small>Admin</small>
              </span>
            </span>
          </Link>
        </div>

        <div className="relative mt-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch />
          </span>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Search"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>{dashLink}</nav>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
