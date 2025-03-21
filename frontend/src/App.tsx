import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserSettings from './pages/UserSettings';
import CheckIn from './pages/CheckIn';
import Dashboard from './pages/Dashboard';
import PostLoginRedirect from './components/auth/PostLoginRedirect';
import Layout from './components/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from './components/common/Toast';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <PostLoginRedirect />
            <Toast />
            <Routes>
              <Route path="*" element={<Home />} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="/checkin" element={<CheckIn />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
    </>
  );
};

export default App;
