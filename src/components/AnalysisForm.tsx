import React, { useState } from 'react';
import { GithubIcon, SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { analyzeGithubProfile, fetchGithubProfile, calculateMatchScore } from '../services/githubService';
import { addCandidateFromAnalysis } from '../services/candidateService';
import { useAuth } from '../context/AuthContext';

const AnalysisForm: React.FC = () => {
  const [githubUsername, setGithubUsername] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedBenchmark, setSelectedBenchmark] = useState('frontend');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUsername) return;
    
    if (!isAuthenticated) {
      setError("You must be logged in as an admin to analyze profiles");
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      console.log('Analyzing GitHub profile:', githubUsername);
      
      // Fetch GitHub profile
      const profile = await fetchGithubProfile(githubUsername);
      console.log('Profile fetched successfully:', profile.name);
      
      // Analyze GitHub profile
      const metrics = await analyzeGithubProfile(githubUsername);
      console.log('Profile analyzed successfully');
      
      // Calculate match score
      const matchScore = calculateMatchScore(metrics, selectedBenchmark);
      console.log('Match score calculated:', matchScore);
      
      // Store analysis result in session storage
      const analysisResult = {
        profile,
        metrics,
        matchScore,
        benchmark: selectedBenchmark
      };
      
      // Add candidate to the database
      console.log('Adding candidate to database');
      await addCandidateFromAnalysis(analysisResult);
      console.log('Candidate added to database successfully');
      
      // Use JSON.stringify/parse to ensure the data is cloneable
      sessionStorage.setItem('analysisResult', JSON.stringify(analysisResult));
      
      // Navigate to result page
      navigate(`/candidates/analysis-result?benchmark=${selectedBenchmark}`);
    } catch (err) {
      console.error('Error during analysis:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-indigo-100 mb-3 sm:mb-4">
          <GithubIcon className="h-7 w-7 sm:h-8 sm:w-8 text-indigo-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">GitHub Profile Analysis</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Enter a GitHub username to analyze their activity and generate a match score.
        </p>
      </div>
      
      {error && (
        <div className="mb-5 sm:mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}
      
      {!isAuthenticated && (
        <div className="mb-5 sm:mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700 text-sm">
          You must be logged in as an admin to analyze profiles. Please log in using the user icon in the top right.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-5 sm:mb-6">
          <label htmlFor="githubUsername" className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Username
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GithubIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="githubUsername"
              className="block w-full pl-10 pr-12 py-2 sm:py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., octocat"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="mb-5 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position Benchmark
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
            <div 
              className={`border border-gray-300 rounded-md p-3 flex items-center cursor-pointer ${selectedBenchmark === 'frontend' ? 'bg-indigo-50 border-indigo-500' : ''}`}
              onClick={() => setSelectedBenchmark('frontend')}
            >
              <input
                type="radio"
                id="benchmark-frontend"
                name="benchmark"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                checked={selectedBenchmark === 'frontend'}
                onChange={() => setSelectedBenchmark('frontend')}
              />
              <label htmlFor="benchmark-frontend" className="ml-2 block text-xs sm:text-sm text-gray-700">
                Front-End Developer
              </label>
            </div>
            <div 
              className={`border border-gray-300 rounded-md p-3 flex items-center cursor-pointer ${selectedBenchmark === 'backend' ? 'bg-indigo-50 border-indigo-500' : ''}`}
              onClick={() => setSelectedBenchmark('backend')}
            >
              <input
                type="radio"
                id="benchmark-backend"
                name="benchmark"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                checked={selectedBenchmark === 'backend'}
                onChange={() => setSelectedBenchmark('backend')}
              />
              <label htmlFor="benchmark-backend" className="ml-2 block text-xs sm:text-sm text-gray-700">
                Back-End Developer
              </label>
            </div>
            <div 
              className={`border border-gray-300 rounded-md p-3 flex items-center cursor-pointer ${selectedBenchmark === 'fullstack' ? 'bg-indigo-50 border-indigo-500' : ''}`}
              onClick={() => setSelectedBenchmark('fullstack')}
            >
              <input
                type="radio"
                id="benchmark-fullstack"
                name="benchmark"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                checked={selectedBenchmark === 'fullstack'}
                onChange={() => setSelectedBenchmark('fullstack')}
              />
              <label htmlFor="benchmark-fullstack" className="ml-2 block text-xs sm:text-sm text-gray-700">
                Full-Stack Developer
              </label>
            </div>
            <div 
              className={`border border-gray-300 rounded-md p-3 flex items-center cursor-pointer ${selectedBenchmark === 'webdesigner' ? 'bg-indigo-50 border-indigo-500' : ''}`}
              onClick={() => setSelectedBenchmark('webdesigner')}
            >
              <input
                type="radio"
                id="benchmark-webdesigner"
                name="benchmark"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                checked={selectedBenchmark === 'webdesigner'}
                onChange={() => setSelectedBenchmark('webdesigner')}
              />
              <label htmlFor="benchmark-webdesigner" className="ml-2 block text-xs sm:text-sm text-gray-700">
                Web Designer
              </label>
            </div>
            <div 
              className={`border border-gray-300 rounded-md p-3 flex items-center cursor-pointer ${selectedBenchmark === 'uxui' ? 'bg-indigo-50 border-indigo-500' : ''}`}
              onClick={() => setSelectedBenchmark('uxui')}
            >
              <input
                type="radio"
                id="benchmark-uxui"
                name="benchmark"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                checked={selectedBenchmark === 'uxui'}
                onChange={() => setSelectedBenchmark('uxui')}
              />
              <label htmlFor="benchmark-uxui" className="ml-2 block text-xs sm:text-sm text-gray-700">
                UX/UI Designer
              </label>
            </div>
            <div 
              className={`border border-gray-300 rounded-md p-3 flex items-center cursor-pointer ${selectedBenchmark === 'devops' ? 'bg-indigo-50 border-indigo-500' : ''}`}
              onClick={() => setSelectedBenchmark('devops')}
            >
              <input
                type="radio"
                id="benchmark-devops"
                name="benchmark"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                checked={selectedBenchmark === 'devops'}
                onChange={() => setSelectedBenchmark('devops')}
              />
              <label htmlFor="benchmark-devops" className="ml-2 block text-xs sm:text-sm text-gray-700">
                DevOps Engineer
              </label>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className={`w-full flex justify-center items-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-white ${isAuthenticated ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          disabled={isAnalyzing || !isAuthenticated}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Profile...
            </>
          ) : (
            <>
              <SearchIcon className="mr-2 h-5 w-5" />
              Analyze Profile
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AnalysisForm;