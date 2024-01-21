import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthProvider from "../../FireBase/useAuthProvider";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./nabvar.css";
import Headroom from "react-headroom";
import useRole from "../../hooks/useRole";
import CustomLoading from "../CustomLoading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function NavBar() {
  // Replace with your actual authentication logic
  const navigate = useNavigate();

  const { user, logOut, loading } = useAuthProvider();
  let navDashLink = "/dashboard/userProfile";

  const { userRole, isLoading, isError, error } = useRole();
  if (!loading) {
    console.log(userRole, "from navbar");

    // let dashboardLinks = dashLink;
    if (userRole == "member") {
      navDashLink = "/dashboard/MemberProfile";
      console.log("role member");
    } else if (userRole == "admin") {
      console.log("role  admin");
      navDashLink = "/dashboard/adminProfile";
    } else if (userRole == "user") {
      console.log(" role user");
      navDashLink = "/dashboard/userProfile";
    }
  }

  const handleSingOut = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending text-[#021327] "
              : isActive
              ? "text-[#503CA1] font-semibold"
              : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/apartment"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending text-[#021327] "
              : isActive
              ? "text-[#503CA1] font-semibold"
              : ""
          }
        >
          Apartment
        </NavLink>
      </li>

      <li></li>
    </>
  );
  // console.log(user?.photoURL);
  return (
    <Headroom
      style={{
        webkitTransition: "all .5s ease-in-out",
        mozTransition: "all .5s ease-in-out",
        oTransition: "all .5s ease-in-out",
        transition: "all .5s ease-in-out",
      }}
    >
      <div className="left-0 right-0 z-50 w-full mx-auto rounded-b-none bg-[#16486396] max-w-7xl h-28 navbar">
        <div className="w-full lg:w-[50%] navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-700 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="text-xl normal-case btn btn-ghost ">
            <img
              src="https://i.ibb.co/qnfmDWY/logo.png"
              className="h-full"
              alt=""
            />

            {/* LOGO IMG */}
          </a>
        </div>
        <div className="hidden navbar-center lg:flex lg:ml-[100px]">
          <ul className="inline-flex flex-row flex-wrap p-2 px-1 space-x-4 text-xl font-semibold menuu menuu-horizontal">
            {navLinks}
          </ul>
        </div>

        <div className="justify-end navbar-end">
          {user ? (
            // User is authenticated, show user menu
            <div className="dropdown dropdown-end">
              <div
                className="cursor-pointer tooltip tooltip-left"
                data-tip={user.displayName}
              >
                <div tabIndex={0} className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={user.photoURL || "photoURL"} />
                  </div>
                </div>
              </div>

              <ul
                tabIndex={0}
                className="mt-3 w-[250px] z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box "
              >
                <li>
                  <div className="flex flex-col px-4 py-3 ">
                    <span className="block text-sm text-[#503CA1] dark:text-white">
                      {user.displayName || "Display Name"}
                    </span>
                    <span className="block text-sm text-[#503CA1] truncate dark:text-gray-400">
                      {user.email || "Email"}
                    </span>
                  </div>
                </li>

                <li className="mx-auto text-center text-[#503CA1]">
                  <Link to={navDashLink}>Dashboard</Link>
                  {/*  */}
                </li>
                <li className="mx-auto text-center text-[#503CA1]">
                  <Link onClick={handleSingOut}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            // User is not authenticated, show login button
            <ul className="inline-flex flex-row flex-wrap gap-3 p-2 px-1 text-xl text-white menuu menuu-horizontal">
              <li>
                <NavLink
                  to="/Login"
                  className="inline-block rounded bg-[#DDF2FD] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[#427D9D] shadow-md transition duration-150 ease-in-out hover:bg-[#9BBEC8] hover:shadow-lg focus:bg-[#9BBEC8]focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#9BBEC8] active:shadow-lg dark:shadow-md dark:hover:shadow-lg dark:focus:shadow-lg dark:active:shadow-md"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </Headroom>
  );
}

export default NavBar;
