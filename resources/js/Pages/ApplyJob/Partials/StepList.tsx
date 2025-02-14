import { cn } from '@/Lib/utils';
import React, { PropsWithChildren, ReactNode } from 'react';

type StepList = {
    currentStep: number;
    children?: ReactNode;
    stepOneHasError: boolean;
    stepTwoHasError: boolean;
    stepThreeHasError: boolean;
};

export default function StepList({
    currentStep,
    stepOneHasError,
    stepThreeHasError,
    stepTwoHasError,
}: StepList) {
    const stepsInfo = [
        {
            step: 1,
            label: 'Personal Information',
            description:
                'Enter your personal information to get closer to companies.',
            stepHasError: stepOneHasError,
        },
        {
            step: 2,
            label: 'Documents',
            description: 'Upload the required documents.',
            stepHasError: stepTwoHasError,
        },
        {
            step: 3,
            label: 'Additional Information',
            description: 'Provide your Certifications or Portfolio links',
            stepHasError: stepThreeHasError,
        },
    ];

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold">Step {currentStep}</h1>
            <p className="text-neutral-20 h-14">
                {stepsInfo[currentStep - 1].description}
            </p>

            <div className="py-14 text-neutral-200">
                {stepsInfo.map((stepInfo) => {
                    const isActive = stepInfo.step <= currentStep;

                    return (
                        <React.Fragment key={stepInfo.step}>
                            <BreakLineSeparator
                                hide={stepInfo.step === 1}
                                active={isActive}
                            />

                            <Step
                                key={stepInfo.step}
                                active={isActive}
                                error={stepInfo.stepHasError}
                            >
                                <StepNumber
                                    active={isActive}
                                    error={stepInfo.stepHasError}
                                >
                                    {stepInfo.step}
                                </StepNumber>
                                <StepLabel>{stepInfo.description}</StepLabel>
                            </Step>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

/*
 *
 * Contain the step number and step label
 *
 */
type StepProps = {
    children: ReactNode;
    active: boolean;
    error: boolean;
};

function Step({ children, active, error }: StepProps) {
    return (
        <div
            className={cn(
                'flex h-14 items-center gap-x-4',
                active ? 'text-white' : 'text-white/30',
                error && 'text-red-500',
            )}
        >
            {children}
        </div>
    );
}

type StepNumberProps = {
    children: ReactNode;
    active: boolean;
    error: boolean;
};

function StepNumber({ children, active, error }: StepNumberProps) {
    return (
        <div
            className={cn(
                'grid size-7 place-content-center rounded-full border text-sm font-semibold',
                active ? 'border-white' : 'border-white/30',
                error && 'border-red-500',
            )}
        >
            {children}
        </div>
    );
}

function StepLabel({ children }: PropsWithChildren) {
    return <p className="flex-1">{children}</p>;
}

/*
 *
 * Line Break that separates each steps
 *
 */
type BreakLineSeparatorProps = {
    hide: boolean;
    active: boolean;
};

function BreakLineSeparator({ hide, active }: BreakLineSeparatorProps) {
    if (hide) return;

    const LINE_SIZE = 5;

    return (
        <div className="flex w-7 flex-col items-center gap-y-1">
            {Array.from({ length: LINE_SIZE }).map((_, index) => (
                <div
                    key={index}
                    className={cn(
                        'h-1 w-0.5',
                        active ? 'bg-white' : 'bg-white/30',
                    )}
                />
            ))}
        </div>
    );
}
