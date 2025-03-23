import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import Home from './pages/Home';
import LoadingContainer from './components/common/LoadingContainer';
import Layout from './components/Layout/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from './components/common/Toast';
import UserSettings from './pages/UserSettings';
import About from './pages/About';

const AppRoutes: React.FC = () => {
  const { VITE_AUTH0_ISSUER_BASE_URL, VITE_AUTH0_CLIENT_ID, VITE_DOMAIN } =
    import.meta.env;

  const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
      <Auth0Provider
        domain={VITE_AUTH0_ISSUER_BASE_URL}
        clientId={VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: VITE_DOMAIN,
        }}
      >
        {children}
      </Auth0Provider>
    );
  };

  const queryClient = new QueryClient();

  /**
   * Router Component
   * @returns  Router
   */
  const Router = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Toast />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<UserSettings />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  const AuthRouting = withAuthenticationRequired(Router, {
    onRedirecting: () => (
      <>
        <LoadingContainer />
      </>
    ),
  });

  return (
    <AuthProvider>
      <AuthRouting />
    </AuthProvider>
  );
};

export default AppRoutes;
