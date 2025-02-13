import { Checkbox } from '@/Components/UI/Checkbox';
import { capitalize } from '@/Lib/utils';

type JobFilterControlsCheckboxProps = {
    data: Array<string>;
    dataKey: string;
    value: string;
    setValue: Function;
};

export default function JobFilterControlsCheckbox({
    data,
    dataKey,
    value,
    setValue,
}: JobFilterControlsCheckboxProps) {
    const label = capitalize(value);
    const isChecked = data.includes(value);

    function handleOnCheckedChange() {
        if (isChecked) {
            setValue(dataKey, [...data.filter((e) => e !== value)]);
        } else {
            setValue(dataKey, [...data, value]);
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Checkbox
                checked={isChecked}
                onCheckedChange={handleOnCheckedChange}
            />

            <span className="text-sm text-neutral-600">{label}</span>
        </div>
    );
}
