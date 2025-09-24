import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  GithubIcon, 
  SearchIcon, 
  BarChart2Icon, 
  UsersIcon, 
  CalendarIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  CodeIcon,
  BriefcaseIcon,
  HeartIcon,
  ChevronDownIcon
} from 'lucide-react';

const HomePage: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    // Initialize intersection observer for animations
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all elements with the 'animate-on-scroll' class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observerRef.current?.observe(el);
    });
    
    return () => {
      // Clean up observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* SVG Gradient Definitions */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-purple-900 rounded-xl">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-800 text-white mb-6 animate-bounce-slow">
              <GithubIcon className="h-4 w-4 mr-2 icon-gradient" />
              <span className="text-sm font-medium">Powered by GitHub Analytics</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              <span className="block">Find Top Developers</span>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <span className="text-orange-400">Faster,</span>
                <span className="text-yellow-400">Smarter,</span>
                <span className="flex items-center">
                  <span className="text-yellow-400">&</span>
                  <span className="text-teal-400 ml-2">Better</span>
                </span>
                <span className="text-white">with AI</span>
              </div>
            </h1>
            
            <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
              SkillScan analyzes GitHub profiles to evaluate coding skills, work patterns, and technical abilities,
              helping you make data-driven hiring decisions for your engineering team.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/login" 
                className="px-8 py-4 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <span>Try for free</span>
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
              <Link 
                to="/how-scores-are-calculated" 
                className="px-8 py-4 bg-purple-800 text-white border border-purple-700 rounded-lg font-medium hover:bg-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <span>See how it works</span>
              </Link>
            </div>
            
            <div className="mt-6 text-purple-300 text-sm">
              Join 500+ recruiters already using SkillScan
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <a 
            href="#how-it-works" 
            className="flex flex-col items-center text-purple-300 hover:text-white transition-colors"
          >
            <span className="text-sm mb-1">Learn More</span>
            <ChevronDownIcon className="h-6 w-6 animate-bounce" />
          </a>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-purple-50 rounded-xl mt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-purple-900 mb-6">How it works</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-8"></div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-6">
                Analyze GitHub profiles through a<br />simple conversation
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simply enter a GitHub username and SkillScan will generate insights, metrics, and recommendations
                to help you make better hiring decisions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg relative">
                <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="h-14 w-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <SearchIcon className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Enter GitHub Username</h3>
                <p className="text-gray-600">
                  Simply enter a candidate's GitHub username to start the analysis process.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg relative">
                <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="h-14 w-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <BarChart2Icon className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Review Detailed Metrics</h3>
                <p className="text-gray-600">
                  Get comprehensive insights into code quality, consistency, collaboration, and technical diversity.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg relative">
                <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div className="h-14 w-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <CalendarIcon className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Schedule Interviews</h3>
                <p className="text-gray-600">
                  Schedule technical interviews with promising candidates directly through our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white rounded-xl mt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SkillScan provides powerful tools to streamline your technical hiring process
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="url(#icon-gradient)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gradient">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900">GitHub Integration</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="url(#icon-gradient)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gradient">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900">AI Analysis</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="url(#icon-gradient)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gradient">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900">Data Visualization</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="url(#icon-gradient)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gradient">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900">Candidate Tracking</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="url(#icon-gradient)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gradient">
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900">Interview Scheduling</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="url(#icon-gradient)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gradient">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900">Job Management</h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50 rounded-xl mt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Key Benefits</h2>
              <p className="text-xl text-gray-600">
                SkillScan transforms your technical hiring process with data-driven insights.
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8 animate-on-scroll opacity-0 transition-all duration-700 transform translate-x-8">
                <div className="md:w-1/2">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                        alt="Data-driven hiring" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Data-Driven Hiring Decisions</h3>
                  <p className="text-gray-600 mb-4">
                    Move beyond resumes and subjective assessments. SkillScan provides objective metrics based on actual coding activity and patterns.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Evaluate code quality and consistency</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Assess technical diversity and adaptability</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Measure collaboration and teamwork skills</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row-reverse items-center gap-8 animate-on-scroll opacity-0 transition-all duration-700 transform translate-x-8">
                <div className="md:w-1/2">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                        alt="Streamlined hiring process" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Streamlined Hiring Process</h3>
                  <p className="text-gray-600 mb-4">
                    Reduce time-to-hire and improve candidate quality with our end-to-end technical recruiting platform.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Quickly identify promising candidates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Schedule and manage technical interviews</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Track candidates through the entire hiring pipeline</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Position-Specific Analysis Section */}
      <section className="py-20 bg-white rounded-xl mt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Position-Specific Analysis</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SkillScan tailors its analysis to different technical roles, ensuring you find the right fit for your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border border-blue-100 animate-on-scroll opacity-0 transition-all duration-700 transform translate-y-8">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CodeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Frontend Developer</h3>
              <p className="text-gray-600 mb-4">
                Evaluates JavaScript/TypeScript proficiency, UI component skills, and frontend framework experience.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">React</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">TypeScript</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">CSS</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-lg border border-green-100 animate-on-scroll opacity-0 transition-all duration-700 transform translate-y-8" style={{ transitionDelay: '100ms' }}>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CodeIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Backend Developer</h3>
              <p className="text-gray-600 mb-4">
                Focuses on server-side languages, database skills, API design, and system architecture.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Node.js</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Python</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">SQL</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg border border-purple-100 animate-on-scroll opacity-0 transition-all duration-700 transform translate-y-8" style={{ transitionDelay: '200ms' }}>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <CodeIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Full-Stack Developer</h3>
              <p className="text-gray-600 mb-4">
                Evaluates balanced skills across frontend and backend technologies with versatility across the stack.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">JavaScript</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">React</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Node.js</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-purple-900 rounded-xl mt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to transform your technical hiring?</h2>
            <p className="text-xl text-purple-200 mb-8">
              Start analyzing GitHub profiles today and find your next star developer.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/login" 
                className="px-8 py-4 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <span>Try for free</span>
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
              <Link 
                to="/how-scores-are-calculated" 
                className="px-8 py-4 bg-purple-800 text-white border border-purple-700 rounded-lg font-medium hover:bg-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <span>See how it works</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;