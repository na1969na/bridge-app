import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CheckIn from "./pages/CheckIn";
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
            <Route path="/register" element={<Register />} />
            <Route path="/checkin" element={<CheckIn />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
