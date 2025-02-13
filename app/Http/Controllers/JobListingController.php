<?php

namespace App\Http\Controllers;

use App\Models\JobBookmark;
use App\Models\JobListing;
use Brick\Math\BigInteger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JobListingController extends Controller
{
    public function findJobs()
    {
        $jobs = JobListing::with('bookmarkedBy')->get();

        return Inertia::render('FindJobsPage', ['jobs' => $jobs]);
    }


    public function savedJobs()
    {
        $userId = Auth::id();

        $appliedJobs = [];
        $bookmarkedJobs = JobListing::whereHas('bookmarkedBy', function ($query) use ($userId) {
            $query->where('job_seeker_id', $userId);
        })->with('bookmarkedBy')->get();

        return Inertia::render('MyJobsPage', ['appliedJobs' => $appliedJobs, 'bookmarkedJobs' => $bookmarkedJobs]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Bookmark a job.
     */
    public function bookmark($id)
    {
        $jobListing = JobListing::findOrFail($id);

        $jobAlreadyExist = JobBookmark::where('job_listing_id', $jobListing->id)
            ->where('job_seeker_id', Auth::id())
            ->exists();

        if (!$jobAlreadyExist) {
            JobBookmark::create([
                'job_listing_id' => $jobListing->id,
                'job_seeker_id' => Auth::id()
            ]);
        }

        return back();
    }


    /**
     * Un bookmark a job.
     */
    public function unBookmark($id)
    {
        $jobBookmark = JobBookmark::where('job_listing_id', $id)->first();
        $jobBookmark->delete();

        return back();
    }

}
