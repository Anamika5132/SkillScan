import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getCandidateById } from '../services/candidateService';
import { Candidate } from '../types';
import AnalysisResult from '../components/AnalysisResult';

const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCandidate = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const fetchedCandidate = await getCandidateById(id);
        
        if (fetchedCandidate) {
          setCandidate(fetchedCandidate);
          
          // Store in session storage for AnalysisResult component
          const analysisResult = {
            profile: {
              id: fetchedCandidate.id,
              name: fetchedCandidate.name,
              email: fetchedCandidate.email,
              githubUsername: fetchedCandidate.githubUsername,
              avatarUrl: fetchedCandidate.avatarUrl,
              publicRepos: 0, // Default values
              followers: 0,
              following: 0,
              createdAt: fetchedCandidate.createdAt || new Date().toISOString()
            },
            metrics: fetchedCandidate.commitMetrics,
            matchScore: fetchedCandidate.matchScore,
            benchmark: fetchedCandidate.position || 'frontend'
          };
          
          sessionStorage.setItem('analysisResult', JSON.stringify(analysisResult));
        }
      } catch (error) {
        console.error('Error loading candidate:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCandidate();
  }, [id]);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title={loading ? 'Loading Candidate...' : `Candidate: ${candidate?.name || 'Not Found'}`} />
      <main className="p-4 sm:p-8">
        <div className="max-w-full lg:max-w-5xl mx-auto">
          {loading ? (
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center h-64">
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg font-medium text-gray-700">Loading candidate profile...</span>
              </div>
            </div>
          ) : candidate ? (
            <AnalysisResult />
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center py-8">
                <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Candidate Not Found</h3>
                <p className="text-gray-600 mb-6">The candidate you're looking for doesn't exist or has been removed.</p>
                <a 
                  href="/candidates" 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Back to Candidates
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CandidateDetailPage;