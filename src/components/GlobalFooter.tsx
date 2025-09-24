import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GithubIcon, 
  HeartIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  MailIcon,
  ExternalLinkIcon
} from 'lucide-react';

const GlobalFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* SVG Gradient Definitions */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <GithubIcon className="h-8 w-8 mr-2 icon-gradient" />
              <span className="text-xl font-bold">SkillScan</span>
            </div>
            <p className="text-gray-400 mb-4">
              Data-driven GitHub profile analysis for better technical hiring decisions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <MailIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/analyze" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Analyze Profiles
                </Link>
              </li>
              <li>
                <Link to="/candidates" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Candidates
                </Link>
              </li>
              <li>
                <Link to="/scheduled-calls" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Scheduled Interviews
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/how-scores-are-calculated" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  How Scores Work
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span>Documentation</span>
                  <ExternalLinkIcon className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span>API Reference</span>
                  <ExternalLinkIcon className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span>Blog</span>
                  <ExternalLinkIcon className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span>GitHub</span>
                  <ExternalLinkIcon className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SkillScan. All rights reserved.
          </p>
          <div className="flex items-center text-gray-400 text-sm">
            <span>Made with</span>
            <div className="inline-flex mx-1 relative">
              <HeartIcon className="h-4 w-4 text-red-500 animate-pulse" />
            </div>
            <span>for recruiters</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;