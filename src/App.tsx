import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Jobs from './pages/Jobs';
import Analyze from './pages/Analyze';
import AnalysisResultPage from './pages/AnalysisResultPage';
import CandidateDetailPage from './pages/CandidateDetailPage';
import HiredCandidates from './pages/HiredCandidates';
import ScheduledCalls from './pages/ScheduledCalls';
import HowScoresCalculated from './pages/HowScoresCalculated';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { initializeDatabase } from './services/mongoService';
import { mockJobs } from './data/mockData';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Checking authentication...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Home route component that redirects to dashboard if authenticated
const HomeRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Checking authentication...</p>
        </div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <HomePage />;
};

function AppContent() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { isAuthenticated } = useAuth();
  const [showNavbar, setShowNavbar] = useState(false);
  
  useEffect(() => {
    // Initialize database with mock data
    const setupDatabase = async () => {
      try {
        console.log('Initializing database...');
        const result = await initializeDatabase([], mockJobs);
        if (result) {
          console.log('Database initialized successfully');
        } else {
          console.log('Database initialization failed, using mock data');
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing database:', error);
        setIsInitialized(true);
      }
    };
    
    setupDatabase();
  }, []);
  
  // Determine if we should show the navbar based on authentication and route
  useEffect(() => {
    const path = window.location.pathname;
    // Show navbar on authenticated routes except homepage
    setShowNavbar(isAuthenticated && path !== '/');
  }, [isAuthenticated]);
  
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Initializing SkillScan...</p>
        </div>
      </div>
    );
  }
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {/* Show GlobalHeader for non-authenticated users or on login/signup pages */}
          {!isAuthenticated || window.location.pathname === '/login' || window.location.pathname === '/signup' ? <GlobalHeader /> : null}
          {showNavbar && <Navbar />}
        </div>
        <div className={`flex-grow ${isAuthenticated && window.location.pathname !== '/login' && window.location.pathname !== '/signup' ? 'pt-0' : 'pt-6'}`}>
          <div className={`${isAuthenticated ? 'lg:pl-72' : 'container mx-auto'} px-4 sm:px-6 lg:px-8 py-6`}>
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/how-scores-are-calculated" element={<HowScoresCalculated />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/candidates" element={
                <ProtectedRoute>
                  <Candidates />
                </ProtectedRoute>
              } />
              <Route path="/candidates/:id" element={
                <ProtectedRoute>
                  <CandidateDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/hired-candidates" element={
                <ProtectedRoute>
                  <HiredCandidates />
                </ProtectedRoute>
              } />
              <Route path="/scheduled-calls" element={
                <ProtectedRoute>
                  <ScheduledCalls />
                </ProtectedRoute>
              } />
              <Route path="/jobs" element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              } />
              <Route path="/analyze" element={
                <ProtectedRoute>
                  <Analyze />
                </ProtectedRoute>
              } />
              <Route path="/candidates/analysis-result" element={
                <ProtectedRoute>
                  <AnalysisResultPage />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </div>
        {/* Only show GlobalFooter for non-authenticated users */}
        {!isAuthenticated && <GlobalFooter />}
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;