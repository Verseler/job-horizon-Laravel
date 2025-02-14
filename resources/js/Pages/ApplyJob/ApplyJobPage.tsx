import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StepList from '@/Pages/ApplyJob/Partials/StepList';
import StepOneContent from '@/Pages/ApplyJob/Partials/StepOneContent';
import StepThreeContent from '@/Pages/ApplyJob/Partials/StepThreeContent';
import StepTwoContent from '@/Pages/ApplyJob/Partials/StepTwoContent';
import { ApplyJobForm } from '@/Pages/ApplyJob/applyJob.types';
import { useToast } from '@/hooks/use-toast';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type ApplyJobPageProps = {
    jobId: number;
};

export default function ApplyJobPage({ jobId }: ApplyJobPageProps) {
    const { flash } = usePage().props;
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(1);
    const prevStep = () => setCurrentStep((step) => step - 1);
    const nextStep = () => setCurrentStep((step) => step + 1);

    const form = useForm<ApplyJobForm>({
        job_id: jobId,
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        documents: [],
        links: [],
    });

    const stepOneHasError =
        !!form.errors.first_name ||
        !!form.errors.middle_name ||
        !!form.errors.last_name ||
        !!form.errors.address ||
        !!form.errors.email ||
        !!form.errors.phone_number;
    const stepTwoHasError = !!form.errors.documents;
    const stepThreeHasError = Object.keys(form.errors).some((key) =>
        key.startsWith('links.'),
    );

    function handleSubmit() {
        form.post(route('job.apply'), {
            onSuccess: () => form.reset(),
        });
    }

    const currentStepContent = () => {
        switch (currentStep) {
            case 3:
                return (
                    <StepThreeContent
                        form={form}
                        prevStep={prevStep}
                        submit={handleSubmit}
                    />
                );
            case 2:
                return (
                    <StepTwoContent
                        form={form}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                );
            case 1:
            default:
                return <StepOneContent form={form} nextStep={nextStep} />;
        }
    };

    //display flash error using toast
    useEffect(() => {
        if(flash.error) {
            toast({
                title: flash.error,
                variant: 'destructive',
            });
        }
    }, [flash.error]);

    //display form fields error using toast
    useEffect(() => {
        if (stepOneHasError) {
            toast({
                title: 'Step one fields has error',
                variant: 'destructive',
            });
        }
        if (stepTwoHasError) {
            toast({
                title: 'Step two fields has error',
                variant: 'destructive',
            });
        }
        if (stepThreeHasError) {
            toast({
                title: 'Step three fields has error',
                variant: 'destructive',
            });
        }
    }, [form.errors]);

    return (
        <AuthenticatedLayout>
            <div className="flex min-h-[calc(100vh-57px)]">
                <div className="flex flex-col justify-center p-10 text-white bg-green-900 w-96 pe-14">
                    <StepList
                        currentStep={currentStep}
                        stepOneHasError={stepOneHasError}
                        stepTwoHasError={stepTwoHasError}
                        stepThreeHasError={stepThreeHasError}
                    />
                </div>

                <div className="flex flex-col justify-center flex-1 max-w-4xl p-10">
                    <div className="min-h-[26rem]">{currentStepContent()}</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
