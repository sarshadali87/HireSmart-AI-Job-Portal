// FIX: Created the ApplicantList component.
import React from 'react';
import type { Applicant } from '../types';

const mockApplicants: Applicant[] = [
    { id: 'app1', name: 'Alice Johnson', email: 'alice@example.com', jobTitle: 'Senior Frontend Engineer', appliedAt: '2024-07-25', status: 'Pending' },
    { id: 'app2', name: 'Bob Williams', email: 'bob@example.com', jobTitle: 'Product Designer', appliedAt: '2024-07-24', status: 'Reviewed' },
    { id: 'app3', name: 'Charlie Brown', email: 'charlie@example.com', jobTitle: 'Senior Frontend Engineer', appliedAt: '2024-07-23', status: 'Pending' },
    { id: 'app4', name: 'Diana Miller', email: 'diana@example.com', jobTitle: 'Data Scientist', appliedAt: '2024-07-22', status: 'Rejected' },
];

const ApplicantList: React.FC = () => {
    
    const getStatusColor = (status: Applicant['status']) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Reviewed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    if (mockApplicants.length === 0) {
        return (
            <div className="text-center py-10">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">No applicants yet.</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Check back later to see who has applied to your job postings.</p>
            </div>
        );
    }
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applied For</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applied On</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {mockApplicants.map(applicant => (
                        <tr key={applicant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{applicant.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{applicant.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{applicant.jobTitle}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{applicant.appliedAt}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(applicant.status)}`}>
                                    {applicant.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantList;
