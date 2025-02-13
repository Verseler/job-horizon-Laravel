import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/UI/Input';
import InputError from '@/Components/UI/InputError';
import { Label } from '@/Components/UI/Label';
import { PasswordInput } from '@/Components/UI/PasswordInput';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/Select';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function RegisterPage() {
    let params = new URLSearchParams(window.location.search);
    const paramRole = params.get('role') ?? 'job_seeker';
    const roleValue = ['job_seeker', 'recruiter'].includes(paramRole)
        ? paramRole
        : 'job_seeker';

    console.log(params.get('role'));
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        role: roleValue,
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="p-4">
                <form
                    onSubmit={submit}
                    className="max-w-md p-6 mx-auto mt-10 space-y-4 rounded-lg bg-neutral-800 text-neutral-300"
                >
                    <h1 className="text-2xl font-bold text-center">Register</h1>

                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full mt-1 border-neutral-400"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="last_name">Role</Label>

                        <Select
                            value={data.role}
                            onValueChange={(value) => setData('role', value)}
                        >
                            <SelectTrigger className="mt-1 border-neutral-400">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800 text-neutral-200">
                                <SelectGroup>
                                    <SelectItem value="job_seeker">
                                        Job Seeker
                                    </SelectItem>
                                    <SelectItem value="recruiter">
                                        Recruiter
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <InputError message={errors.role} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="first_name">First Name</Label>

                        <Input
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="block w-full mt-1 border-neutral-400"
                            autoComplete="name"
                            onChange={(e) =>
                                setData('first_name', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.first_name}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor="middle_name">Middle Name</Label>

                        <Input
                            id="middle_name"
                            name="middle_name"
                            value={data.middle_name}
                            className="block w-full mt-1 border-neutral-400"
                            autoComplete="name"
                            onChange={(e) =>
                                setData('middle_name', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.middle_name}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor="last_name">Last Name</Label>

                        <Input
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="block w-full mt-1 border-neutral-400"
                            autoComplete="name"
                            onChange={(e) =>
                                setData('last_name', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.last_name}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>

                        <PasswordInput
                            id="password"
                            name="password"
                            value={data.password}
                            className="block w-full mt-1 border-neutral-400"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">
                            Confirm Password
                        </Label>

                        <PasswordInput
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full mt-1 border-neutral-400"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="pt-4 space-y-4">
                        <Button
                            className="w-full bg-green-600 hover:bg-green-500"
                            disabled={processing}
                        >
                            Register
                        </Button>

                        <Link
                            href={route('login')}
                            className="block text-sm text-center underline text-neutral-400 hover:text-neutral-300"
                        >
                            Already registered?
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
