import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import Home from "./pages/Home";

const AppRoutes = () => {
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

  /**
   * Router Component
   * @returns  Router
   */
  const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    );
  };

  const AuthRouting = withAuthenticationRequired(Router, {
    onRedirecting: () => (
      <>
        <p>Now Loading...</p>
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
