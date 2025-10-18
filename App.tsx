
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import JobListings from './components/JobListings';
import RecruiterDashboard from './components/RecruiterDashboard';
import JobDetailPage from './components/JobDetailPage';
// FIX: Corrected import path to be relative
import ApplyModal from './components/ApplyModal';
// FIX: Corrected import path to be relative
import { jobs as initialJobs, companies } from './constants';
// FIX: Corrected import path to be relative
import type { Job } from './types';

type View = 'home' | 'dashboard' | 'jobDetail';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [view, setView] = useState<View>('home');
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleJobPost = (newJob: Omit<Job, 'id' | 'company' | 'postedAt'>) => {
    const newJobWithDetails: Job = {
      ...newJob,
      id: Math.random().toString(36).substr(2, 9),
      company: companies[0],
      postedAt: new Date().toISOString().split('T')[0],
      location: 'Remote',
    };
    setJobs(prevJobs => [newJobWithDetails, ...prevJobs]);
    setView('home'); 
  };
  
  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setView('jobDetail');
  };

  const handleBackToListings = () => {
    setSelectedJob(null);
    setView('home');
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <RecruiterDashboard onJobPosted={handleJobPost} />;
      case 'jobDetail':
        return selectedJob && <JobDetailPage job={selectedJob} onBack={handleBackToListings} onApply={handleApply} />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <JobListings jobs={jobs} onViewJob={handleViewJob} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen text-gray-800 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        setView={(v) => {
          setSelectedJob(null);
          setView(v);
        }} 
      />
      <main className="container mx-auto px-4 py-8">
        {renderView()}
      </main>
      <footer className="text-center py-6 border-t border-gray-200 dark:border-gray-700">
        <p>&copy; {new Date().getFullYear()} HireSmart. All rights reserved.</p>
      </footer>
      {isApplyModalOpen && selectedJob && (
        <ApplyModal job={selectedJob} onClose={() => setIsApplyModalOpen(false)} />
      )}
    </div>
  );
};

export default App;
