import { DotSeperator } from '@/Components/UI/Separator';
import JobAddress from '@/Features/Jobs/Components/JobAddress';
import JobAvatar from '@/Features/Jobs/Components/JobAvatar';
import SaveButton from '@/Features/Jobs/Components/SaveButton';
import SkillList from '@/Features/Jobs/Components/SkillList';
import type { Job } from '@/Features/Jobs/job.types';
import { capitalize, formatPreciseTimeFromNow } from '@/Lib/utils';
import { User } from '@/types';
import { usePage } from '@inertiajs/react';
import { format, isToday } from 'date-fns';

type JobCardsProps = {
    jobs: Array<Job> | null;
    setSelectedJobId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function JobCards({ jobs, setSelectedJobId }: JobCardsProps) {
    return jobs?.map((job) => (
        <JobCard key={job.id} onClick={() => setSelectedJobId(job.id)} {...job} />
    ));
}

type JobCardProps = Omit<Job, 'updated_at'> & {
    onClick: () => void;
};

function JobCard({
    id,
    title,
    description,
    address,
    job_type,
    location_type,
    min_salary,
    salary_type,
    max_salary,
    skills,
    created_at,
    onClick,
    bookmarked_by,
}: JobCardProps) {
    const userId = usePage().props.auth.user.id;
    const timePosted = `${formatPreciseTimeFromNow(new Date(created_at))}`;
    const datePosted = format(new Date(created_at), 'MMMM dd, yyyy');
    const postedDate = isToday(created_at) ? timePosted : datePosted;
    const salary = `$${min_salary} - $${max_salary} ${capitalize(salary_type)}`;
    const locationTypeValue = capitalize(location_type);
    const jobTypeValue = capitalize(job_type);
    const isBookmarked = bookmarked_by?.some(
        (user: User) => user.id === userId,
    );

    return (
        <div onClick={onClick} className="p-4 border rounded-md" role="button">
            <div className="flex items-center gap-x-3">
                <JobAvatar />
                <div className="mb-1 space-y-1">
                    <h1>{title}</h1>
                    <ul className="flex items-center text-xs gap-x-2 text-neutral-500">
                        <li>{jobTypeValue}</li>
                        <DotSeperator />
                        <li>{locationTypeValue} work</li>
                        <DotSeperator />
                        <li>{salary}</li>
                    </ul>
                </div>
                <SaveButton active={isBookmarked} jobId={id} />
            </div>

            <div className="py-3">
                <p className="text-sm line-clamp-2 text-neutral-500">
                    {description}
                </p>
            </div>

            <ul className="flex flex-wrap items-center gap-2 pb-6">
                <SkillList list={skills} />
            </ul>

            <div className="flex items-center justify-between">
                <JobAddress size="sm">{address}</JobAddress>
                <p className="text-xs text-slate-400">{postedDate}</p>
            </div>
        </div>
    );
}
