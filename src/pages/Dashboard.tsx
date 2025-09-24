import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { BarChart3Icon, UsersIcon, BriefcaseIcon, CheckCircleIcon, XCircleIcon, InfoIcon } from 'lucide-react';
import { mockJobs } from '../data/mockData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { getAllCandidates } from '../services/candidateService';
import { getAllJobs } from '../services/mongoService';
import { Candidate, Job } from '../types';
import MetricInfoTooltip from '../components/MetricInfoTooltip';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      return; // Don't load data if not authenticated
    }
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        console.log('Loading dashboard data...');
        // Fetch candidates and jobs
        const fetchedCandidates = await getAllCandidates();
        const fetchedJobs = await getAllJobs();
        
        console.log(`Loaded ${fetchedCandidates.length} candidates and ${fetchedJobs.length} jobs`);
        setCandidates(fetchedCandidates);
        setJobs(fetchedJobs.length > 0 ? fetchedJobs : mockJobs);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setCandidates([]);
        setJobs(mockJobs);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
    
    // Check if we're using mock data due to being offline
    setIsOffline(window.navigator.onLine === false);
    
    // Add online/offline event listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isAuthenticated]);
  
  const hiredCount = candidates.filter(c => c.status === 'hired').length;
  const rejectedCount = candidates.filter(c => c.status === 'rejected').length;
  const pendingCount = candidates.filter(c => c.status === 'pending' || c.status === 'reviewed' || c.status === 'scheduled').length;
  
  const statusData = [
    { name: 'Hired', value: hiredCount },
    { name: 'Rejected', value: rejectedCount },
    { name: 'Pending', value: pendingCount }
  ];
  
  const COLORS = ['#10b981', '#ef4444', '#f59e0b'];
  
  const matchScoreData = [
    { range: '90-100%', count: candidates.filter(c => c.matchScore >= 90).length },
    { range: '80-89%', count: candidates.filter(c => c.matchScore >= 80 && c.matchScore < 90).length },
    { range: '70-79%', count: candidates.filter(c => c.matchScore >= 70 && c.matchScore < 80).length },
    { range: '< 70%', count: candidates.filter(c => c.matchScore < 70).length }
  ];
  
  const positionData = [
    { position: 'Frontend', count: candidates.filter(c => c.position === 'frontend').length },
    { position: 'Backend', count: candidates.filter(c => c.position === 'backend').length },
    { position: 'Fullstack', count: candidates.filter(c => c.position === 'fullstack').length },
    { position: 'Web Designer', count: candidates.filter(c => c.position === 'webdesigner').length },
    { position: 'UX/UI', count: candidates.filter(c => c.position === 'uxui').length },
    { position: 'DevOps', count: candidates.filter(c => c.position === 'devops').length }
  ];
  
  const POSITION_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b', '#6b7280'];
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header title="Dashboard" />
        <main className="p-4 sm:p-8">
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 text-center">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">Authentication Required</h2>
            <p className="text-yellow-700 mb-4">
              Please log in to access the dashboard and view candidate data.
            </p>
            <button 
              onClick={() => window.location.href = '/login'}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              Go to Login
            </button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Dashboard" />
      <main className="p-4 sm:p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {isOffline && (
              <div className="mb-6 bg-yellow-50 p-3 rounded-xl border border-yellow-200 text-yellow-800 flex items-center">
                <InfoIcon className="h-5 w-5 mr-2 text-yellow-600" />
                <p>
                  <span className="font-medium">Offline Mode:</span> You are currently viewing cached data. Some features may be limited until you reconnect.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 rounded-full bg-indigo-100 mr-3 sm:mr-4">
                    <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Total Candidates</p>
                    <p className="text-xl sm:text-2xl font-semibold">{candidates.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 rounded-full bg-green-100 mr-3 sm:mr-4">
                    <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Hired</p>
                    <p className="text-xl sm:text-2xl font-semibold">{hiredCount}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 rounded-full bg-blue-100 mr-3 sm:mr-4">
                    <BriefcaseIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Open Jobs</p>
                    <p className="text-xl sm:text-2xl font-semibold">{jobs.length}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg font-semibold">Candidate Status</h2>
                  <div className="ml-2">
                    <MetricInfoTooltip 
                      title="Candidate Status" 
                      description="Distribution of candidates by their current status in the hiring process."
                    />
                  </div>
                </div>
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg font-semibold">Match Score Distribution</h2>
                  <div className="ml-2">
                    <MetricInfoTooltip 
                      title="Match Score Distribution" 
                      description="Distribution of candidates by their match score ranges, showing how well candidates match job requirements."
                    />
                  </div>
                </div>
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={matchScoreData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg font-semibold">Candidates by Position</h2>
                  <div className="ml-2">
                    <MetricInfoTooltip 
                      title="Candidates by Position" 
                      description="Distribution of candidates across different job positions."
                    />
                  </div>
                </div>
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={positionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="position"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {positionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={POSITION_COLORS[index % POSITION_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Recent Activity</h2>
                {candidates.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start">
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 sm:mr-3">
                        <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base text-gray-800">New candidate profile added: {candidates[0].name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">Recently</p>
                      </div>
                    </div>
                    
                    {candidates.filter(c => c.status === 'hired').length > 0 && (
                      <div className="flex items-start">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-green-100 flex items-center justify-center mr-2 sm:mr-3">
                          <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm sm:text-base text-gray-800">
                            {candidates.filter(c => c.status === 'hired')[0]?.name} was hired
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500">Recently</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2 sm:mr-3">
                        <BriefcaseIcon className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base text-gray-800">New job posted: {jobs[0]?.title}</p>
                        <p className="text-xs sm:text-sm text-gray-500">Recently</p>
                      </div>
                    </div>
                    
                    {candidates.filter(c => c.status === 'rejected').length > 0 && (
                      <div className="flex items-start">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-red-100 flex items-center justify-center mr-2 sm:mr-3">
                          <XCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm sm:text-base text-gray-800">
                            {candidates.filter(c => c.status === 'rejected')[0]?.name} was rejected
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500">Recently</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48">
                    <p className="text-gray-500 mb-4">No recent activity</p>
                    <a 
                      href="/analyze" 
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                    >
                      Analyze a GitHub Profile
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {isOffline && (
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg font-semibold">Database Connection Status</h2>
                  <div className="ml-2">
                    <MetricInfoTooltip 
                      title="Database Connection" 
                      description="Status of the database connection and data synchronization."
                    />
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center">
                    <InfoIcon className="h-6 w-6 text-yellow-500 mr-3" />
                    <div>
                      <h3 className="text-base font-semibold text-yellow-800">Offline Mode</h3>
                      <p className="text-sm text-yellow-700">
                        You are currently offline. Changes will be synchronized when you reconnect to the internet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;