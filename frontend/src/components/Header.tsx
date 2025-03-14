import React from "react";
import AuthButtons from "./auth/AuthButtons";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="px-5 py-3">
      <div className="flex justify-between items-center border-b px-10 py-3">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-3xl font-bold">BRIDGE</Link>
          {/* <img
            className="w-10 h-10"
            src="/rainbow.svg"
            alt="Bridge Icon"
          /> */}
        </div>
        <div className="flex items-center gap-5">
          <AuthButtons />
        </div>
      </div>
    </div>
  );
};

export default Header;
