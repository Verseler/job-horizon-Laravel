import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/UI/Avatar';
import { Button } from '@/Components/UI/Button';
import CenterContainer from '@/Components/UI/CenterContainer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/UI/DropdownMenu';
import { getNameInitial } from '@/Lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';

const jobSeekerNavLinks = [
    { id: 1, label: 'Find Jobs', url: 'job.list', path: '/jobs' },
    { id: 2, label: 'My Jobs', url: 'job.saved', path: '/jobs/saved' },
];

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
    const [showNavDropdown, setShowNavDropdown] = useState(false);
    const user = usePage().props.auth.user;
    const nameInitial = getNameInitial(user.first_name);
    const currentActiveNav = usePage().url;

    const navLinks = jobSeekerNavLinks.map((link) => {
        const isActive = link.path === currentActiveNav;

        return (
            <li key={link.id} className="h-full">
                <NavLink href={route(link.url)} active={isActive}>
                    {link.label}
                </NavLink>
            </li>
        );
    });

    return (
        <div className="min-h-screen w-full bg-white dark:bg-neutral-900">
            <header className="border-b border-b-neutral-200 bg-slate-50 dark:bg-slate-900">
                <CenterContainer className="flex items-center justify-between">
                    <Link
                        href={route(
                            user.role === 'recruiter' ? '' : 'job.list',
                        )}
                    >
                        <ApplicationLogo className="text-black" />
                    </Link>

                    <nav>
                        <ul className="flex h-12 items-center gap-x-6 text-sm font-semibold">
                            {user.role === 'job_seeker' && navLinks}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-x-3">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="text-slate-500"
                        >
                            <Bell />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar
                                    onClick={() =>
                                        setShowNavDropdown(!showNavDropdown)
                                    }
                                >
                                    <AvatarImage src="" />
                                    <AvatarFallback>
                                        {nameInitial}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white dark:bg-neutral-900">
                                <DropdownMenuItem>
                                    <Link href={route('profile.edit')}>
                                        Profile
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                    >
                                        Log Out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CenterContainer>
            </header>

            <main>{children}</main>
        </div>
    );
}
