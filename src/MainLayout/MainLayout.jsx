import { Outlet } from "react-router-dom";

import Footer from "../Pages/Footer/Footer";
import NavBar from "../Components/Navbar/NavBar";

function MainLayout() {
  return (
    <div data-theme="wireframe" className="mx-auto max-w-7xl">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
