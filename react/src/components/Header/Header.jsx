import React from "react";

export const Header = ({ showSidebar }) => {
  const headerStyle = showSidebar ? { marginLeft: "225px" } : {};

  return (
    <div
      className="header bg-white px-3 py-2.5 shadow-md flex justify-between items-center"
      style={headerStyle}
    >
      <h1 className="font-bold text-lg md:text-2xl text-primaryColor">
        Dashboard
      </h1>
    </div>
  );
};

export default Header;
