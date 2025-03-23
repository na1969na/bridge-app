import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-black text-resene">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex lg:flex-1 text-3xl">
              <div className="flex items-center font-semibold">BRIDGE</div>
            </div>
          </div>
          <div>
            &copy; {new Date().getFullYear()} BRIDGE. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/nana-okamoto/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Author
            </a>
            {/* Aboutページへのリンクを追加 */}
            <Link to="/about" className="text-sky-500 hover:text-sky-700">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
