<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    /** @use HasFactory<\Database\Factories\DocumentFactory> */
    use HasFactory;
    protected $fillable = [
        'job_application_id',
        'file_path'
    ];

    public function jobApplication()
    {
        return $this->belongsTo(JobApplication::class);
    }
}
