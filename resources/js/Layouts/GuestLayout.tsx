import ApplicationLogo from '@/Components/ApplicationLogo';
import { Button } from '@/Components/UI/Button';
import CenterContainer from '@/Components/UI/CenterContainer';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    const auth = usePage().props.auth;

    return (
        <div className="min-h-screen bg-neutral-900">
            <CenterContainer>
                <header className="flex items-center justify-between py-4">
                    <Link href="/">
                        <ApplicationLogo />
                    </Link>

                    {auth.user ? (
                        <Link href={route('dashboard')}>
                            <Button className="bg-green-700 text-sm font-normal hover:bg-green-600">
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <div className="space-x-2 text-white">
                            <Link href={route('login')}>
                                <Button
                                    variant="ghost"
                                    className="text-sm font-normal hover:bg-neutral-700 hover:text-white"
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Link href={route('register')}>
                                <Button className="bg-green-700 text-sm font-normal hover:bg-green-600">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}
                </header>
            </CenterContainer>
            {children}
        </div>
    );
}
