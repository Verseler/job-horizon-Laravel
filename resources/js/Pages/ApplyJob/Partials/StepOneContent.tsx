import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/UI/Input';
import InputError from '@/Components/UI/InputError';
import { Label } from '@/Components/UI/Label';
import { type InertiaFormProps } from '@inertiajs/react';
import type { ApplyJobForm } from '../applyJob.types';

type StepOneContentProps = {
    form: InertiaFormProps<ApplyJobForm>;
    nextStep: () => void;
};

export default function StepOneContent({
    form,
    nextStep,
}: StepOneContentProps) {
    return (
        <div>
            <h1 className="mb-4 text-3xl font-bold text-neutral-700">
                Your Personal Information
            </h1>
            <p className="text-neutral-500">
                Enter your personal information to get closer to companies.
            </p>

            <div className="my-10 grid grid-cols-2 gap-6 *:space-y-1">
                <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        value={form.data.first_name}
                        onChange={(e) =>
                            form.setData('first_name', e.target.value)
                        }
                        error={form.errors.first_name}
                    />
                    <InputError
                        message={form.errors.first_name}
                        className="mt-2"
                    />
                </div>
                <div>
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                        id="middleName"
                        value={form.data.middle_name}
                        onChange={(e) =>
                            form.setData('middle_name', e.target.value)
                        }
                        error={form.errors.middle_name}
                    />
                    <InputError
                        message={form.errors.middle_name}
                        className="mt-2"
                    />
                </div>
                <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        value={form.data.last_name}
                        onChange={(e) =>
                            form.setData('last_name', e.target.value)
                        }
                        error={form.errors.last_name}
                    />
                    <InputError
                        message={form.errors.last_name}
                        className="mt-2"
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={form.data.email}
                        onChange={(e) => form.setData('email', e.target.value)}
                        error={form.errors.email}
                    />
                    <InputError message={form.errors.email} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="phoneNumber">Phone #</Label>
                    <Input
                        id="phoneNumber"
                        type="number"
                        inputMode="numeric"
                        value={form.data.phone_number}
                        onChange={(e) =>
                            form.setData('phone_number', e.target.value)
                        }
                        error={form.errors.phone_number}
                    />
                    <InputError
                        message={form.errors.phone_number}
                        className="mt-2"
                    />
                </div>
                <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        value={form.data.address}
                        onChange={(e) =>
                            form.setData('address', e.target.value)
                        }
                        error={form.errors.address}
                    />
                    <InputError
                        message={form.errors.address}
                        className="mt-2"
                    />
                </div>
            </div>

            <div className="space-x-2">
                <Button
                    variant="ghost"
                    className="h-12 w-28 rounded-lg"
                    disabled={true}
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
