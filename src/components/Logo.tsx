import { Link } from "react-router-dom";

import { ILogoProps } from "../constants/interfaces";

const Logo = ({ size, className }: ILogoProps) => {
  return (
    <Link to="/">
      <div className={`flex items-center gap-0.5 lg:gap-1 ${className}`}>
        <span className={`font-bold dark:text-white ${size === "lg" ? "text-5xl" : "text-xl md:text-2xl"}`}>Blog</span>
        <img 
          src="/svgs/logo.svg" 
          alt="Logo" 
          className={size === "lg" ? "w-12 h-12" : "w-7 h-7 lg:w-9 lg:h-9"}
        />
        <span className={`font-bold dark:text-white ${size === "lg" ? "text-5xl" : "text-xl md:text-2xl"}`}>Saga</span>
      </div>
    </Link>
  );
};

export default Logo;
