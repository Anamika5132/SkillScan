import React from 'react';
import Header from '../components/Header';
import AnalysisForm from '../components/AnalysisForm';
import { useAuth } from '../context/AuthContext';

const Analyze: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Analyze GitHub Profile" />
      <main className="p-4 sm:p-8">
        <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
          <AnalysisForm />
        </div>
      </main>
    </div>
  );
};

export default Analyze;