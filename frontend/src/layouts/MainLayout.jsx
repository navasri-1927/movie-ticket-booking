import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;