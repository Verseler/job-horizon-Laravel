import { Link } from '@inertiajs/react';
import { Bookmark } from 'lucide-react';

type SaveButtonProps = {
    active: boolean | undefined;
    jobId: number;
};

export default function SaveButton({ active, jobId }: SaveButtonProps) {
    if (active) {
        return (
            <Link
                onClick={(e) => e.stopPropagation()}
                href={route('job.unBookmark', { id: jobId })}
                method="delete"
                as="button"
                type="button"
                className="ml-auto grid h-9 w-9 place-content-center rounded-md border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50"
            >
                <Bookmark fill="#16a34a" size={16} color="#15803d" />
            </Link>
        );
    }

    return (
        <Link
            onClick={(e) => e.stopPropagation()}
            href={route('job.bookmark', { id: jobId })}
            method="post"
            className="ml-auto grid h-9 w-9 place-content-center rounded-md border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50"
        >
            <Bookmark fill="transparent" size={16} color="#a3a3a3" />
        </Link>
    );
}
