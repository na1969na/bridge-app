import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './common/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import useUserStore from '../stores/useUserStore';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth0();
  const { setUser } = useUserStore();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    setUser(null);
  };

  return (
    <div className="flex justify-between items-center px-10 py-3">
      <div className="flex items-center">
        <Link to="/" className="text-3xl font-bold">
          BRIDGE
        </Link>
        <img className="w-18 h-10" src="/icon.svg" alt="Bridge Icon" />
      </div>
      <div className="flex gap-5">
        <Button className="text-3xl p-2 rounded-full bg-rose text-black hover:opacity-80">
          <Link to="/settings">
            <IoSettingsOutline />
          </Link>
        </Button>
        <Button
          className="text-3xl p-2 rounded-full bg-olive-green text-black hover:opacity-80"
          onClick={handleLogout}
        >
          <IoLogOutOutline />
        </Button>
        <img
          className="rounded-full w-11 h-11"
          src={user?.picture}
          alt={user?.name}
        />
      </div>
    </div>
  );
};

export default Navbar;
