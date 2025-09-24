import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CandidateCard from '../components/CandidateCard';
import CandidateCompare from '../components/CandidateCompare';
import { filterCandidates } from '../services/candidateService';
import { SearchIcon, FilterIcon, ChevronLeftIcon, ChevronRightIcon, InfoIcon } from 'lucide-react';
import { Candidate } from '../types';
import { getAllCandidates } from '../services/candidateService';

const HiredCandidates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [scoreFilter, setScoreFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  
  const candidatesPerPage = 6;
  
  useEffect(() => {
    const loadCandidates = async () => {
      setIsLoading(true);
      try {
        console.log('Loading hired candidates...');
        // Fetch candidates
        const fetchedCandidates = await getAllCandidates();
        // Filter only hired candidates
        const hiredCandidates = fetchedCandidates.filter(c => c.status === 'hired');
        console.log(`Found ${hiredCandidates.length} hired candidates`);
        setCandidates(hiredCandidates);
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
  
  const handleCompareClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setCompareMode(true);
  };
  
  const handleCloseCompare = () => {
    setCompareMode(false);
    setSelectedCandidate(null);
  };
  
  const handleStatusChange = async () => {
    // Refresh candidates list when status changes
    try {
      console.log('Refreshing hired candidates after status change...');
      const fetchedCandidates = await getAllCandidates();
      const hiredCandidates = fetchedCandidates.filter(c => c.status === 'hired');
      setCandidates(hiredCandidates);
    } catch (error) {
      console.error('Error refreshing candidates:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Hired Candidates" />
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
                placeholder="Search hired candidates..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center">
                <FilterIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-2" />
                <span className="mr-2 text-sm text-gray-700">Filters:</span>
              </div>
              
              <select
                className="border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 py-1 sm:py-2 px-2 sm:px-3 text-sm"
                value={positionFilter}
                onChange={(e) => {
                  setPositionFilter(e.target.value);
                  setCurrentPage(1); // Reset to first page on filter change
                }}
              >
                <option value="all">All Positions</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Fullstack</option>
                <option value="webdesigner">Web Designer</option>
                <option value="uxui">UX/UI Designer</option>
                <option value="devops">DevOps</option>
              </select>
              
              <select
                className="border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 py-1 sm:py-2 px-2 sm:px-3 text-sm"
                value={scoreFilter}
                onChange={(e) => {
                  setScoreFilter(e.target.value);
                  setCurrentPage(1); // Reset to first page on filter change
                }}
              >
                <option value="all">All Scores</option>
                <option value="high">High Match (85%+)</option>
                <option value="medium">Medium Match (70-84%)</option>
                <option value="low">Low Match (Below 70%)</option>
              </select>
            </div>
          </div>
          
          <div className="bg-green-50 p-3 rounded-xl border border-green-100 text-sm text-green-800 flex items-center">
            <InfoIcon className="h-5 w-5 mr-2 text-green-600" />
            <p>
              <span className="font-medium">Hired Candidates:</span> This page shows all candidates who have been hired. You can compare their profiles and metrics.
            </p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentCandidates.map(candidate => (
                <CandidateCard 
                  key={candidate.id} 
                  candidate={candidate} 
                  onCompareClick={handleCompareClick}
                  onStatusChange={handleStatusChange}
                />
              ))}
              
              {filteredCandidates.length === 0 && (
                <div className="col-span-full text-center py-8 sm:py-12">
                  <p className="text-gray-500 text-base sm:text-lg">No hired candidates found matching your criteria.</p>
                  <p className="text-gray-500 mt-2">Hire candidates from the Candidates page to see them here.</p>
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
                  of <span className="font-medium">{filteredCandidates.length}</span> hired candidates
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
        
        {compareMode && selectedCandidate && (
          <CandidateCompare
            initialCandidate={selectedCandidate}
            candidates={candidates}
            onClose={handleCloseCompare}
          />
        )}
      </main>
    </div>
  );
};

export default HiredCandidates;