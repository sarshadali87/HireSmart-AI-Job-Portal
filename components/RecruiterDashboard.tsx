
import React, { useState } from 'react';
// FIX: Corrected import path to be relative to the project root
import type { Job } from '../types';
import JobPostForm from './JobPostForm';
// FIX: Corrected import path to be relative
import ApplicantList from './ApplicantList';
// FIX: Corrected import path to be relative
import { PlusCircleIcon, UsersIcon } from './icons/Icons';

interface RecruiterDashboardProps {
    onJobPosted: (newJob: Omit<Job, 'id' | 'company' | 'postedAt'>) => void;
}

type DashboardView = 'postJob' | 'viewApplicants';

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onJobPosted }) => {
    const [view, setView] = useState<DashboardView>('postJob');

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Recruiter Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Manage your job postings and applicants.</p>

            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                <button 
                    onClick={() => setView('postJob')}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${view === 'postJob' ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    <PlusCircleIcon className="h-5 w-5" />
                    Post a New Job
                </button>
                <button 
                    onClick={() => setView('viewApplicants')}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${view === 'viewApplicants' ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    <UsersIcon className="h-5 w-5" />
                    View Applicants
                </button>
            </div>

            <div className="animate-fade-in">
                {view === 'postJob' && <JobPostForm onJobPosted={onJobPosted} />}
                {view === 'viewApplicants' && <ApplicantList />}
            </div>
        </div>
    );
};

export default RecruiterDashboard;
