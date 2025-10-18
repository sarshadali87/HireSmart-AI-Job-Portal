// FIX: Created mock data for companies and jobs.
import type { Job, Company } from './types';

export const companies: Company[] = [
  { id: 1, name: 'Innovate Inc.', logoUrl: 'https://picsum.photos/seed/Innovate/100' },
  { id: 2, name: 'Data Dynamics', logoUrl: 'https://picsum.photos/seed/Data/100' },
  { id: 3, name: 'Creative Minds', logoUrl: 'https://picsum.photos/seed/Creative/100' },
  { id: 4, name: 'Marketing Masters', logoUrl: 'https://picsum.photos/seed/Marketing/100' },
];

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: companies[0],
    description: 'We are seeking a talented Senior Frontend Engineer to join our team. The ideal candidate will have extensive experience with React, TypeScript, and modern web technologies. You will be responsible for building and maintaining our user-facing applications.',
    category: 'Tech',
    postedAt: '2024-07-25',
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    title: 'Product Designer',
    company: companies[2],
    description: 'Join our design team to create intuitive and beautiful user interfaces. You will work closely with product managers and engineers to deliver exceptional user experiences. A strong portfolio is required.',
    category: 'Design',
    postedAt: '2024-07-24',
    location: 'New York, NY',
  },
  {
    id: '3',
    title: 'Digital Marketing Specialist',
    company: companies[3],
    description: 'We are looking for a results-driven Digital Marketing Specialist to manage our online marketing campaigns. Responsibilities include SEO/SEM, social media marketing, and content creation.',
    category: 'Marketing',
    postedAt: '2024-07-23',
    location: 'Remote',
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: companies[1],
    description: 'As a Data Scientist, you will analyze large datasets to extract meaningful insights. You should have a strong background in statistics, machine learning, and programming languages like Python or R.',
    category: 'Tech',
    postedAt: '2024-07-22',
    location: 'Austin, TX',
  },
];
