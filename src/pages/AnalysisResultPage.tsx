import React from 'react';
import Header from '../components/Header';
import AnalysisResult from '../components/AnalysisResult';

const AnalysisResultPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Analysis Result" />
      <main className="p-4 sm:p-8">
        <div className="max-w-full lg:max-w-5xl mx-auto">
          <AnalysisResult />
        </div>
      </main>
    </div>
  );
};

export default AnalysisResultPage;