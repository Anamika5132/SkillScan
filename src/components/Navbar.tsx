import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GithubIcon, BarChart3Icon, BriefcaseIcon, UsersIcon, 
  SearchIcon, MenuIcon, XIcon, CheckCircleIcon, CalendarIcon,
  BookOpenIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-indigo-800' : '';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64 lg:flex lg:flex-col lg:bg-indigo-900 lg:text-white">
        <div className="flex items-center justify-center h-16 border-b border-indigo-800">
          <GithubIcon className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">SkillScan</span>
        </div>
        <nav className="mt-8">
          <Link 
            to="/dashboard" 
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-indigo-800 ${isActive('/dashboard')}`}
          >
            <BarChart3Icon className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/candidates" 
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-indigo-800 ${isActive('/candidates')}`}
          >
            <UsersIcon className="h-5 w-5 mr-3" />
            <span>Candidates</span>
          </Link>
          <Link 
            to="/scheduled-calls" 
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-indigo-800 ${isActive('/scheduled-calls')}`}
          >
            <CalendarIcon className="h-5 w-5 mr-3" />
            <span>Scheduled Interviews</span>
          </Link>
          <Link 
            to="/hired-candidates" 
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-indigo-800 ${isActive('/hired-candidates')}`}
          >
            <CheckCircleIcon className="h-5 w-5 mr-3" />
            <span>Hired Candidates</span>
          </Link>
          <Link 
            to="/jobs" 
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-indigo-800 ${isActive('/jobs')}`}
          >
            <BriefcaseIcon className="h-5 w-5 mr-3" />
            <span>Jobs</span>
          </Link>
          <Link 
            to="/analyze" 
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-indigo-800 ${isActive('/analyze')}`}
          >
            <SearchIcon className="h-5 w-5 mr-3" />
            <span>Analyze Profile</span>
          </Link>
          <Link 
            to="/how-scores-are-calculated" 
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-indigo-800 ${isActive('/how-scores-are-calculated')}`}
          >
            <BookOpenIcon className="h-5 w-5 mr-3" />
            <span>How Scores Work</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-indigo-900 text-white rounded-xl">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            <GithubIcon className="h-7 w-7 mr-2" />
            <span className="text-lg font-bold">SkillScan</span>
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            {mobileMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/dashboard" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard') ? 'bg-indigo-800 text-white' : 'text-gray-300 hover:bg-indigo-700 hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <BarChart3Icon className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link 
              to="/candidates" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/candidates') ? 'bg-indigo-800 text-white' : 'text-gray-300 hover:bg-indigo-700 hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <UsersIcon className="h-5 w-5 mr-3" />
                <span>Candidates</span>
              </div>
            </Link>
            <Link 
              to="/scheduled-calls" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/scheduled-calls') ? 'bg-indigo-800 text-white' : 'text-gray-300 hover:bg-indigo-700 hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-3" />
                <span>Scheduled Interviews</span>
              </div>
            </Link>
            <Link 
              to="/hired-candidates" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/hired-candidates') ? 'bg-indigo-800 text-white' : 'text-gray-300 hover:bg-indigo-700 hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-3" />
                <span>Hired Candidates</span>
              </div>
            </Link>
            <Link 
              to="/jobs" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/jobs') ? 'bg-indigo-800 text-white' : 'text-gray-300 hover:bg-indigo-700 hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <BriefcaseIcon className="h-5 w-5 mr-3" />
                <span>Jobs</span>
              </div>
            </Link>
            <Link 
              to="/analyze" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/analyze') ? 'bg-indigo-800 text-white' : 'text-gray-300 hover:bg-indigo-700 hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <SearchIcon className="h-5 w-5 mr-3" />
                <span>Analyze Profile</span>
              </div>
            </Link>
            <Link 
              to="/how-scores-are-calculated" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/how-scores-are-calculated') ? 'bg-indigo-800 text-white' : 'text-gray-300 hover:bg-indigo-700 hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <BookOpenIcon className="h-5 w-5 mr-3" />
                <span>How Scores Work</span>
              </div>
            </Link>
          </nav>
        )}
      </div>
    </>
  );
};

export default Navbar;