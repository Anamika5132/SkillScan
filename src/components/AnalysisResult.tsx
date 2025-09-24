import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  CheckCircleIcon, XCircleIcon, AlertCircleIcon, GithubIcon, 
  CalendarIcon, UsersIcon, ThumbsUpIcon, ThumbsDownIcon, 
  ArrowUpIcon, ArrowDownIcon, CodeIcon, GitBranchIcon, InfoIcon,
  BookOpenIcon
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { getPositionStrengthsWeaknesses } from '../services/benchmarkService';
import { Link } from 'react-router-dom';
import MetricInfoTooltip from './MetricInfoTooltip';

const COLORS = ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

const AnalysisResultComponent: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get analysis result from session storage
    const storedResult = sessionStorage.getItem('analysisResult');
    if (storedResult) {
      setAnalysisResult(JSON.parse(storedResult));
    }
    setLoading(false);
  }, []);
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center h-64">
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg font-medium text-gray-700">Loading analysis result...</span>
        </div>
      </div>
    );
  }
  
  if (!analysisResult) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <XCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Analysis Result Found</h3>
          <p className="text-gray-600 mb-6">Please go back and analyze a GitHub profile first.</p>
          <a 
            href="/analyze" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <GithubIcon className="mr-2 h-5 w-5" />
            Analyze a Profile
          </a>
        </div>
      </div>
    );
  }
  
  const { profile, metrics, matchScore, benchmark } = analysisResult;
  
  const getBenchmarkTitle = () => {
    switch (benchmark) {
      case 'frontend': return 'Front-End Developer';
      case 'backend': return 'Back-End Developer';
      case 'fullstack': return 'Full-Stack Developer';
      case 'webdesigner': return 'Web Designer';
      case 'uxui': return 'UX/UI Designer';
      case 'devops': return 'DevOps Engineer';
      default: return 'Front-End Developer';
    }
  };
  
  const recommendationStatus = matchScore >= 85 ? 'hire' : matchScore >= 70 ? 'consider' : 'reject';
  
  const getRecommendationContent = () => {
    switch (recommendationStatus) {
      case 'hire':
        return {
          icon: <CheckCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />,
          title: 'Recommended to Hire',
          description: `This candidate shows strong GitHub activity patterns that align well with successful ${getBenchmarkTitle()}s.`,
          color: 'bg-green-100 border-green-500'
        };
      case 'consider':
        return {
          icon: <AlertCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />,
          title: 'Consider with Reservations',
          description: 'This candidate shows promise but has some areas that may need further evaluation.',
          color: 'bg-yellow-100 border-yellow-500'
        };
      default:
        return {
          icon: <XCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />,
          title: 'Not Recommended',
          description: `This candidate's GitHub activity patterns don't align well with our ${getBenchmarkTitle()} benchmarks.`,
          color: 'bg-red-100 border-red-500'
        };
    }
  };
  
  const recommendation = getRecommendationContent();
  
  const scoreData = [
    { name: 'Code Quality', score: metrics.codeQualityScore },
    { name: 'Consistency', score: metrics.consistencyScore },
    { name: 'Collaboration', score: metrics.collaborationScore },
    { name: 'Tech Diversity', score: metrics.technicalDiversityScore },
    { name: 'Overall', score: metrics.overallScore }
  ];
  
  // Format language distribution for chart
  const languageData = metrics.languageDistribution.map(item => ({
    language: item.language,
    percentage: Math.round(item.percentage * 100)
  }));
  
  // Get strengths and weaknesses based on position
  const { strengths, weaknesses } = getPositionStrengthsWeaknesses(metrics, benchmark);
  
  // GitHub contribution chart URL
  const contributionChartUrl = `https://ghchart.rshah.org/2563eb/${profile.githubUsername}`;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
          <div className="flex items-center mb-3 sm:mb-0">
            <img 
              src={profile.avatarUrl} 
              alt={profile.name} 
              className="h-12 w-12 sm:h-16 sm:w-16 rounded-full mr-3 sm:mr-4"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{profile.name}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600">
                <span className="mr-0 sm:mr-2">@{profile.githubUsername}</span>
                <span className="hidden sm:inline mx-2">•</span>
                <span>{metrics.totalCommits} commits analyzed</span>
              </div>
            </div>
          </div>
          <div className="sm:ml-auto text-center">
            <div className="flex items-center justify-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600">{matchScore}%</div>
              <div className="ml-2">
                <MetricInfoTooltip 
                  title="Match Score" 
                  description="Overall match percentage based on the candidate's GitHub profile and the selected position benchmark. This score is calculated using a weighted combination of code quality, consistency, collaboration, and technical diversity metrics, adjusted for the specific requirements of the selected position."
                />
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">Match Score</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-lg flex items-center">
            <div className="p-2 rounded-full bg-indigo-100 mr-3">
              <GithubIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Public Repos</div>
              <div className="text-lg font-semibold">{profile.publicRepos}</div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg flex items-center">
            <div className="p-2 rounded-full bg-indigo-100 mr-3">
              <UsersIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Followers</div>
              <div className="text-lg font-semibold">{profile.followers}</div>
            </div>
          </div>
          
           <div className="bg-gray-50 p-3 rounded-lg flex items-center">
            <div className="p-2 rounded-full bg-indigo-100 mr-3">
              <CalendarIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">GitHub Since</div>
              <div className="text-lg font-semibold">{new Date(profile.createdAt).getFullYear()}</div>
            </div>
          </div>
        </div>
        
        {/* GitHub Activity Overview */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <h3 className="text-base sm:text-lg font-semibold">GitHub Activity Overview</h3>
            <div className="ml-2">
              <MetricInfoTooltip 
                title="GitHub Activity" 
                description="Summary of the candidate's GitHub activity metrics, including total commits, languages used, and contribution consistency."
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg flex items-center">
              <div className="p-2 rounded-full bg-blue-100 mr-3">
                <CodeIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Total Commits</div>
                <div className="text-lg font-semibold">{metrics.totalCommits}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg flex items-center">
              <div className="p-2 rounded-full bg-purple-100 mr-3">
                <GitBranchIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Languages</div>
                <div className="text-lg font-semibold">{metrics.languageDistribution.length}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg flex items-center col-span-1 sm:col-span-2">
              <div className="w-full">
                <div className="flex items-center text-xs text-gray-500 mb-1">
                  <span>Contribution Consistency</span>
                  <div className="ml-1">
                    <MetricInfoTooltip 
                      title="Consistency Score" 
                      description="Measures how regularly the candidate contributes code. Higher scores indicate a more consistent contribution pattern over time."
                    />
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${metrics.consistencyScore}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Low</span>
                  <span>{metrics.consistencyScore}%</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* GitHub Contribution Calendar */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <h3 className="text-base sm:text-lg font-semibold">GitHub Contribution Calendar</h3>
            <div className="ml-2">
              <MetricInfoTooltip 
                title="Contribution Calendar" 
                description="Visual representation of the candidate's GitHub activity over the past year. Darker squares indicate more contributions on that day."
              />
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 overflow-x-auto">
            <img 
              src={contributionChartUrl} 
              alt={`${profile.name}'s GitHub contribution calendar`} 
              className="w-full max-w-full"
            />
            <div className="mt-2 text-xs text-gray-500 text-center">
              <a 
                href={`https://github.com/${profile.githubUsername}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline flex items-center justify-center"
              >
                <GithubIcon className="h-3 w-3 mr-1" />
                View full profile on GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className="mb-4 text-sm sm:text-base text-gray-700 flex items-center">
          <span className="font-medium mr-1">Benchmark:</span> {getBenchmarkTitle()}
          <div className="ml-2">
            <MetricInfoTooltip 
              title="Position Benchmark" 
              description="The selected job position used to evaluate this candidate's GitHub profile. Different positions have different scoring weights for various metrics."
            />
          </div>
        </div>
        
        <div className={`p-3 sm:p-4 border rounded-lg mb-4 sm:mb-6 ${recommendation.color}`}>
          <div className="flex items-center">
            {recommendation.icon}
            <div className="ml-3">
              <h3 className="text-base sm:text-lg font-semibold">{recommendation.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{recommendation.description}</p>
            </div>
          </div>
        </div>
        
        {/* Strengths and Weaknesses Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center mb-3">
              <ThumbsUpIcon className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-green-800">Strengths</h3>
            </div>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <ArrowUpIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center mb-3">
              <ThumbsDownIcon className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-red-800">Areas for Improvement</h3>
            </div>
            <ul className="space-y-2">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <ArrowDownIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div>
            <div className="flex items-center mb-2 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Score Breakdown</h3>
              <div className="ml-2">
                <MetricInfoTooltip 
                  title="Score Breakdown" 
                  description="Detailed breakdown of the candidate's performance across different metrics used to calculate the overall match score."
                />
              </div>
            </div>
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={scoreData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-2 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Language Distribution</h3>
              <div className="ml-2">
                <MetricInfoTooltip 
                  title="Language Distribution" 
                  description="Breakdown of programming languages used in the candidate's repositories, showing their technical focus areas."
                />
              </div>
            </div>
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="language"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center mb-2 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold">Commit Activity (Last 6 Months)</h3>
            <div className="ml-2">
              <MetricInfoTooltip 
                title="Commit Activity" 
                description="Monthly commit activity over the last 6 months, showing the candidate's recent coding frequency and patterns."
              />
            </div>
          </div>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={metrics.commitHistory}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-between">
          <Link 
            to="/how-scores-are-calculated"
            className="w-full sm:w-auto mb-3 sm:mb-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            <BookOpenIcon className="mr-2 h-5 w-5" />
            How Scores Are Calculated
          </Link>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
            <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Export PDF
            </button>
            <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Share
            </button>
          </div>
        </div>
        
        {/* Analyze New Profile Button */}
        <div className="mt-8 text-center">
          <Link 
            to="/analyze" 
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <GithubIcon className="mr-2 h-5 w-5" />
            Analyze New Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultComponent;