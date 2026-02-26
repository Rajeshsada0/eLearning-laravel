<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TestResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'mock_test_id',
        'total_questions',
        'correct_answers',
        'wrong_answers',
        'total_marks',
        'obtained_marks',
        'percentage',
        'time_taken',
        'started_at',
        'completed_at',
        'status',
        'attempt_number',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'total_marks' => 'decimal:2',
        'obtained_marks' => 'decimal:2',
        'percentage' => 'decimal:2',
        'time_taken' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mockTest(): BelongsTo
    {
        return $this->belongsTo(MockTest::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(TestAnswer::class);
    }
}
