import React, { useState } from 'react';
import { Candidate } from '../types';
import { XIcon, PlusIcon, BarChart2Icon, ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';
import { compareCandidates } from '../services/candidateService';
import MetricInfoTooltip from './MetricInfoTooltip';

interface CandidateCompareProps {
  initialCandidate?: Candidate;
  candidates: Candidate[];
  onClose: () => void;
}

const CandidateCompare: React.FC<CandidateCompareProps> = ({ 
  initialCandidate, 
  candidates, 
  onClose 
}) => {
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>(
    initialCandidate ? [initialCandidate] : []
  );
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  
  const handleAddCandidate = (candidate: Candidate) => {
    if (selectedCandidates.length < 2 && !selectedCandidates.some(c => c.id === candidate.id)) {
      setSelectedCandidates([...selectedCandidates, candidate]);
    }
  };
  
  const handleRemoveCandidate = (candidateId: string) => {
    setSelectedCandidates(selectedCandidates.filter(c => c.id !== candidateId));
    setComparisonResult(null);
  };
  
  const handleCompare = () => {
    if (selectedCandidates.length === 2) {
      const result = compareCandidates(selectedCandidates[0].id, selectedCandidates[1].id);
      setComparisonResult(result);
    }
  };
  
  const getMetricDifferenceDisplay = (metric: any, candidate1Id: string, candidate2Id: string) => {
    if (metric.difference === 0) {
      return (
        <div className="flex items-center text-gray-500">
          <MinusIcon className="h-4 w-4 mr-1" />
          <span>Equal</span>
        </div>
      );
    } else if (metric.winner === candidate1Id) {
      return (
        <div className="flex items-center text-green-600">
          <ArrowUpIcon className="h-4 w-4 mr-1" />
          <span>+{Math.abs(metric.difference).toFixed(1)}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-red-600">
          <ArrowDownIcon className="h-4 w-4 mr-1" />
          <span>-{Math.abs(metric.difference).toFixed(1)}</span>
        </div>
      );
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Compare Candidates</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          {/* Candidate Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Select Candidates to Compare</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[0, 1].map((index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  {selectedCandidates[index] ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src={selectedCandidates[index].avatarUrl} 
                          alt={selectedCandidates[index].name} 
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-medium">{selectedCandidates[index].name}</h4>
                          <p className="text-sm text-gray-600">@{selectedCandidates[index].githubUsername}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveCandidate(selectedCandidates[index].id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-24">
                      <p className="text-gray-500 mb-2">Select a candidate</p>
                      <select
                        className="w-full border border-gray-300 rounded-xl p-2"
                        value=""
                        onChange={(e) => {
                          const candidate = candidates.find(c => c.id === e.target.value);
                          if (candidate) handleAddCandidate(candidate);
                        }}
                      >
                        <option value="">-- Select Candidate --</option>
                        {candidates
                          .filter(c => !selectedCandidates.some(sc => sc.id === c.id))
                          .map(candidate => (
                            <option key={candidate.id} value={candidate.id}>
                              {candidate.name} (@{candidate.githubUsername})
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleCompare}
                disabled={selectedCandidates.length !== 2}
                className={`flex items-center px-4 py-2 rounded-xl ${
                  selectedCandidates.length === 2
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <BarChart2Icon className="h-5 w-5 mr-2" />
                Compare
              </button>
            </div>
          </div>
          
          {/* Comparison Results */}
          {comparisonResult && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Comparison Results</h3>
              
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-indigo-100 mr-3">
                    <BarChart2Icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-800">Overall Comparison</h4>
                    <p className="text-sm text-indigo-700">
                      {comparisonResult.overallWinner.name} has stronger metrics overall with {
                        comparisonResult.overallWinner.id === comparisonResult.candidate1.id 
                          ? comparisonResult.candidate1Wins 
                          : comparisonResult.candidate2Wins
                      } out of 7 metrics being higher.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="col-span-1"></div>
                <div className="col-span-1 text-center font-semibold">{comparisonResult.candidate1.name}</div>
                <div className="col-span-1 text-center font-semibold">{comparisonResult.candidate2.name}</div>
              </div>
              
              {/* Match Score */}
              <div className="grid grid-cols-3 gap-4 mb-4 items-center">
                <div className="col-span-1 flex items-center">
                  <span className="font-medium">Match Score</span>
                  <div className="ml-2">
                    <MetricInfoTooltip 
                      title="Match Score" 
                      description="Overall match percentage based on the candidate's GitHub profile and the selected position benchmark."
                    />
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-lg font-semibold">{comparisonResult.candidate1.matchScore}%</div>
                  {getMetricDifferenceDisplay(
                    comparisonResult.metrics.matchScore, 
                    comparisonResult.candidate1.id, 
                    comparisonResult.candidate2.id
                  )}
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-lg font-semibold">{comparisonResult.candidate2.matchScore}%</div>
                  {getMetricDifferenceDisplay(
                    comparisonResult.metrics.matchScore, 
                    comparisonResult.candidate2.id, 
                    comparisonResult.candidate1.id
                  )}
                </div>
              </div>
              
              {/* Code Quality */}
              <div className="grid grid-cols-3 gap-4 mb-4 items-center bg-gray-50 p-2 rounded-xl">
                <div className="col-span-1 flex items-center">
                  <span className="font-medium">Code Quality</span>
                  <div className="ml-2">
                    <MetricInfoTooltip 
                      title="Code Quality Score" 
                      description="Measures the quality of code based on factors like code structure, documentation, and adherence to best practices."
                    />
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-lg font-semibold">{comparisonResult.candidate1.commitMetrics.codeQualityScore}%</div>
                  {getMetricDifferenceDisplay(
                    comparisonResult.metrics.codeQuality, 
                    comparisonResult.candidate1.id, 
                    comparisonResult.candidate2.id
                  )}
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-lg font-semibold">{comparisonResult.candidate2.commitMetrics.codeQualityScore}%</div>
                  {getMetricDifferenceDisplay(
                    comparisonResult.metrics.codeQuality, 
                    comparisonResult.candidate2.id, 
                    comparisonResult.candidate1.id
                  )}
                </div>
              </div>
              
              {/* Consistency */}
              <div className="grid grid-cols-3 gap-4 mb-4 items-center">
                <div className="col-span-1 flex items-center">
                  <span className="font-medium">Consistency</span>
                  <div className="ml-2">
                    <MetricInfoTooltip 
                      title="Consistency Score" 
                      description="Measures how regularly the candidate contributes code. Higher scores indicate a more consistent contribution pattern over time."
                    />
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-lg font-semibold">{comparisonResult.candidate1.commitMetrics.consistencyScore}%</div>
                  {getMetricDifferenceDisplay(
                    comparisonResult.metrics.consistency, 
                    comparisonResult.candidate1.id, 
                    comparisonResult.candidate2.id
                  )}
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-lg font-semibold">{comparisonResult.candidate2.commitMetrics.consistencyScore}%</div>
                  {getMetricDifferenceDisplay(
                    comparisonResult.metrics.consistency, 
                    comparisonResult.candidate2.id, 
                    comparisonResult.candidate1.id
                  )}
                </div>
              </div>
              
              {/* Collaboration */}
              <div className="grid grid-cols-3 gap-4 mb-4 items-center bg-gray-50 p-2 rounded-xl">
                <div className="col-span-1 flex items-center">
                  <span className="font-medium">Collaboration</span>
                  <div className="ml-2">
                    <MetricInfoTooltip 
                      title="Collaboration Score" 
                      description="Measures how well the candidate works with others through pull requests, code reviews, and issue discussions."
                    />
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-lg font-semibold">{comparisonResult.candidate1.commitMetrics.collaborationScore}%</div>
                  {getMetricDifferenceDisplay(
                    comparisonResult.metrics.collaboration, 
                    comparisonResult.candidate1.id, 
                    comparisonResult.candidate2.id
                  )}
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-lg font-semibold">{comparisonResult.candidate2.commitMetrics.collaborationScore}%</div>
                  {getMetricDifferenceDisplay(
                    comparisonResult.metrics.collaboration, 
                    comparisonResult.candidate2.id, 
                    comparisonResult.candidate1.id
                  )}
                </div>
              </div>
              
              {/* Technical Diversity */}
              <div className="grid grid-cols-3 gap-4 mb-4 items-center">
                <div className="col-span-1 flex items-center">
                  <span className="font-medium">Technical Diversity</span>
                  <div className="ml-2">
                    <MetricInfoTooltip 
                      title="Technical Diversity Score" 
                      description="Measures the range of programming languages and technologies the candidate has experience with."
                    />
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-lg font-semibold">{comparisonResult.candidate1.commitMetrics.technicalDiversityScore}%</div>
                  {getMetricDifferenceDisplay(
                    comparisonResult.metrics.technicalDiversity, 
                    comparisonResult.candidate1.id, 
                    comparisonResult.candidate2.id
                  )}
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-lg font-semibold">{comparisonResult.candidate2.commitMetrics.technicalDiversityScore}%</div>
                  {getMetricDifferenceDisplay(
                    comparisonResult.metrics.technicalDiversity, 
                    comparisonResult.candidate2.id, 
                    comparisonResult.candidate1.id
                  )}
                </div>
              </div>
              
              {/* Total Commits */}
              <div className="grid grid-cols-3 gap-4 mb-4 items-center bg-gray-50 p-2 rounded-xl">
                <div className="col-span-1 flex items-center">
                  <span className="font-medium">Total Commits</span>
                  <div className="ml-2">
                    <MetricInfoTooltip 
                      title="Total Commits" 
                      description="The total number of commits analyzed from the candidate's GitHub repositories."
                    />
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-lg font-semibold">{comparisonResult.candidate1.commitMetrics.totalCommits}</div>
                  {getMetricDifferenceDisplay(
                    comparisonResult.metrics.totalCommits, 
                    comparisonResult.candidate1.id, 
                    comparisonResult.candidate2.id
                  )}
                </div>
                <div className="col-span-1 text-center">
                  <div className="text-lg font-semibold">{comparisonResult.candidate2.commitMetrics.totalCommits}</div>
                  {getMetricDifferenceDisplay(
                    comparisonResult.metrics.totalCommits, 
                    comparisonResult.candidate2.id, 
                    comparisonResult.candidate1.id
                  )}
                </div>
              </div>
              
              {/* Recommendation */}
              <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <h4 className="font-semibold text-indigo-800 mb-2">Recommendation</h4>
                <p className="text-indigo-700">
                  Based on the comparison, <span className="font-semibold">{comparisonResult.overallWinner.name}</span> appears to be the stronger candidate 
                  with better metrics in {comparisonResult.overallWinner.id === comparisonResult.candidate1.id 
                    ? comparisonResult.candidate1Wins 
                    : comparisonResult.candidate2Wins} out of 7 categories. 
                  {comparisonResult.overallWinner.matchScore >= 85 
                    ? ' This candidate shows excellent potential for the position.'
                    : comparisonResult.overallWinner.matchScore >= 70
                      ? ' This candidate shows good potential but may need additional evaluation.'
                      : ' However, both candidates may need further evaluation as their match scores are below the recommended threshold.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateCompare;