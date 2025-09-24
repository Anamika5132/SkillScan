import React from 'react';
import { BellIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const [showDropdown, setShowDropdown] = React.useState(false);
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    navigate('/login');
  };
  
  return (
    <header className="bg-white shadow-sm rounded-xl mb-6">
      <div className="flex justify-between items-center px-4 sm:px-8 py-3 sm:py-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-1 sm:p-2 rounded-full hover:bg-gray-100">
            <BellIcon className="h-5 w-5 text-gray-600" />
          </button>
          <div className="relative">
            <button 
              className="flex items-center"
              onClick={() => isAuthenticated ? setShowDropdown(!showDropdown) : handleLogin()}
            >
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700">
                {isAuthenticated ? user?.name || 'Admin' : 'Sign In'}
              </span>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOutIcon className="h-4 w-4 mr-2 text-gray-500" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;