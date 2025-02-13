import { cn } from '@/Lib/utils';
import { PropsWithChildren } from 'react';

export default function ApplicationLogo({
    className,
}: PropsWithChildren<{
    className: React.HTMLAttributes<HTMLDivElement>['className'];
}>) {
    return (
        <div className={cn('flex items-center gap-x-2 text-white', className)}>
            <div className="rounded-sm bg-green-600 px-1 font-semibold text-white">
                JH
            </div>
            <span className="font-semibold">Job Horizon</span>
        </div>
    );
}
