import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import CheckIn from "./pages/CheckIn";
import Dashboard from "./pages/Dashboard";
import PostLoginRedirect from "./components/auth/PostLoginRedirect";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Layout>
          <PostLoginRedirect />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
