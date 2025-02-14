import { Search, X } from 'lucide-react';
import React, { FormEvent, memo } from 'react';

import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/UI/Input';
import { cn } from '@/Lib/utils';
import { useForm } from '@inertiajs/react';

type JobSearchBoxProps = {
    className?: React.HtmlHTMLAttributes<HTMLElement>['children'];
};

function JobSearchBox({ className }: JobSearchBoxProps) {
    const { data, setData, get, processing, reset } = useForm({
        search: '',
    });

    function clearSearch() {
        reset();
    }

    function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        get(route('job.list'), {
            preserveState: true,
            replace: true,
            only: ['jobs'],
        });
    }

    return (
        <form
            onSubmit={handleSearchSubmit}
            className={cn(
                'flex items-center gap-x-3 rounded-md border p-2',
                className,
            )}
        >
            <div className="relative flex-1">
                <Input
                    placeholder="Search by Title..."
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                    className="pe-8 shadow-none placeholder:text-xs placeholder:text-neutral-400"
                />
                {data.search.length > 0 && (
                    <Button
                        onClick={clearSearch}
                        variant="link"
                        size="icon"
                        type="button"
                        className="absolute right-0 top-0 text-neutral-500"
                    >
                        <X />
                    </Button>
                )}
            </div>

            <Button
                type="submit"
                disabled={processing}
                className="bg-green-600 font-normal hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400"
            >
                <Search />
                Find
            </Button>
        </form>
    );
}

export default memo(JobSearchBox);
