<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CurrentAffair extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'category',
        'date',
        'source',
        'tags',
        'is_featured',
        'is_active',
        'author_id',
        'image',
        'pdf_url',
    ];

    protected $casts = [
        'date' => 'date',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'tags' => 'json',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function getExcerptAttribute(): string
    {
        return \Illuminate\Support\Str::limit(strip_tags($this->content), 150);
    }
}
