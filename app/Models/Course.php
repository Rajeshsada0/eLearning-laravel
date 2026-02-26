<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'instructor_id',
        'category_id',
        'price',
        'is_free',
        'is_featured',
        'is_active',
        'thumbnail',
        'video_url',
        'language',
        'level',
        'duration_hours',
        'what_you_learn',
        'prerequisites',
        'tags',
        'type',
        'start_date',
        'end_date',
        'max_students',
    ];

    protected $casts = [
        'is_free' => 'boolean',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'what_you_learn' => 'json',
        'prerequisites' => 'json',
        'tags' => 'json',
    ];

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function topics(): HasMany
    {
        return $this->hasMany(Topic::class)->orderBy('order');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
    }

    public function testResults(): HasMany
    {
        return $this->hasMany(TestResult::class);
    }

    public function getFormattedDurationAttribute(): string
    {
        $hours = floor($this->duration_hours);
        $minutes = round(($this->duration_hours - $hours) * 60);
        
        if ($hours > 0 && $minutes > 0) {
            return "{$hours}h {$minutes}m";
        } elseif ($hours > 0) {
            return "{$hours}h";
        } else {
            return "{$minutes}m";
        }
    }

    public function getEnrolledCountAttribute(): int
    {
        return $this->enrollments()->count();
    }

    public function getAverageRatingAttribute(): float
    {
        // This would be implemented when we add ratings/reviews
        return 0.0;
    }
}
