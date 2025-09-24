import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { 
  CalendarIcon, CheckCircleIcon, XCircleIcon, 
  ClockIcon, SearchIcon, FilterIcon, ChevronLeftIcon, 
  ChevronRightIcon, InfoIcon, EyeIcon 
} from 'lucide-react';
import { Candidate } from '../types';
import { getAllCandidates, updateCandidateStatus } from '../services/candidateService';
import { Link } from 'react-router-dom';

const ScheduledCalls: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const candidatesPerPage = 6;
  
  useEffect(() => {
    const loadCandidates = async () => {
      setIsLoading(true);
      try {
        console.log('Loading scheduled candidates...');
        // Fetch candidates
        const fetchedCandidates = await getAllCandidates();
        // Filter only scheduled candidates
        const scheduledCandidates = fetchedCandidates.filter(c => c.status === 'scheduled');
        console.log(`Found ${scheduledCandidates.length} scheduled candidates`);
        setCandidates(scheduledCandidates);
      } catch (error) {
        console.error('Error loading candidates:', error);
        setCandidates([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCandidates();
  }, []);
  
  const filteredCandidates = candidates.filter(candidate => {
    return (
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.githubUsername.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Calculate pagination
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const handleStatusChange = async (id: string, status: 'hired' | 'rejected') => {
    try {
      await updateCandidateStatus(id, status);
      // Refresh the list
      const fetchedCandidates = await getAllCandidates();
      const scheduledCandidates = fetchedCandidates.filter(c => c.status === 'scheduled');
      setCandidates(scheduledCandidates);
    } catch (error) {
      console.error('Error updating candidate status:', error);
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const formatTime = (timeString?: string) => {
    if (!timeString) return 'Not set';
    return timeString;
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Scheduled Interviews" />
      <main className="p-4 sm:p-8">
        <div className="mb-6 flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative md:w-full lg:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Search scheduled interviews..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-sm text-purple-800 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-purple-600" />
            <p>
              <span className="font-medium">Scheduled Interviews:</span> This page shows all candidates who have scheduled technical interviews. After the interview, mark them as hired or rejected.
            </p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6">
              {currentCandidates.map(candidate => (
                <div key={candidate.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="flex items-center mb-3 sm:mb-0">
                        <img 
                          src={candidate.avatarUrl} 
                          alt={candidate.name} 
                          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full mr-3 sm:mr-4"
                        />
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800">{candidate.name}</h3>
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <span className="mr-2">@{candidate.githubUsername}</span>
                            <span className="flex items-center">
                              <CalendarIcon className="h-4 w-4 text-purple-500 mr-1" />
                              <span>Interview Scheduled</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:ml-auto flex flex-col items-end">
                        <div className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-purple-600 bg-purple-100">
                          {candidate.matchScore}% Match
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <div className="text-xs text-gray-500 mb-1">Interview Date</div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 text-gray-600 mr-2" />
                          <span className="text-sm font-medium">{formatDate(candidate.interviewDate)}</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <div className="text-xs text-gray-500 mb-1">Interview Time</div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 text-gray-600 mr-2" />
                          <span className="text-sm font-medium">{formatTime(candidate.interviewTime)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {candidate.interviewNotes && (
                      <div className="mt-4 bg-gray-50 p-3 rounded-xl">
                        <div className="text-xs text-gray-500 mb-1">Notes</div>
                        <p className="text-sm">{candidate.interviewNotes}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-3">
                      <Link 
                        to={`/candidates/${candidate.id}`}
                        className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center"
                      >
                        <EyeIcon className="h-4 w-4 mr-2" />
                        View Profile
                      </Link>
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button 
                          className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center"
                          onClick={() => handleStatusChange(candidate.id, 'hired')}
                        >
                          <CheckCircleIcon className="h-4 w-4 mr-2" />
                          Hire
                        </button>
                        <button 
                          className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center"
                          onClick={() => handleStatusChange(candidate.id, 'rejected')}
                        >
                          <XCircleIcon className="h-4 w-4 mr-2" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredCandidates.length === 0 && (
                <div className="col-span-full text-center py-8 sm:py-12">
                  <p className="text-gray-500 text-base sm:text-lg">No scheduled interviews found.</p>
                  <p className="text-gray-500 mt-2">Schedule interviews from the Candidates page.</p>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {filteredCandidates.length > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstCandidate + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastCandidate, filteredCandidates.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredCandidates.length}</span> scheduled interviews
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-xl border ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-xl border ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ScheduledCalls;