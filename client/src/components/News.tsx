import React from "react";
import { NewsProps } from "./types/News/interface";

const News: React.FC<NewsProps> = ({ companyName }) => {
  return (
    <div className="relative w-full bg-white flex flex-col justify-start rounded-3xl p-6 z-20 font-gothic-a1 font-semibold text-lg">
      <div className="m-12">{companyName}</div>
    </div>  
  );
};

export default News;
