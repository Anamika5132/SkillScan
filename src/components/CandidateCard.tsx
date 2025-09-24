import React from 'react';
import { Candidate } from '../types';
import { CheckCircleIcon, XCircleIcon, ClockIcon, EyeIcon, BarChart2Icon, CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetricInfoTooltip from './MetricInfoTooltip';
import { updateCandidateStatus } from '../services/candidateService';

interface CandidateCardProps {
  candidate: Candidate;
  onCompareClick: (candidate: Candidate) => void;
  onScheduleClick?: (candidate: Candidate) => void;
  onStatusChange?: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  onCompareClick, 
  onScheduleClick,
  onStatusChange 
}) => {
  const getStatusIcon = () => {
    switch (candidate.status) {
      case 'hired':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'reviewed':
        return <EyeIcon className="h-5 w-5 text-blue-500" />;
      case 'scheduled':
        return <CalendarIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = () => {
    switch (candidate.status) {
      case 'hired':
        return 'Hired';
      case 'rejected':
        return 'Rejected';
      case 'reviewed':
        return 'Reviewed';
      case 'scheduled':
        return 'Interview Scheduled';
      default:
        return 'Pending';
    }
  };

  const getScoreColor = () => {
    if (candidate.matchScore >= 90) return 'text-green-600 bg-green-100';
    if (candidate.matchScore >= 75) return 'text-blue-600 bg-blue-100';
    if (candidate.matchScore >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPositionBadge = () => {
    switch (candidate.position) {
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

  const handleScheduleInterview = async () => {
    try {
      await updateCandidateStatus(candidate.id, 'scheduled');
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error('Error scheduling interview for candidate:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <img 
              src={candidate.avatarUrl} 
              alt={candidate.name} 
              className="h-12 w-12 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{candidate.name}</h3>
              <div className="text-sm text-gray-600">@{candidate.githubUsername}</div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            {getStatusIcon()}
            <span className="ml-1">{getStatusText()}</span>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className={`flex-1 mr-2 px-3 py-1 rounded-full text-sm font-medium ${getScoreColor()}`}>
            {candidate.matchScore}% Match
          </div>
          <div className="flex-1 ml-2">
            {getPositionBadge()}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              Code Quality
              <span className="ml-1">
                <MetricInfoTooltip 
                  title="Code Quality Score" 
                  description="Measures the quality of code based on factors like code structure, documentation, and adherence to best practices. Higher scores indicate cleaner, more maintainable code."
                />
              </span>
            </div>
            <div className="text-lg font-semibold">{candidate.commitMetrics.codeQualityScore}%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              Consistency
              <span className="ml-1">
                <MetricInfoTooltip 
                  title="Consistency Score" 
                  description="Measures how regularly the candidate contributes code. Higher scores indicate a more consistent contribution pattern over time."
                />
              </span>
            </div>
            <div className="text-lg font-semibold">{candidate.commitMetrics.consistencyScore}%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              Collaboration
              <span className="ml-1">
                <MetricInfoTooltip 
                  title="Collaboration Score" 
                  description="Measures how well the candidate works with others through pull requests, code reviews, and issue discussions. Higher scores indicate stronger teamwork abilities."
                />
              </span>
            </div>
            <div className="text-lg font-semibold">{candidate.commitMetrics.collaborationScore}%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              Tech Diversity
              <span className="ml-1">
                <MetricInfoTooltip 
                  title="Technical Diversity Score" 
                  description="Measures the range of programming languages and technologies the candidate has experience with. Higher scores indicate greater versatility across different technologies."
                />
              </span>
            </div>
            <div className="text-lg font-semibold">{candidate.commitMetrics.technicalDiversityScore}%</div>
          </div>
        </div>
        
        <div className="mt-5 flex flex-col gap-3">
          <Link 
            to={`/candidates/${candidate.id}`}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            <EyeIcon className="h-4 w-4 mr-2" />
            View Profile
          </Link>
          <div className="flex flex-col sm:flex-row gap-3">
            {candidate.status !== 'scheduled' && candidate.status !== 'hired' && (
              <button 
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center"
                onClick={onScheduleClick ? () => onScheduleClick(candidate) : handleScheduleInterview}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule Interview
              </button>
            )}
            <button 
              className="w-full px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
              onClick={() => onCompareClick(candidate)}
            >
              <BarChart2Icon className="h-4 w-4 mr-2" />
              Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;