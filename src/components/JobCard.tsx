import React from 'react';
import { Job } from '../types';
import { BriefcaseIcon, MapPinIcon, UsersIcon, DollarSignIcon, ClockIcon, WifiIcon, WifiOffIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();
  
  const getPositionBadge = () => {
    switch (job.position) {
      case 'frontend':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Frontend</span>;
      case 'backend':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Backend</span>;
      case 'fullstack':
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Fullstack</span>;
      case 'webdesigner':
        return <span className="px-2 py-1 text-xs rounded-full bg-pink-100 text-pink-800">Web Designer</span>;
      case 'uxui':
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">UX/UI</span>;
      case 'devops':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">DevOps</span>;
      default:
        return null;
    }
  };

  const handleViewCandidates = () => {
    // Navigate to candidates page with filter for this job position
    navigate(`/candidates?position=${job.position}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-md bg-indigo-100 flex items-center justify-center mr-3 sm:mr-4">
              <BriefcaseIcon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">{job.title}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-600">
                <span>{job.department}</span>
                <span className="hidden sm:inline mx-2">•</span>
                <div className="flex items-center mt-1 sm:mt-0">
                  <MapPinIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            {getPositionBadge()}
          </div>
        </div>
        
        <div className="mt-3 sm:mt-4">
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{job.description}</p>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          {job.salary && (
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <DollarSignIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-600" />
              <span>{job.salary}</span>
            </div>
          )}
          
          {job.experience && (
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-blue-600" />
              <span>{job.experience}</span>
            </div>
          )}
          
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <UsersIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-indigo-600" />
            <span>{job.candidates} candidates</span>
          </div>
          
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            {job.remote ? (
              <>
                <WifiIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-600" />
                <span>Remote</span>
              </>
            ) : (
              <>
                <WifiOffIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-gray-600" />
                <span>On-site</span>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
          {job.requiredSkills.map((skill, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <button 
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            onClick={handleViewCandidates}
          >
            View Candidates
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;