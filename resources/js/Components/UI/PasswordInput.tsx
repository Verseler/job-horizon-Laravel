import * as React from 'react';

import { cn } from '@/Lib/utils';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'> & { error?: string | undefined }
>(({ className, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="relative">
            <input
                type={showPassword ? 'text' : 'password'}
                className={cn(
                    'flex h-9 w-full rounded-md border border-neutral-200 bg-transparent py-1 pe-8 ps-3 text-base transition-colors selection:bg-green-100 selection:text-neutral-400 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 md:text-sm',
                    className,
                    error
                        ? 'border-red-500 text-red-500 file:text-red-500 placeholder:text-red-500 focus-visible:ring-red-500 dark:border-red-400 dark:text-red-400 dark:file:text-red-500 dark:placeholder:text-red-500 dark:focus-visible:ring-red-500'
                        : '',
                )}
                ref={ref}
                {...props}
            />
            {showPassword ? (
                <Eye
                    onClick={() => setShowPassword(false)}
                    className="absolute end-2.5 top-2.5 size-4 cursor-pointer"
                />
            ) : (
                <EyeOff
                    onClick={() => setShowPassword(true)}
                    className="absolute end-2.5 top-2.5 size-4 cursor-pointer"
                />
            )}
        </div>
    );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
