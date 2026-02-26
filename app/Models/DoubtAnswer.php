<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DoubtAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'doubt_id',
        'user_id',
        'answer',
        'image',
        'is_best_answer',
        'upvotes',
    ];

    protected $casts = [
        'is_best_answer' => 'boolean',
        'upvotes' => 'integer',
    ];

    public function doubt(): BelongsTo
    {
        return $this->belongsTo(Doubt::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
