import React from "react";

const layout = ({ children }) => {
  return (
    <div className="w-[100vw] flex flex-col items-center justify-center">{children}</div>
  );
};

export default layout;
