import { Button } from '@/Components/UI/Button';
import Uploader from '@/Components/UI/Uploader';
import { InertiaFormProps } from '@inertiajs/react';
import { ApplyJobForm } from '../applyJob.types';

type StepTwoContentProps = {
    form: InertiaFormProps<ApplyJobForm>;
    prevStep: () => void;
    nextStep: () => void;
};

export default function StepTwoContent({
    form,
    nextStep,
    prevStep,
}: StepTwoContentProps) {
    console.log('documents error: ', form.errors.documents);
    return (
        <div>
            <h1 className="mb-4 text-3xl font-bold text-neutral-700">
                Your Documents
            </h1>
            <p className="text-neutral-500">
                Provide the required documents based on the job descriptions.
            </p>
            <p className="italic text-neutral-500">
                RESUME / CV / Cover Letter
            </p>
            <div className="my-6 w-[36rem] space-y-3">
                <Uploader files={form.data.documents} setFiles={form.setData} />
            </div>
            <div className="space-x-2">
                <Button
                    variant="ghost"
                    className="h-12 w-28 rounded-lg"
                    onClick={prevStep}
                >
                    Back
                </Button>
                <Button
                    onClick={nextStep}
                    className="h-12 w-32 rounded-lg bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                >
                    Next Step
                </Button>
            </div>
        </div>
    );
}
