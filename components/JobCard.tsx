import React from 'react';
// FIX: Corrected import path to be relative to the project root
import type { Job } from '../types';
// FIX: Corrected import path to be relative
import { CalendarIcon, TagIcon, ExternalLinkIcon } from './icons/Icons';

interface JobCardProps {
  job: Job;
  onViewClick: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewClick }) => {
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (job.isExternal && job.sourceUrl) {
      window.open(job.sourceUrl, '_blank', 'noopener,noreferrer');
    } else {
      onViewClick(job);
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col cursor-pointer relative"
      onClick={handleCardClick}
    >
      {job.isExternal && (
        <span className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          External
        </span>
      )}
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          <img src={job.company.logoUrl} alt={`${job.company.name} logo`} className="h-12 w-12 rounded-full mr-4" />
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white pr-16">{job.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{job.company.name}</p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 h-20">
          {job.description}
        </p>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm space-x-4">
            <div className="flex items-center">
                <TagIcon className="h-4 w-4 mr-1"/>
                <span>{job.category}</span>
            </div>
            <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1"/>
                <span>{job.postedAt}</span>
            </div>
        </div>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-700/50 mt-auto">
        <button
          onClick={handleCardClick}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          {job.isExternal ? (
            <>
              <ExternalLinkIcon className="h-5 w-5" />
              View on Source
            </>
          ) : (
            'View Details'
          )}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
