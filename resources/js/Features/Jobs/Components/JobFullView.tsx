import { format, isToday } from 'date-fns';
import {
    BriefcaseBusiness,
    CalendarArrowUp,
    CircleCheck,
    CircleDollarSign,
    Route,
} from 'lucide-react';
import React from 'react';

import { Button } from '@/Components/UI/Button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/Components/UI/Sheet';
import JobAddress from '@/Features/Jobs/Components/JobAddress';
import JobAvatar from '@/Features/Jobs/Components/JobAvatar';
import SaveButton from '@/Features/Jobs/Components/SaveButton';
import SkillList from '@/Features/Jobs/Components/SkillList';
import type { Job } from '@/Features/Jobs/job.types';
import { capitalize, formatPreciseTimeFromNow } from '@/Lib/utils';
import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';

type JobFullViewProps = {
    job: Job | undefined;
    clearSelectedJobId: () => void;
};

export default function JobFullView({
    job,
    clearSelectedJobId,
}: JobFullViewProps) {
    const userId = usePage().props.auth.user.id;
    const isPostedToday = isToday(job?.created_at || new Date());
    const datePostedLabel = `${isPostedToday ? 'Time' : 'Date'} Posted`;
    const timePosted = formatPreciseTimeFromNow(
        job?.created_at ? new Date(job.created_at) : new Date(),
    );
    const datePosted = format(
        job?.created_at ? new Date(job.created_at) : new Date(),
        'MMMM dd, yyyy',
    );
    const postedDate = isPostedToday ? timePosted : datePosted;
    const salary = `${job?.min_salary} - ${job?.max_salary}`;
    const salaryTypeLabel = `${capitalize(job?.salary_type)} Salary`;
    const jobTypeValue = capitalize(job?.job_type);
    const locationTypeValue = capitalize(job?.location_type);
    const isBookmarked = job?.bookmarked_by?.some(
        (user: User) => user.id === userId,
    );

    const isOpen = Boolean(job);

    function handleOpenChange(open: boolean) {
        if (open === false) {
            clearSelectedJobId();
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange} modal>
            <SheetContent className="overflow-y-auto md:min-w-[40rem]">
                <SheetHeader>
                    <div className="mt-5 flex items-center gap-x-3">
                        <JobAvatar />
                        <div>
                            <SheetTitle className="line-clamp-2">
                                {job?.title}
                            </SheetTitle>
                            <h2 className="text-sm">Tech Company Name</h2>
                        </div>
                        <SaveButton
                            active={isBookmarked}
                            jobId={job?.id ?? 0}
                        />
                    </div>
                </SheetHeader>

                <div className="grid grid-cols-2 gap-4 pb-6 pt-9 text-sm">
                    <FeaturedCard
                        Icon={CircleDollarSign}
                        label={salaryTypeLabel}
                    >
                        {salary}
                    </FeaturedCard>
                    <FeaturedCard
                        Icon={CalendarArrowUp}
                        label={datePostedLabel}
                    >
                        {postedDate}
                    </FeaturedCard>
                    <FeaturedCard Icon={BriefcaseBusiness} label="Job Type">
                        {jobTypeValue}
                    </FeaturedCard>
                    <FeaturedCard Icon={Route} label="Location Type">
                        {locationTypeValue}
                    </FeaturedCard>
                </div>

                <div className="pb-6">
                    <h2 className="mb-1 font-semibold">Address: </h2>
                    <JobAddress>{job?.address}</JobAddress>
                </div>

                <div className="pb-6">
                    <h2 className="mb-1 font-semibold">About the job: </h2>
                    <SheetDescription>{job?.description}</SheetDescription>
                </div>

                <div className="pb-6">
                    <h2 className="mb-2 font-semibold">Qualifications:</h2>
                    <QualificationList list={job?.qualifications} />
                </div>

                <div className="pb-10">
                    <h2 className="mb-3 font-semibold">
                        Skills and Expertise:
                    </h2>
                    <SkillList list={job?.skills} />
                </div>

                <SheetFooter className="fixed bottom-0 h-16 bg-white pt-2 dark:bg-neutral-900">
                    <Link href={route('job.apply')}>
                        <Button
                            size="lg"
                            className="w-[37rem] bg-green-600 font-semibold hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                        >
                            Apply for this position
                        </Button>
                    </Link>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

type FeaturedCardProps = {
    label: string;
    Icon: any;
    children: React.ReactNode;
};

function FeaturedCard({ label, Icon, children }: FeaturedCardProps) {
    return (
        <div className="flex items-center gap-x-3 rounded-md border border-neutral-200 p-3.5">
            <div className="max-w-max rounded-full bg-neutral-100 p-3 text-slate-600">
                <Icon className="size-4" />
            </div>
            <div className="font-semibold">
                {children}
                <h1 className="text-xs font-normal text-neutral-500">
                    {label}
                </h1>
            </div>
        </div>
    );
}

function QualificationList({ list }: { list: Job['qualifications'] }) {
    if (!list || list?.length <= 0) return;
    const qualifications = JSON.parse(list as string);

    return (
        <ul className="space-y-3">
            {qualifications.map((qualification: string) => (
                <li key={qualification} className="flex items-center gap-x-2">
                    <CircleCheck
                        className="size-6 min-w-6"
                        fill="#3b82f6"
                        color="white"
                    />
                    <p className="text-neutral-500">{qualification}</p>
                </li>
            ))}
        </ul>
    );
}
