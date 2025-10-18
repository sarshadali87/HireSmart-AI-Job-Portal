// FIX: Created the ApplyModal component.
import React, { useState } from 'react';
import type { Job } from '../types';
import { XMarkIcon } from './icons/Icons';

interface ApplyModalProps {
  job: Job;
  onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ job, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log({
        jobId: job.id,
        name,
        email,
        resumeName: resume?.name,
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-95 animate-modal-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Apply for {job.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">at {job.company.name}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {isSubmitted ? (
            <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Application Sent!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Thank you for applying. We will review your application and get back to you soon.</p>
                <button
                    onClick={onClose}
                    className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
                >
                    Close
                </button>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Resume/CV</label>
                    <input 
                        type="file" 
                        id="resume" 
                        onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)} 
                        required 
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-3 px-4 rounded-md hover:from-green-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center">
                    {isSubmitting && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
