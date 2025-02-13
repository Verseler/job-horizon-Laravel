import { cn } from '@/Lib/utils';
import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={cn(
                'inline-flex h-full items-center border-b-2 px-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none',
                active
                    ? 'border-b-2 border-b-green-600 text-green-600'
                    : 'border-transparent text-slate-500',
                className,
            )}
        >
            {children}
        </Link>
    );
}
