import React from 'react';
import { 
  BarChart2Icon, CodeIcon, ClockIcon, UsersIcon, 
  LayersIcon, InfoIcon, BookOpenIcon, CheckCircleIcon 
} from 'lucide-react';

const HowScoresCalculated: React.FC = () => {
  return (
    <div className="min-h-screen bg-purple-900 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background grid pattern */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">How Scores Are Calculated</h1>
            <p className="text-xl text-purple-200">Understanding our GitHub profile analysis methodology</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <BookOpenIcon className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Understanding GitHub Profile Analysis</h2>
            </div>
            
            <p className="text-gray-700 mb-6 text-lg">
              At SkillScan, we analyze GitHub profiles to evaluate candidates' coding abilities, work patterns, and technical skills. 
              Our analysis is based on objective metrics derived from public GitHub data, providing insights into a candidate's 
              potential fit for different technical roles.
            </p>
            
            <div className="bg-indigo-50 p-5 rounded-lg mb-4">
              <p className="text-indigo-800 text-base">
                <InfoIcon className="h-5 w-5 inline-block mr-2 text-indigo-600" />
                <span className="font-medium">Important Note:</span> Our scoring system is designed to be a helpful tool in the 
                hiring process, not a definitive judgment of a developer's abilities. We recommend using these scores as one 
                factor among many when evaluating candidates.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <BarChart2Icon className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Core Metrics Explained</h2>
            </div>
            
            <div className="space-y-8">
              <div className="border-l-4 border-blue-500 pl-6 py-2">
                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-3">
                  <CodeIcon className="h-6 w-6 text-blue-500 mr-2" />
                  Code Quality Score
                </h3>
                <p className="text-gray-700 mb-3 text-lg">
                  Measures the quality of code based on factors like code structure, documentation, and adherence to best practices.
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-base font-medium text-gray-700 mb-2">How it's calculated:</h4>
                  <ul className="list-disc list-inside text-base text-gray-600 space-y-2">
                    <li>Repository stars and forks (indicating peer recognition)</li>
                    <li>Commit message quality and descriptiveness</li>
                    <li>Code-to-comment ratio in repositories</li>
                    <li>Consistent coding style across projects</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-3">
                  <ClockIcon className="h-6 w-6 text-green-500 mr-2" />
                  Consistency Score
                </h3>
                <p className="text-gray-700 mb-3 text-lg">
                  Measures how regularly the candidate contributes code. Higher scores indicate a more consistent contribution pattern over time.
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-base font-medium text-gray-700 mb-2">How it's calculated:</h4>
                  <ul className="list-disc list-inside text-base text-gray-600 space-y-2">
                    <li>Frequency of commits over time</li>
                    <li>Distribution of activity (vs. sporadic bursts)</li>
                    <li>Sustained engagement with repositories</li>
                    <li>Regular contributions to ongoing projects</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6 py-2">
                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-3">
                  <UsersIcon className="h-6 w-6 text-purple-500 mr-2" />
                  Collaboration Score
                </h3>
                <p className="text-gray-700 mb-3 text-lg">
                  Measures how well the candidate works with others through pull requests, code reviews, and issue discussions.
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-base font-medium text-gray-700 mb-2">How it's calculated:</h4>
                  <ul className="list-disc list-inside text-base text-gray-600 space-y-2">
                    <li>Pull request activity (opened, reviewed, merged)</li>
                    <li>Issue participation and resolution</li>
                    <li>Contributions to others' repositories</li>
                    <li>Quality of collaborative discussions</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-6 py-2">
                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-3">
                  <LayersIcon className="h-6 w-6 text-yellow-500 mr-2" />
                  Technical Diversity Score
                </h3>
                <p className="text-gray-700 mb-3 text-lg">
                  Measures the range of programming languages and technologies the candidate has experience with.
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-base font-medium text-gray-700 mb-2">How it's calculated:</h4>
                  <ul className="list-disc list-inside text-base text-gray-600 space-y-2">
                    <li>Number of different programming languages used</li>
                    <li>Variety of project types and domains</li>
                    <li>Balance between languages (vs. single language focus)</li>
                    <li>Adoption of modern technologies and frameworks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <CheckCircleIcon className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Position-Specific Scoring</h2>
            </div>
            
            <p className="text-gray-700 mb-6 text-lg">
              Different technical roles require different skill emphases. Our match score weights the core metrics differently 
              based on the selected position benchmark:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-5 rounded-lg">
                <h3 className="font-semibold text-blue-800 text-lg mb-3">Frontend Developer</h3>
                <ul className="text-base text-blue-700 space-y-2">
                  <li>• Code Quality: 25%</li>
                  <li>• Consistency: 25%</li>
                  <li>• Collaboration: 20%</li>
                  <li>• Technical Diversity: 30%</li>
                  <li>• Bonus for JavaScript, TypeScript, React, Vue, HTML/CSS</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-5 rounded-lg">
                <h3 className="font-semibold text-green-800 text-lg mb-3">Backend Developer</h3>
                <ul className="text-base text-green-700 space-y-2">
                  <li>• Code Quality: 30%</li>
                  <li>• Consistency: 30%</li>
                  <li>• Collaboration: 20%</li>
                  <li>• Technical Diversity: 20%</li>
                  <li>• Bonus for Python, Java, Go, Node.js, SQL</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-5 rounded-lg">
                <h3 className="font-semibold text-purple-800 text-lg mb-3">Full-Stack Developer</h3>
                <ul className="text-base text-purple-700 space-y-2">
                  <li>• Code Quality: 25%</li>
                  <li>• Consistency: 25%</li>
                  <li>• Collaboration: 20%</li>
                  <li>• Technical Diversity: 30%</li>
                  <li>• Bonus for balanced frontend/backend technologies</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-5 rounded-lg">
                <h3 className="font-semibold text-yellow-800 text-lg mb-3">DevOps Engineer</h3>
                <ul className="text-base text-yellow-700 space-y-2">
                  <li>• Code Quality: 30%</li>
                  <li>• Consistency: 30%</li>
                  <li>• Collaboration: 20%</li>
                  <li>• Technical Diversity: 20%</li>
                  <li>• Bonus for Python, Go, Shell, YAML, Docker</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-semibold text-gray-800 text-lg mb-3">Match Score Interpretation</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-24 px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mr-3">85-100%</span>
                  <span className="text-base text-gray-700">Excellent match, highly recommended for the position</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-24 px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mr-3">70-84%</span>
                  <span className="text-base text-gray-700">Good match, consider with additional evaluation</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-24 px-2 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full mr-3">50-69%</span>
                  <span className="text-base text-gray-700">Potential match, requires thorough evaluation</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-24 px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full mr-3">Below 50%</span>
                  <span className="text-base text-gray-700">Not recommended based on GitHub activity</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <InfoIcon className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Limitations and Considerations</h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-700 text-lg">
                While our analysis provides valuable insights, it's important to understand its limitations:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
                <li>
                  <span className="font-medium">Private Repositories:</span> We can only analyze public GitHub activity, 
                  which may not represent a candidate's full body of work.
                </li>
                <li>
                  <span className="font-medium">Work Context:</span> Some developers may contribute more to private 
                  repositories at work than to public ones.
                </li>
                <li>
                  <span className="font-medium">Contribution Style:</span> Different teams and projects have different 
                  contribution patterns and requirements.
                </li>
                <li>
                  <span className="font-medium">Career Stage:</span> Junior developers may have different GitHub patterns 
                  than senior developers.
                </li>
              </ul>
              
              <div className="bg-indigo-50 p-5 rounded-lg">
                <p className="text-indigo-800 text-lg">
                  <span className="font-medium">Best Practice:</span> Use GitHub analysis as one data point in your 
                  hiring process, alongside interviews, technical assessments, and reference checks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowScoresCalculated;