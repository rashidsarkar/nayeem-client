import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";

import Login from "../Pages/Account/Login";
import SignUp from "../Pages/Account/SignUp";

import NotFound from "../Pages/NotFound ";
import Home from "../Pages/Home/Home";
// import About from "../Components/About";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Apartment from "../Pages/Apartment/Apartment";
import Maindashbord from "../Dashboard/Maindashbord/Maindashbord";
import UserProfile from "../Dashboard/UserProfile/UserProfile";
import UserAnnouncements from "../Dashboard/UserProfile/UserAnnouncements";
import AdminProfile from "../Dashboard/Admin/AdminProfile/AdminProfile";
import ManageMembers from "../Dashboard/Admin/ManageMembers/ManageMembers";
import MakeAnnouncement from "../Dashboard/Admin/MakeAnnouncement/MakeAnnouncement";
import AgreementRequests from "../Dashboard/Admin/AgreementRequests/AgreementRequests";
import MemberProfile from "../Dashboard/member/MemberProfile/MemberProfile";
import Makepayment from "../Dashboard/member/Makepayment/Makepayment";
import PaymentHistory from "../Dashboard/member/PaymentHistory/PaymentHistory";
import ManageCoupons from "../Dashboard/Admin/ManageCoupons/ManageCoupons";
import AdminRoute from "../PrivateRoute/AdminRoute";
import Checkout from "../Dashboard/member/Makepayment/Checkout/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/apartment",
        element: (
          <Apartment />

          // <PrivateRoute>
          //   <Apartment />
          // </PrivateRoute>
          // <AdminRoute>
          //   <Apartment />
          // </AdminRoute>
        ),
      },
      // {
      //   path: "/about",
      //   element: (
      //     <PrivateRoute>
      //       <About></About>,
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "/Login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      ///dasg bord
    ],
  },
  //dashbord
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Maindashbord />
      </PrivateRoute>
    ),
    children: [
      {
        path: "userProfile",
        element: <UserProfile />,
      },
      {
        path: "UserAnnouncements",
        element: <UserAnnouncements />,
      },
      // admin route
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "manageMembers",
        element: (
          <AdminRoute>
            <ManageMembers />
          </AdminRoute>
        ),
      },
      {
        path: "makeAnnouncement",
        element: (
          <AdminRoute>
            <MakeAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: "agreementRequests",
        element: (
          <AdminRoute>
            <AgreementRequests />
          </AdminRoute>
        ),
      },
      {
        path: "ManageCoupons",
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        ),
      },
      // member route
      {
        path: "MemberProfile",
        element: <MemberProfile />,
      },
      {
        path: "Makepayment",
        element: <Makepayment />,
      },
      {
        path: "checkOutpayment",
        // element: <Checkout />,
        element: <Checkout />,
      },
      {
        path: "PaymentHistory",
        element: <PaymentHistory />,
      },
    ],
  },
]);
export default router;
