import CenterContainer from "@/Components/UI/CenterContainer";
import JobCards from "@/Features/Jobs/Components/JobCards";
import JobFilterControls from "@/Features/Jobs/Components/JobFilterControls";
import JobFullView from "@/Features/Jobs/Components/JobFullView";
import JobSearchBox from "@/Features/Jobs/Components/JobSearchBox";
import { Job } from "@/Features/Jobs/job.types";
import { useToast } from "@/hooks/use-toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

type FindJobsPageProps = {
    jobs: Array<Job> | null;
};

export default function FindJobsPage({ jobs }: FindJobsPageProps) {
    const page = usePage<SharedData>();
    const { toast } = useToast();
    const [selectedJobId, setSelectedJobId] = useState<Job["id"] | null>(null);
    const selectedJob = useMemo(
        () => jobs?.find((job) => job.id === selectedJobId),
        [jobs, selectedJobId],
    );

    const clearSelectedJobId = () => setSelectedJobId(null);

    //display flash success message using toast
    useEffect(() => {
        if (page.props.flash.success) {
            toast({
                title: page.props.flash.success,
            });
        }
    }, [page.props.flash.success]);

    return (
        <AuthenticatedLayout>
            <div>
                <section className="bg-slate-50 py-12 dark:bg-slate-900">
                    <CenterContainer className="space-y-2">
                        <h1 className="text-2xl font-semibold xl:text-3xl">
                            Find your dream job
                        </h1>
                        <p className="text-sm text-slate-500 xl:text-base">
                            Looking for jobs? Browse our latest job openings to
                            view & apply to the best jobs today!
                        </p>
                    </CenterContainer>
                </section>
                <section className="py-4">
                    <CenterContainer className="flex items-start gap-3">
                        <JobFilterControls />

                        <div className="flex-1">
                            <JobSearchBox />

                            <div className="mt-8 space-y-3">
                                <JobCards
                                    jobs={jobs}
                                    setSelectedJobId={setSelectedJobId}
                                />
                            </div>
                        </div>
                    </CenterContainer>

                    <JobFullView
                        job={selectedJob}
                        clearSelectedJobId={clearSelectedJobId}
                    />
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
