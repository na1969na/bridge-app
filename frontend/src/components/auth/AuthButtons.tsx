import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthButtons: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <button
          className="bg-black px-5 py-2 rounded-full text-resene hover:opacity-80 hover:cursor-pointer"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          LOGOUT
        </button>
      ) : (
        <button
          className="bg-black px-5 py-2 rounded-full text-resene hover:opacity-80 hover:cursor-pointer"
          onClick={() => loginWithRedirect()}
        >
          LOGIN
        </button>
      )}
    </div>
  );
};

export default AuthButtons;
