<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobListing>
 */
class JobListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->jobTitle(),
            'description' => fake()->text(),
            'address' => fake()->address(),
            'skills' => json_encode([0 => 'design', 1 => 'develop', 2 => 'maintain']),
            'qualifications' => json_encode([0 => 'graduate', 1 => '21 above']),
            'status' => 'open',
            'job_type' => 'full-time',
            'location_type' => 'onsite',
            'salary_type' => 'monthly',
            'min_salary' => fake()->numberBetween(2, 100000),
            'max_salary' => fake()->numberBetween(2, 100000),
            'recruiter_id' => User::inRandomOrder()->first()->id,
        ];
    }
}
