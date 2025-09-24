import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  GithubIcon, 
  MenuIcon, 
  XIcon, 
  SearchIcon, 
  BarChart2Icon, 
  UsersIcon, 
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  BookOpenIcon,
  UserIcon,
  LogOutIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const GlobalHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Check if we're on the homepage
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  
  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    navigate('/login');
  };
  
  // Header classes - always the same style, no scroll behavior
  const headerClasses = `relative z-50 bg-gradient-to-r from-purple-900 to-indigo-900 shadow-md py-4 rounded-xl container mx-auto`;
  
  // Always use white text for better visibility
  const textColor = 'text-white';
  const linkHoverColor = 'hover:text-indigo-200';
  const buttonBgColor = 'bg-indigo-600 hover:bg-indigo-700 text-white';
  
  // Special case for login/signup pages
  const isAuthPage = isLoginPage || isSignupPage;
  
  return (
    <header className={headerClasses}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <GithubIcon className="h-8 w-8 mr-2 icon-gradient" />
            <span className={`text-xl font-bold ${textColor}`}>SkillScan</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/analyze" 
                  className={`${textColor} ${linkHoverColor} font-medium transition-colors`}
                >
                  Analyze
                </Link>
                <Link 
                  to="/candidates" 
                  className={`${textColor} ${linkHoverColor} font-medium transition-colors`}
                >
                  Candidates
                </Link>
                <Link 
                  to="/scheduled-calls" 
                  className={`${textColor} ${linkHoverColor} font-medium transition-colors`}
                >
                  Interviews
                </Link>
                <Link 
                  to="/jobs" 
                  className={`${textColor} ${linkHoverColor} font-medium transition-colors`}
                >
                  Jobs
                </Link>
              </>
            ) : (
              <div className="flex-1"></div> // Empty div to push content to the right
            )}
          </nav>
          
          {/* User Menu / Login Button */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated && !isAuthPage && (
              <Link 
                to="/how-scores-are-calculated" 
                className={`${textColor} ${linkHoverColor} font-medium transition-colors`}
              >
                How It Works
              </Link>
            )}
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  className="flex items-center"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${textColor}`}>
                    {user?.name || 'Admin'}
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
            ) : (
              !isAuthPage && (
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-md font-medium ${buttonBgColor} transition-colors shadow-md hover:shadow-lg`}
                >
                  Sign In
                </Link>
              )
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XIcon className={`h-6 w-6 ${textColor}`} />
              ) : (
                <MenuIcon className={`h-6 w-6 ${textColor}`} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-br from-purple-800 to-indigo-800 shadow-lg absolute top-full left-0 right-0 mt-2 mx-4 rounded-lg">
          <nav className="flex flex-col py-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/analyze" 
                  className="px-4 py-3 hover:bg-purple-700 flex items-center text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <SearchIcon className="h-5 w-5 mr-2 text-indigo-300" />
                  <span>Analyze</span>
                </Link>
                <Link 
                  to="/candidates" 
                  className="px-4 py-3 hover:bg-purple-700 flex items-center text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UsersIcon className="h-5 w-5 mr-2 text-indigo-300" />
                  <span>Candidates</span>
                </Link>
                <Link 
                  to="/scheduled-calls" 
                  className="px-4 py-3 hover:bg-purple-700 flex items-center text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CalendarIcon className="h-5 w-5 mr-2 text-indigo-300" />
                  <span>Interviews</span>
                </Link>
                <Link 
                  to="/hired-candidates" 
                  className="px-4 py-3 hover:bg-purple-700 flex items-center text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CheckCircleIcon className="h-5 w-5 mr-2 text-indigo-300" />
                  <span>Hired</span>
                </Link>
                <Link 
                  to="/jobs" 
                  className="px-4 py-3 hover:bg-purple-700 flex items-center text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BriefcaseIcon className="h-5 w-5 mr-2 text-indigo-300" />
                  <span>Jobs</span>
                </Link>
              </>
            ) : (
              <Link 
                to="/how-scores-are-calculated" 
                className="px-4 py-3 hover:bg-purple-700 flex items-center text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpenIcon className="h-5 w-5 mr-2 text-indigo-300" />
                <span>How It Works</span>
              </Link>
            )}
            <div className="border-t border-purple-700 mt-2 pt-2">
              {!isAuthenticated && !isAuthPage && (
                <Link 
                  to="/login" 
                  className="px-4 py-3 hover:bg-purple-700 flex items-center text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserIcon className="h-5 w-5 mr-2 text-indigo-300" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default GlobalHeader;