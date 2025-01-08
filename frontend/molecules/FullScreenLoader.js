import Spinner from "../atoms/Spinner";
import React from "react";

const FullScreenLoader = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default FullScreenLoader;
