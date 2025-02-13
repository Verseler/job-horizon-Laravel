import { Button } from '@/Components/UI/Button';
import { Checkbox } from '@/Components/UI/Checkbox';
import { Input } from '@/Components/UI/Input';
import InputError from '@/Components/UI/InputError';
import { Label } from '@/Components/UI/Label';
import { PasswordInput } from '@/Components/UI/PasswordInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function LoginPage({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="p-4">
                <form
                    onSubmit={submit}
                    className="max-w-md p-6 mx-auto mt-10 space-y-4 rounded-lg bg-neutral-800 text-neutral-300"
                >
                    <h1 className="text-2xl font-bold text-center">Login</h1>

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

                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <PasswordInput
                            id="password"
                            name="password"
                            value={data.password}
                            className="block w-full mt-1 border-neutral-400"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) =>
                                        setData(
                                            'remember',
                                            (checked || false) as false,
                                        )
                                    }
                                />
                                <span className="text-sm ms-2 text-neutral-400">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="block text-sm text-center underline text-neutral-400 hover:text-neutral-300"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <div className="pt-4 space-y-4">
                        <Button
                            className="w-full bg-green-600 hover:bg-green-500"
                            disabled={processing}
                        >
                            Log in
                        </Button>

                        <Link
                            href={route('register')}
                            className="block text-sm text-center underline text-neutral-400 hover:text-neutral-300"
                        >
                            Don't have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
