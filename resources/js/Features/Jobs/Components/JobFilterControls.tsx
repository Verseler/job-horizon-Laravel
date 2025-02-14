import { Button } from '@/Components/UI/Button';
import { Separator } from '@/Components/UI/Separator';

import { DualRangeSlider } from '@/Components/UI/DualRangeSlider';
import { Input } from '@/Components/UI/Input';
import { Label } from '@/Components/UI/Label';
import { RadioGroup, RadioGroupItem } from '@/Components/UI/Radio-group';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/UI/Select';
import { capitalize } from '@/Lib/utils';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import JobFilterControlsCheckbox from './JobFilterControlsCheckbox';

const MIN_SALARY = 0;
const MAX_SALARY = 1_000_000;

export default function JobFilterControls() {
    const { data, setData, get, processing, reset } = useForm({
        date_posted: '',
        job_type: [],
        location_type: [],
        salary_type: 'monthly',
        min_salary: MIN_SALARY,
        max_salary: MAX_SALARY,
    });

    function handleClearFilter() {
        reset();

        get(route('job.list'), { preserveState: true });
    }

    function handleSubmitJobFilter(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        get(route('job.list'), {
            preserveState: true,
            replace: true,
            only: ['jobs'],
        });
    }

    return (
        <form
            onSubmit={handleSubmitJobFilter}
            className="max-h-max min-w-72 rounded-md border"
        >
            <div className="flex items-center justify-between border-b px-4 py-1">
                <h1 className="text-base font-semibold">Filter</h1>
                <Button
                    onClick={handleClearFilter}
                    type="button"
                    variant="link"
                    className="p-0 text-sm font-medium text-red-500 hover:text-red-700 hover:no-underline"
                >
                    Clear all
                </Button>
            </div>

            <div className="p-4 pb-7">
                <section className="space-y-1.5">
                    <h2 className="text-sm font-medium">Date Posted</h2>
                    <Select
                        value={data.date_posted}
                        onValueChange={(value) => setData('date_posted', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a Date" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="this-3days">
                                    Within 3 days
                                </SelectItem>
                                <SelectItem value="this-week">
                                    Within this week
                                </SelectItem>
                                <SelectItem value="this-month">
                                    Within this month
                                </SelectItem>
                                <SelectItem value="this-year">
                                    Within this year
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </section>

                <Separator className="mb-5 mt-7" />
                <section className="space-y-1.5">
                    <h2 className="text-sm font-medium">Job Type</h2>
                    <div className="grid grid-cols-2 gap-y-1">
                        <JobFilterControlsCheckbox
                            data={data.job_type}
                            dataKey="job_type"
                            value="full-time"
                            setValue={setData}
                        />
                        <JobFilterControlsCheckbox
                            data={data.job_type}
                            dataKey="job_type"
                            value="part-time"
                            setValue={setData}
                        />
                        <JobFilterControlsCheckbox
                            data={data.job_type}
                            dataKey="job_type"
                            value="internship"
                            setValue={setData}
                        />
                        <JobFilterControlsCheckbox
                            data={data.job_type}
                            dataKey="job_type"
                            value="volunteer"
                            setValue={setData}
                        />
                        <JobFilterControlsCheckbox
                            data={data.job_type}
                            dataKey="job_type"
                            value="contract"
                            setValue={setData}
                        />
                    </div>
                </section>

                <Separator className="mb-5 mt-7" />
                <section className="space-y-3">
                    <h2 className="text-sm font-medium">Range Salary</h2>
                    <RadioGroup
                        className="grid grid-cols-2 gap-1.5"
                        value={data.salary_type}
                        onValueChange={(value) => setData('salary_type', value)}
                    >
                        {[
                            'hourly',
                            'daily',
                            'weekly',
                            'semi-monthly',
                            'monthly',
                            'onetime-payment',
                        ].map((option) => {
                            const optionLabel = capitalize(option);

                            return (
                                <div
                                    key={option}
                                    className="flex items-center space-x-2"
                                >
                                    <RadioGroupItem
                                        value={option}
                                        id={option}
                                    />
                                    <Label
                                        className="font-normal text-neutral-500"
                                        htmlFor={option}
                                    >
                                        {optionLabel}
                                    </Label>
                                </div>
                            );
                        })}
                    </RadioGroup>

                    <div>
                        <div className="mt-5">
                            <DualRangeSlider
                                value={[data.min_salary, data.max_salary]}
                                onValueChange={(value) => {
                                    setData('min_salary', value[0]);
                                    setData('max_salary', value[1]);
                                }}
                                step={1}
                                min={MIN_SALARY}
                                max={MAX_SALARY}
                            />

                            <div className="mt-3 flex justify-between text-neutral-500">
                                <div className="relative flex items-center">
                                    <Label
                                        htmlFor="min-salary"
                                        className="absolute border-e border-neutral-500 px-2 text-xs"
                                    >
                                        MIN
                                    </Label>
                                    <Input
                                        type="number"
                                        inputMode="numeric"
                                        id="min_salary"
                                        className="w-[7.5rem] pe-2 ps-[3.2rem] text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        value={data.min_salary}
                                        min={MIN_SALARY}
                                        max={MAX_SALARY}
                                        onChange={(e) =>
                                            setData(
                                                'min_salary',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                </div>
                                <div className="relative flex items-center">
                                    <Label
                                        htmlFor="max-salary"
                                        className="absolute border-e border-neutral-500 px-2 text-xs"
                                    >
                                        MAX
                                    </Label>
                                    <Input
                                        type="number"
                                        inputMode="numeric"
                                        id="max_salary"
                                        className="w-[7.5rem] pe-2 ps-[3.2rem] text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        value={data.max_salary}
                                        min={MIN_SALARY}
                                        max={MAX_SALARY}
                                        onChange={(e) =>
                                            setData(
                                                'max_salary',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Separator className="mb-5 mt-7" />
                <section className="space-y-1.5">
                    <h2 className="text-sm font-medium">Location Type</h2>
                    <div className="grid grid-cols-2 gap-y-1">
                        <JobFilterControlsCheckbox
                            data={data.location_type}
                            dataKey="location_type"
                            value="onsite"
                            setValue={setData}
                        />
                        <JobFilterControlsCheckbox
                            data={data.location_type}
                            dataKey="location_type"
                            value="remote"
                            setValue={setData}
                        />
                        <JobFilterControlsCheckbox
                            data={data.location_type}
                            dataKey="location_type"
                            value="hybrid"
                            setValue={setData}
                        />
                    </div>
                </section>

                <Separator className="mb-5 mt-7" />
                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400"
                >
                    Apply
                </Button>
            </div>
        </form>
    );
}
