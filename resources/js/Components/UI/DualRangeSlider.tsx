'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/Lib/utils';

interface DualRangeSliderProps
    extends React.ComponentProps<typeof SliderPrimitive.Root> {}

const DualRangeSlider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    DualRangeSliderProps
>(({ className, ...props }, ref) => {
    const initialValue = Array.isArray(props.value)
        ? props.value
        : [props.min, props.max];

    return (
        <SliderPrimitive.Root
            ref={ref}
            className={cn(
                'relative flex w-full touch-none select-none items-center',
                className,
            )}
            {...props}
        >
            <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-900/20 dark:bg-slate-50/20">
                <SliderPrimitive.Range className="absolute h-full bg-green-600 dark:bg-green-200" />
            </SliderPrimitive.Track>
            {initialValue.map((_, index) => (
                <React.Fragment key={index}>
                    <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border border-slate-200 border-slate-900/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-50/50 dark:border-slate-800 dark:bg-slate-950 dark:focus-visible:ring-slate-300" />
                </React.Fragment>
            ))}
        </SliderPrimitive.Root>
    );
});
DualRangeSlider.displayName = 'DualRangeSlider';

export { DualRangeSlider };
