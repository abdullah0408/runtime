import React from "react";
import Navbar from "@/components/Navbar";

const layout = ({ children }) => {
  return (
    <div className="w-[100vw]">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
