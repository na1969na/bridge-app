import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-black text-resene">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex lg:flex-1 text-3xl">
              <div className="flex items-center font-semibold">
                BRIDGE
              </div>
            </div>
          </div>
          <div>
            &copy; {new Date().getFullYear()} BRIDGE. All rights reserved.
          </div>
          <div>
            <a href="https://www.linkedin.com/in/nana-okamoto/" target="_blank" rel="noopener noreferrer">
              Author
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
