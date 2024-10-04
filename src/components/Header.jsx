import React from "react";
import logo from "./LogoIcon.png"



const Header = () => {
  return (
    <div className="justify-center items-center flex flex-row p-3">
<div className="mb-3">
<img src={logo} alt="logoGetImage_" className=" md:h-10 text-fuchsia-500 " />
</div>
<div>
<h1 className=" text-gray-400 text-center text-2xl mx-auto font-extrabold">
        GetImage_
      </h1>
</div>
    </div>
  );
};

export default Header;
