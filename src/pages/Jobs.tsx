import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import { SearchIcon, PlusIcon, FilterIcon, ChevronLeftIcon, ChevronRightIcon, InfoIcon } from 'lucide-react';
import { Job } from '../types';
import { getAllJobs } from '../services/mongoService';
import { mockJobs } from '../data/mockData';

const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [remoteFilter, setRemoteFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const jobsPerPage = 6; // Changed to 6 for 2x3 grid
  
  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      try {
        // Fetch jobs
        const fetchedJobs = await getAllJobs();
        setJobs(fetchedJobs.length > 0 ? fetchedJobs : mockJobs);
      } catch (error) {
        console.error('Error loading jobs:', error);
        setJobs(mockJobs); // Fallback to mock data
      } finally {
        setIsLoading(false);
      }
    };
    
    loadJobs();
  }, []);
  
  const filteredJobs = jobs.filter(job => {
    // Search term filter
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Position filter
    const matchesPosition = positionFilter === 'all' || job.position === positionFilter;
    
    // Location filter
    const matchesLocation = locationFilter === 'all' || 
      (locationFilter === 'remote' ? job.location.toLowerCase().includes('remote') : 
      job.location.toLowerCase().includes(locationFilter.toLowerCase()));
    
    // Remote filter
    const matchesRemote = remoteFilter === 'all' || 
      (remoteFilter === 'remote' ? job.remote === true : 
      remoteFilter === 'onsite' ? job.remote === false : true);
    
    return matchesSearch && matchesPosition && matchesLocation && matchesRemote;
  });
  
  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Get unique locations for filter
  const locations = Array.from(new Set(jobs.map(job => {
    if (job.location.includes(',')) {
      return job.location.split(',')[1].trim();
    }
    return job.location.includes('Remote') ? 'Remote' : job.location;
  })));
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Jobs" />
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
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
            
            <button className="flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm">
              <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              Add New Job
            </button>
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
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <option value="all">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
            
            <select
              className="border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 py-1 sm:py-2 px-2 sm:px-3 text-sm"
              value={remoteFilter}
              onChange={(e) => {
                setRemoteFilter(e.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <option value="all">All Work Types</option>
              <option value="remote">Remote Only</option>
              <option value="onsite">On-site Only</option>
            </select>
          </div>
          
          <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-sm text-indigo-800 flex items-center">
            <InfoIcon className="h-5 w-5 mr-2 text-indigo-600" />
            <p>
              <span className="font-medium">Tip:</span> Use the filters to narrow down job listings by position, location, and remote work options.
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
              {currentJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
              
              {filteredJobs.length === 0 && (
                <div className="col-span-full text-center py-8 sm:py-12">
                  <p className="text-gray-500 text-base sm:text-lg">No jobs found matching your criteria.</p>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstJob + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastJob, filteredJobs.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredJobs.length}</span> jobs
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

export default Jobs;