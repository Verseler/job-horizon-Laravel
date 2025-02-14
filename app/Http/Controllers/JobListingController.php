<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\JobApplication;
use App\Models\JobBookmark;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JobListingController extends Controller
{
    //FindJobsPage
    public function list(Request $request)
    {
        $query = JobListing::query();

        // Filter by search query
        if ($request->search) {
            $query->where('title', 'ILIKE', "%$request->search%");
        }

        // Filter by date posted
        if ($request->has('date_posted')) {
            switch ($request->date_posted) {
                case 'today':
                    $query->whereDate('created_at', now());
                    break;
                case 'this-3days':
                    $query->whereBetween('created_at', [now()->subDays(3), now()]);
                    break;
                case 'this-week':
                    $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
                    break;
                case 'this-month':
                    $query->whereMonth('created_at', now()->month)
                        ->whereYear('created_at', now()->year);
                    break;
                case 'this-year':
                    $query->whereYear('created_at', now()->year);
                    break;
            }
        }

        // Filter by job type
        if ($request->has('job_type')) {
            $query->whereIn('job_type', array_filter($request->job_type));
        }

        // Filter by location type
        if ($request->has('location_type')) {
            $query->whereIn('location_type', array_filter($request->location_type));
        }

        // Filter by salary type
        if ($request->has('salary_type')) {
            $query->where('salary_type', $request->salary_type);
        }

        // Filter by salary range
        if ($request->has('min_salary')) {
            $query->where('min_salary', '>=', $request->min_salary);
        }

        if ($request->has('max_salary')) {
            $query->where('max_salary', '<=', $request->max_salary);
        }

        $jobs = $query->with('bookmarkedBy')->get();

        return Inertia::render('FindJobsPage', ['jobs' => $jobs]);
    }


    //SavedJobsPage
    public function savedJobs()
    {
        $userId = Auth::id();

        $appliedJobs = [];

        $bookmarkedJobs = JobListing::whereHas('bookmarkedBy', function ($query) use ($userId) {
            $query->where('job_seeker_id', $userId);
        })->with('bookmarkedBy')->get();

        return Inertia::render(
            'MyJobsPage',
            [
                'appliedJobs' => $appliedJobs,
                'bookmarkedJobs' => $bookmarkedJobs
            ]
        );
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
        $jobBookmark = JobBookmark::where('job_listing_id', $id)
            ->where('job_seeker_id', Auth::id())
            ->first();

        $jobBookmark->delete();

        return back();
    }


    public function apply(Request $request)
    {
        $validatedFields = $request->validate([
            'job_id' => ['required'],
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'phone_number' => ['required', 'regex:/(09)[0-9]{9}/'],
            'address' => ['nullable'],
            'documents' => ['nullable', 'array'],
            'documents.*' => ['file'],
            'links' => ['nullable', 'array'],
            'links.*.label' => ['required', 'string'],
            'links.*.value' => ['required', 'string'],

        ]);

        //if provided job_id is invalid cancel the process and return an error.
        $job = JobListing::findOrFail($validatedFields['job_id']);

        //Check if the user already applied for this job
        $existingApplication = JobApplication::where('job_listing_id', $job->id)
            ->where('job_seeker_id', Auth::id())
            ->first();

        if ($existingApplication) {
            return back()->with('error', 'You have already applied for this job');
        }


        $jobApplication = JobApplication::create([
            'first_name' => $validatedFields['first_name'],
            'middle_name' => $validatedFields['middle_name'],
            'last_name' => $validatedFields['last_name'],
            'email' => $validatedFields['email'],
            'phone_number' => $validatedFields['phone_number'],
            'address' => $validatedFields['address'],
            'links' => json_encode($validatedFields['links']),
            'status' => 'applied',
            'job_listing_id' => $validatedFields['job_id'],
            'job_seeker_id' => Auth::id(),
        ]);

        if ($request->hasFile('documents')) {
            //for each document file, store it in storage and its information to database
            foreach ($request->file('documents') as $document) {
                $filePath = Storage::disk('public')->put('job_application_documents', $document);

                Document::create([
                    'job_application_id' => $jobApplication->id,
                    'file_path' => $filePath
                ]);
            }
        }

        return to_route('job.list')->with('success', 'Successfully applied to a job');
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

}
