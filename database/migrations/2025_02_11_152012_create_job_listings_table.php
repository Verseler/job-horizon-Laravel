<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('address')->nullable();
            $table->json('skills')->nullable();
            $table->json('qualifications')->nullable();
            $table->enum('status', ['open', 'closed'])->default('open');
            $table->enum('job_type', ['full-time', 'part-time', 'internship', 'volunteer', 'contract'])->default('full-time');
            $table->enum('location_type', ['onsite', 'remote', 'hybrid'])->default('onsite');
            $table->enum('salary_type', ['hourly', 'daily', 'weekly', 'semi-monthly', 'monthly', 'onetime-payment'])->default('monthly');
            //company name
            //company image avatar
            $table->double('min_salary')->unsigned();
            $table->double('max_salary')->unsigned()->nullable();
            $table->unsignedBigInteger('recruiter_id');
            $table->foreign('recruiter_id')->references('id')->on('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_listings');
    }
};
