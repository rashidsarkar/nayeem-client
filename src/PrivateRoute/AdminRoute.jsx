/* eslint-disable react/prop-types */

import CustomLoading from "../Components/CustomLoading";

import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

function AdminRoute({ children }) {
  const location = useLocation();
  const { user, loading } = useAuth();

  const { adminLoading, isAdmin } = useAdmin();
  let isUser = user ? true : false;
  // console.log(adminLoading, loading);
  // console.log(isAdmin, isUser);

  if (adminLoading || loading)
    return (
      <div className="w-24 mx-auto loadd">
        <CustomLoading></CustomLoading>
      </div>
    );

  if (isAdmin & isUser) return children;
  return <Navigate state={location.pathname} to={"/"} replace></Navigate>;
}

export default AdminRoute;
