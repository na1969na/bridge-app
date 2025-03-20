import React from 'react';
import AuthButtons from './auth/AuthButtons';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="px-5 py-3">
      <div className="flex justify-between items-center border-b px-10 py-3">
        <div className="flex items-center">
          <Link to="/" className="text-3xl font-bold">
            BRIDGE
          </Link>
          <img className="w-18 h-10" src="/icon.svg" alt="Bridge Icon" />
        </div>
        <div className="flex items-center gap-5">
          <AuthButtons />
        </div>
      </div>
    </div>
  );
};

export default Header;
