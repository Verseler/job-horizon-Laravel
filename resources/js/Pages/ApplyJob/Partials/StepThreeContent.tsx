import { Button } from '@/Components/UI/Button';
import { Input } from '@/Components/UI/Input';
import { InertiaFormProps } from '@inertiajs/react';
import { Link, Plus, Tag, Trash } from 'lucide-react';
import { ApplyJobForm } from '../applyJob.types';

type StepThreeContentProps = {
    form: InertiaFormProps<ApplyJobForm>;
    prevStep: () => void;
    submit: () => void;
};

export default function StepThreeContent({
    form,
    prevStep,
    submit,
}: StepThreeContentProps) {
    function handleCreateField() {
        const newFieldValue = { label: '', value: '' };
        const prevFieldValues = form.data.links ?? [];
        const updatedFieldValues = [...prevFieldValues, newFieldValue];

        form.setData('links', updatedFieldValues);
    }

    function handleDeleteField(index: number) {
        const updatedFieldValues = [...form.data.links ?? []];
        updatedFieldValues.splice(index, 1); //remove selected field

        form.setData('links', updatedFieldValues);
    }

    function handleOnChange(
        value: string,
        index: number,
        type: 'label' | 'value',
    ) {
        const updatedFieldValues = [...form.data.links ?? []];
        updatedFieldValues[index][type] = value; //update selected field

        form.setData('links', updatedFieldValues);
    }

    return (
        <>
            <h1 className="mb-4 text-3xl font-bold text-neutral-700">
                Additional Information Links
            </h1>
            <p className="text-neutral-500">
                Add certifications or portfolio links to showcase your
                expertise.
            </p>
            <p className="italic text-neutral-500">
                Certifications / Portfolio Links
            </p>

            <div className="my-6 min-h-60 max-w-[44rem] space-y-3">
                {form.data.links?.map((link, index) => (
                    <ListField
                        key={index}
                        label={link.label}
                        onLabelChange={(e) =>
                            handleOnChange(e.target.value, index, 'label')
                        }
                        value={link.value}
                        onValueChange={(e) =>
                            handleOnChange(e.target.value, index, 'value')
                        }
                        onItemDelete={() => handleDeleteField(index)}
                        labelError={
                            form.errors[
                                `links.${index}.label` as keyof typeof form.errors
                            ]
                        }
                        valueError={
                            form.errors[
                                `links.${index}.value` as keyof typeof form.errors
                            ]
                        }
                    />
                ))}

                <div className="flex flex-1 gap-x-2 pe-11">
                    <Button
                        onClick={handleCreateField}
                        variant="outline"
                        className="w-full font-medium"
                    >
                        <Plus />
                        Add Link
                    </Button>
                </div>
            </div>

            <div className="space-x-2">
                <Button
                    variant="ghost"
                    className="h-12 rounded-lg w-28"
                    onClick={prevStep}
                >
                    Back
                </Button>
                <Button
                    disabled={form.processing}
                    onClick={submit}
                    className="w-32 h-12 bg-green-600 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                >
                    Submit
                </Button>
            </div>
        </>
    );
}

type ListFieldProps = {
    label: string;
    value: string;
    onLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onItemDelete: () => void;
    labelError?: string;
    valueError?: string;
};

function ListField({
    onLabelChange,
    label,
    onValueChange,
    value,
    onItemDelete,
    labelError,
    valueError,
}: ListFieldProps) {
    return (
        <div className="flex gap-x-2">
            <div className="relative">
                <Tag className="absolute start-2.5 top-2.5 size-4 text-neutral-500" />
                <Input
                    value={label}
                    onChange={onLabelChange}
                    error={labelError}
                    className="w-60 ps-8"
                />
            </div>
            <div className="relative flex-1">
                <Link className="absolute start-2.5 top-2.5 size-4 text-neutral-500" />
                <Input
                    value={value}
                    onChange={onValueChange}
                    error={valueError}
                    className="ps-8 text-neutral-500"
                />
            </div>
            <Button
                variant="link"
                size="icon"
                className="text-red-600 hover:text-red-700"
                onClick={onItemDelete}
            >
                <Trash />
            </Button>
        </div>
    );
}
