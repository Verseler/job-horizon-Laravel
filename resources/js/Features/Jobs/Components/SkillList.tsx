import { Badge } from '@/Components/UI/Badge';
import type { Job } from '@/Features/Jobs/job.types';
import { cn } from '@/Lib/utils';
import { memo } from 'react';

function SkillList({ list }: { list: Job['skills'] }) {
    if (!list || list?.length <= 0) return;
    const skills = JSON.parse(list as string);

    return (
        <ul className="flex flex-wrap items-center gap-2 pb-6">
            {skills.map((skill: string, index: number) => {
                return (
                    <li key={skill}>
                        <Badge className={cn(colorPool[index])}>{skill}</Badge>
                    </li>
                );
            })}
        </ul>
    );
}

export default memo(SkillList);

const colorPool = [
    'bg-blue-50 text-blue-400',
    'bg-green-50  text-green-400',
    'bg-yellow-50 text-yellow-400',
    'bg-indigo-50 text-indigo-400',
    'bg-red-50 text-red-400',
    'bg-purple-50 text-purple-400',
    'bg-orange-50 text-orange-400',
    'bg-amber-50 text-amber-400',
    'bg-emerald-50 text-emerald-400',
    'bg-gray-50 text-gray-400',
    'bg-pink-50 text-pink-400',
    'bg-slate-50 text-slate-400',
];
