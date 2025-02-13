import React from 'react';

import { cn } from '@/Lib/utils';

type CenterContainerProps = {
    className?: React.HtmlHTMLAttributes<HTMLElement>['className'];
    children: React.ReactNode;
};

export default function CenterContainer({
    className,
    children,
}: CenterContainerProps) {
    return (
        <div className={cn('mx-auto px-4 lg:container md:px-6', className)}>
            {children}
        </div>
    );
}
