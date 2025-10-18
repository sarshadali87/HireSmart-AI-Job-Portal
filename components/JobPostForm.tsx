
import React, { useState } from 'react';
// FIX: Corrected import path to be relative to the project root
import type { Job } from '../types';
// FIX: Corrected import path to be relative to the project root
import { generateJobDescription } from '../services/geminiService';
// FIX: Corrected import path to be relative
import { SparklesIcon } from './icons/Icons';

interface JobPostFormProps {
    onJobPosted: (newJob: Omit<Job, 'id' | 'company' | 'postedAt'>) => void;
}

const JobPostForm: React.FC<JobPostFormProps> = ({ onJobPosted }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Tech');
    const [description, setDescription] = useState('');
    const [aiKeywords, setAiKeywords] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateDescription = async () => {
        if (!title || !aiKeywords) {
            alert("Please provide a job title and some keywords.");
            return;
        }
        setIsGenerating(true);
        try {
            const generatedDesc = await generateJobDescription(title, aiKeywords);
            setDescription(generatedDesc);
        } catch (error) {
            console.error(error);
            alert("Failed to generate description.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onJobPosted({ title, category, description });
        setTitle('');
        setCategory('Tech');
        setDescription('');
        setAiKeywords('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</label>
                <input type="text" id="job-title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div>
                <label htmlFor="job-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select id="job-category" value={category} onChange={e => setCategory(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Tech</option>
                    <option>Design</option>
                    <option>Marketing</option>
                </select>
            </div>
            
            <div className="p-4 border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <h3 className="text-lg font-semibold flex items-center mb-2 text-indigo-800 dark:text-indigo-200"><SparklesIcon className="h-5 w-5 mr-2" />AI Description Generator</h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-300 mb-3">Enter some keywords (e.g., "React, TypeScript, 5+ years experience") and let AI create the job description for you.</p>
                <div className="flex gap-2">
                    <input type="text" value={aiKeywords} onChange={e => setAiKeywords(e.target.value)} placeholder="Keywords for AI..." className="flex-grow px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-colors disabled:bg-indigo-300 flex items-center">
                        {isGenerating && <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                        Generate
                    </button>
                </div>
            </div>

            <div>
                <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Description</label>
                <textarea id="job-description" value={description} onChange={e => setDescription(e.target.value)} required rows={8} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-3 px-4 rounded-md hover:from-green-600 hover:to-teal-700 transition-all duration-300">
                Post Job
            </button>
        </form>
    );
};

export default JobPostForm;
