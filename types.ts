// FIX: Created type definitions for data structures used in the application.
export interface Company {
  id: number;
  name: string;
  logoUrl: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  company: Company;
  postedAt: string;
  location?: string;
  isExternal?: boolean;
  sourceUrl?: string;
}

export interface Applicant {
    id: string;
    name: string;
    email: string;
    jobTitle: string;
    appliedAt: string;
    status: 'Pending' | 'Reviewed' | 'Rejected';
}
