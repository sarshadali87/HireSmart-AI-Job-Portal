import React from 'react';
// FIX: Corrected import path to be relative to the project root
import type { Job } from '../types';
// FIX: Corrected import path to be relative
import { ArrowLeftIcon, CalendarIcon, MapPinIcon, TagIcon } from './icons/Icons';

interface JobDetailPageProps {
  job: Job;
  onBack: () => void;
  onApply: (job: Job) => void;
}

const JobDetailPage: React.FC<JobDetailPageProps> = ({ job, onBack, onApply }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 font-semibold mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Back to Listings
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{job.title}</h1>
              <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                <p>{job.company.name}</p>
                {job.location && (
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                )}
              </div>
            </div>
            <img src={job.company.logoUrl} alt={`${job.company.name} logo`} className="h-16 w-16 rounded-full hidden sm:block" />
          </div>

          <div className="flex items-center flex-wrap gap-4 text-gray-600 dark:text-gray-300 text-sm mb-8">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                <TagIcon className="h-4 w-4"/>
                <span>{job.category}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                <CalendarIcon className="h-4 w-4"/>
                <span>Posted on {job.postedAt}</span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Job Description</h2>
          <div className="prose prose-indigo dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {job.description}
          </div>
        </div>
        <div className="p-8 bg-gray-50 dark:bg-gray-700/50 mt-6 sm:flex sm:items-center sm:justify-between">
            <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-0">Ready to make an impact? Apply now!</p>
            <button
                onClick={() => onApply(job)}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-6 rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
                Apply Now
            </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
