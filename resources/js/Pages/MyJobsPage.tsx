import CenterContainer from "@/Components/UI/CenterContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/UI/Tabs";
import JobCards from "@/Features/Jobs/Components/JobCards";
import JobFullView from "@/Features/Jobs/Components/JobFullView";
import JobSearchBox from "@/Features/Jobs/Components/JobSearchBox";
import { Job } from "@/Features/Jobs/job.types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { mergeUnique } from "@/Lib/utils";
import { useMemo, useState } from "react";

type MyJobsPageProps = {
    appliedJobs: Array<Job> | null;
    bookmarkedJobs: Array<Job> | null;
};

export default function MyJobsPage({
    appliedJobs,
    bookmarkedJobs,
}: MyJobsPageProps) {
    const [selectedJobId, setSelectedJobId] = useState<Job["id"] | null>(null);
    const mergedJobs = mergeUnique(appliedJobs ?? [], bookmarkedJobs ?? []);
    const selectedJob = useMemo(
        () => mergedJobs?.find((job) => job.id === selectedJobId),
        [appliedJobs, bookmarkedJobs, selectedJobId],
    );
    const clearSelectedJobId = () => setSelectedJobId(null);

    return (
        <AuthenticatedLayout>
            <div className="py-8">
                <CenterContainer className="xl:max-w-6xl">
                    <Tabs defaultValue="applied">
                        <div className="mb-8 flex items-center justify-between gap-x-6">
                            <TabsList className="grid w-72 grid-cols-2">
                                <TabsTrigger value="applied">
                                    Applied
                                </TabsTrigger>
                                <TabsTrigger value="bookmarks">
                                    Bookmarks
                                </TabsTrigger>
                            </TabsList>
                            <JobSearchBox className="max-w-lg flex-1 border-none p-0" />
                        </div>
                        <TabsContent value="applied">
                            <div className="space-y-3">
                                <JobCards
                                    jobs={appliedJobs}
                                    setSelectedJobId={setSelectedJobId}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="bookmarks">
                            <div className="space-y-3">
                                <JobCards
                                    jobs={bookmarkedJobs}
                                    setSelectedJobId={setSelectedJobId}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </CenterContainer>

                <JobFullView
                    job={selectedJob}
                    clearSelectedJobId={clearSelectedJobId}
                />
            </div>
        </AuthenticatedLayout>
    );
}
