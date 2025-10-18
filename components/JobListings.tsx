import React, { useState, useMemo, useEffect } from 'react';
// FIX: Corrected import path to be relative to the project root
import type { Job } from '../types';
import JobCard from './JobCard';
// FIX: Corrected import path to be relative
import { SearchIcon } from './icons/Icons';
import { fetchJobsFromRSS } from '../services/rssService';

interface JobListingsProps {
  jobs: Job[];
  onViewJob: (job: Job) => void;
}

const categories = ['All', 'Tech', 'Design', 'Marketing'];

const JobListings: React.FC<JobListingsProps> = ({ jobs, onViewJob }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [externalJobs, setExternalJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExternalJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedJobs = await fetchJobsFromRSS();
        setExternalJobs(fetchedJobs);
      } catch (err) {
        setError('Failed to load external job listings.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadExternalJobs();
  }, []);

  const allJobs = useMemo(() => {
    const combined = [...jobs, ...externalJobs];
    // Sort by date, newest first
    return combined.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  }, [jobs, externalJobs]);

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesCategory = activeCategory === 'All' || job.category === activeCategory;
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.company.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allJobs, searchTerm, activeCategory]);

  return (
    <section>
      <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-16">
            <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="ml-4 text-lg">Loading external jobs...</p>
        </div>
      )}

      {error && <div className="text-center py-10 px-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg">{error}</div>}

      {!isLoading && filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} onViewClick={onViewJob} />
          ))}
        </div>
      ) : !isLoading && (
        <div className="text-center py-16 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No jobs found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </section>
  );
};

export default JobListings;
