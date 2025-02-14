import { User } from '@/types';

export type Job = {
    id: number;
    title: string;
    description: string;
    address?: string;
    skills?: Array<string> | string;
    qualifications?: Array<string> | string;
    status: 'open' | 'closed';
    job_type: 'full-time' | 'part-time' | 'internship' | 'volunteer' | 'contract';
    location_type: 'onsite' | 'remote' | 'hybrid';
    salary_type: 'hourly' | 'daily' | 'weekly' | 'semi-monthly' | 'monthly' | 'onetime-payment';
    min_salary: number;
    max_salary?: number;
    recruiter_id: number;
    created_at: string;
    updated_at: string;
    bookmarked_by?: Array<User>
}

