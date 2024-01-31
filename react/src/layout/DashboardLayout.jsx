import React, { useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = (show) => {
    setShowSidebar(show);
  };

  return (
    <div>
      <Header showSidebar={showSidebar} />
      <SideBar toggleSidebar={toggleSidebar} />
      <div></div>
      <Footer />
    </div>
  );
};

export default Dashboard;
