<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobBookmark extends Model
{
    /** @use HasFactory<\Database\Factories\JobBookmarkFactory> */
    use HasFactory;

    protected $fillable = [
        'job_listing_id',
        'job_seeker_id'
    ];

    public function jobListing()
    {
        return $this->belongsTo(JobListing::class);
    }

    public function jobSeeker()
    {
        return $this->belongsTo(User::class, 'job_seeker_id');
    }
}
