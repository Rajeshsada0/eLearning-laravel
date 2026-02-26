<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'mock_test_id',
        'question_text',
        'question_type',
        'options',
        'correct_answer',
        'explanation',
        'marks',
        'order',
        'is_active',
    ];

    protected $casts = [
        'options' => 'json',
        'is_active' => 'boolean',
        'marks' => 'decimal:2',
    ];

    public function mockTest(): BelongsTo
    {
        return $this->belongsTo(MockTest::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(TestAnswer::class);
    }
}
