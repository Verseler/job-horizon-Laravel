<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobListing extends Model
{
    /** @use HasFactory<\Database\Factories\JobListingFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'address',
        'skills',
        'qualifications',
        'status',
        'job_type',
        'location_type',
        'salary_type',
        'min_salary',
        'max_salary',
        'recruiter_id',
    ];

    public function recruiter()
    {
        return $this->belongsTo(User::class, "recruiter_id");
    }

    public function jobApplications()
    {
        return $this->hasMany(JobApplication::class);
    }

    public function appliedBy()
    {
        return $this->belongsToMany(
            User::class,
            'job_applications',
            'job_listing_id',
            'job_seeker_id'
        )->withTimestamps();
    }

    public function bookmarkedBy()
    {
        return $this->belongsToMany(
            User::class,
            'job_bookmarks',
            'job_listing_id',
            'job_seeker_id'
        )->withTimestamps();
    }
}
