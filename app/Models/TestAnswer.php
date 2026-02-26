<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TestAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'test_result_id',
        'question_id',
        'selected_answer',
        'is_correct',
        'time_taken',
        'marked_for_review',
    ];

    protected $casts = [
        'is_correct' => 'boolean',
        'marked_for_review' => 'boolean',
        'time_taken' => 'integer',
    ];

    public function testResult(): BelongsTo
    {
        return $this->belongsTo(TestResult::class);
    }

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }
}
