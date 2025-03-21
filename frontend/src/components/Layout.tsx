import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
