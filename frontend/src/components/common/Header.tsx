import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-10 py-3">
      <div className="flex items-center">
        <Link to="/" className="text-3xl font-bold">
          BRIDGE
        </Link>
        <img className="w-18 h-10" src="/icon.svg" alt="Bridge Icon" />
      </div>
    </div>
  );
};

export default Header;
